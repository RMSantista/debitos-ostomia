// ==================================================
// SISTEMA DE REGISTRO DE DEBITOS MEDICOS
// Para pacientes com ostomia e/ou sonda urinaria
//
// Autor: Rodrigo Santos (@RMSantista)
// Licenca: MIT
// Repositorio: https://github.com/RMSantista/debitos-ostomia
// ==================================================

/**
 * Serve a pagina web do formulario
 * @return {HtmlOutput} Pagina HTML do webapp
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('webapp')
      .setTitle('Registro de Debitos')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Cria o menu personalizado na planilha
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Registro de Debitos')
      .addItem('Abrir Formulario Web', 'mostrarUrlWebApp')
      .addItem('Configurar Horario START', 'configurarHorarioStart')
      .addSeparator()
      .addItem('Corrigir e Limpar Aba 24h', 'corrigirELimparAba24h')
      .addItem('Ver Totais do Periodo Atual', 'mostrarTotaisPeriodoAtual')
      .addItem('Processar Totais 24h Manualmente', 'processarTotais24hManual')
      .addItem('Calcular Medias Semanais', 'calcularMediasSemanais')
      .addSeparator()
      .addItem('Instalar Sistema Completo', 'instalarSistemaCompleto')
      .addToUi();
}

/**
 * Instala o sistema completo com todas as abas e configuracoes
 */
function instalarSistemaCompleto() {
  var ui = SpreadsheetApp.getUi();
  var planilha = SpreadsheetApp.getActiveSpreadsheet();

  try {
    // Cria todas as abas necessarias
    obterOuCriarAbaRegistros(planilha);
    obterOuCriarAba24h(planilha);
    obterOuCriarAbaMedias(planilha);
    obterOuCriarAbaConfig(planilha);

    // Configura triggers
    criarTriggers();

    ui.alert('Instalacao Completa!',
             'Sistema instalado com sucesso!\n\n' +
             'Abas criadas:\n' +
             '- Registros\n' +
             '- 24h\n' +
             '- Medias Semanais\n' +
             '- Configuracao\n\n' +
             'Use o menu para configurar o horario START e acessar o webapp.',
             ui.ButtonSet.OK);
  } catch (erro) {
    ui.alert('Erro', 'Erro na instalacao: ' + erro.message, ui.ButtonSet.OK);
  }
}

/**
 * Cria triggers automaticos para processamento
 */
function criarTriggers() {
  // Remove triggers existentes
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'processamentoAutomatico') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Cria novo trigger horario
  ScriptApp.newTrigger('processamentoAutomatico')
      .timeBased()
      .everyHours(1)
      .create();
}

/**
 * Funcao executada automaticamente pelo trigger
 */
function processamentoAutomatico() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var abaRegistros = planilha.getSheetByName('Registros');

  if (abaRegistros && abaRegistros.getLastRow() > 1) {
    verificarEProcessarPeriodosCompletos(abaRegistros, planilha);
  }
}

/**
 * Corrige e limpa a aba 24h, reprocessando todos os dados
 */
function corrigirELimparAba24h() {
  var ui = SpreadsheetApp.getUi();
  var planilha = SpreadsheetApp.getActiveSpreadsheet();

  var resultado = ui.alert(
    'Corrigir Aba 24h',
    'Esta funcao ira:\n\n' +
    '- Remover coluna "Data" (redundante)\n' +
    '- APAGAR todos os dados da aba 24h\n' +
    '- Reprocessar tudo do zero\n' +
    '- Corrigir estrutura\n\n' +
    'Os dados serao reprocessados a partir da aba Registros.\n\n' +
    'Deseja continuar?',
    ui.ButtonSet.YES_NO
  );

  if (resultado == ui.Button.YES) {
    try {
      var aba24h = planilha.getSheetByName('24h');

      if (aba24h) {
        planilha.deleteSheet(aba24h);
      }

      aba24h = obterOuCriarAba24h(planilha);

      var abaRegistros = planilha.getSheetByName('Registros');
      if (abaRegistros && abaRegistros.getLastRow() > 1) {
        verificarEProcessarPeriodosCompletos(abaRegistros, planilha);
      }

      ui.alert('Sucesso!', 'Aba 24h corrigida e dados reprocessados!', ui.ButtonSet.OK);
    } catch (erro) {
      ui.alert('Erro', 'Erro ao corrigir: ' + erro.message, ui.ButtonSet.OK);
    }
  }
}

/**
 * Mostra a URL do webapp para acesso mobile
 */
function mostrarUrlWebApp() {
  var url = ScriptApp.getService().getUrl();
  var mensagem = 'Acesse o formulario mobile em:\n\n' + url + '\n\n' +
                 'Dica: Salve esta URL nos favoritos do celular ou adicione a tela inicial!';
  SpreadsheetApp.getUi().alert('URL do Formulario Mobile', mensagem, SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Configura o horario de inicio de cada periodo de 24h
 */
function configurarHorarioStart() {
  var ui = SpreadsheetApp.getUi();
  var planilha = SpreadsheetApp.getActiveSpreadsheet();

  var startAtual = obterHorarioStart(planilha);
  var horaAtual = Utilities.formatDate(startAtual, Session.getScriptTimeZone(), 'HH:mm');

  var resultado = ui.prompt(
    'Configurar Horario START',
    'Digite o horario de inicio de cada periodo de 24h (formato HH:mm):\n\n' +
    'Exemplo: 00:20 significa que cada periodo vai de 00:20 ate 00:19:59 do dia seguinte\n' +
    'Default: 00:00 (meia-noite)\n\n' +
    'Horario atual: ' + horaAtual,
    ui.ButtonSet.OK_CANCEL
  );

  if (resultado.getSelectedButton() == ui.Button.OK) {
    var horarioTexto = resultado.getResponseText().trim();

    var regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!regex.test(horarioTexto)) {
      ui.alert('Erro', 'Formato invalido! Use HH:mm (exemplo: 00:20 ou 14:30)', ui.ButtonSet.OK);
      return;
    }

    salvarHorarioStart(planilha, horarioTexto);

    var reprocessar = ui.alert(
      'START Atualizado',
      'Horario START configurado para: ' + horarioTexto + '\n\n' +
      'Deseja reprocessar a aba 24h com o novo horario?',
      ui.ButtonSet.YES_NO
    );

    if (reprocessar == ui.Button.YES) {
      corrigirELimparAba24h();
    }
  }
}

/**
 * Obtem o horario START configurado
 * @param {Spreadsheet} planilha - Planilha ativa
 * @return {Date} Objeto Date com o horario configurado
 */
function obterHorarioStart(planilha) {
  var abaConfig = obterOuCriarAbaConfig(planilha);
  var valorStart = abaConfig.getRange('B2').getValue();

  if (valorStart && valorStart !== '') {
    if (typeof valorStart === 'string') {
      var partes = valorStart.split(':');
      var data = new Date();
      data.setHours(parseInt(partes[0]), parseInt(partes[1]), 0, 0);
      return data;
    }
    return valorStart;
  }

  var dataDefault = new Date();
  dataDefault.setHours(0, 0, 0, 0);
  return dataDefault;
}

/**
 * Salva o horario START na configuracao
 * @param {Spreadsheet} planilha - Planilha ativa
 * @param {string} horarioTexto - Horario no formato HH:mm
 */
function salvarHorarioStart(planilha, horarioTexto) {
  var abaConfig = obterOuCriarAbaConfig(planilha);
  abaConfig.getRange('B2').setValue(horarioTexto);
}

/**
 * Cria ou obtem a aba de Configuracao
 * @param {Spreadsheet} planilha - Planilha ativa
 * @return {Sheet} Aba de configuracao
 */
function obterOuCriarAbaConfig(planilha) {
  var aba = planilha.getSheetByName('Configuracao');

  if (!aba) {
    aba = planilha.insertSheet('Configuracao', 3);
    aba.getRange('A1').setValue('CONFIGURACAO DO SISTEMA');
    aba.getRange('A1').setFontWeight('bold').setFontSize(14).setBackground('#4285f4').setFontColor('#ffffff');

    aba.getRange('A2').setValue('Horario START (24h):');
    aba.getRange('A2').setFontWeight('bold');
    aba.getRange('B2').setValue('00:00');
    aba.getRange('B2').setBackground('#fff3cd');

    aba.getRange('A4').setValue('INSTRUCOES:').setFontWeight('bold');
    aba.getRange('A5').setValue('O horario START define quando cada periodo de 24h comeca');
    aba.getRange('A6').setValue('Medias sao calculadas em janelas de 7 dias corridos');
    aba.getRange('A7').setValue('Exemplo: Registros dias 20, 22, 25 = 1 media (janela 20-26)');
    aba.getRange('A8').setValue('Proximo registro fora da janela inicia nova media');

    aba.setColumnWidth(1, 400);
    aba.setColumnWidth(2, 100);

    aba.getRange('A1:B10').setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  }

  return aba;
}

/**
 * Calcula o inicio do periodo de 24h para uma data/hora
 * @param {Date} dataHoraRegistro - Data/hora do registro
 * @param {Date} horarioStart - Horario de inicio do periodo
 * @return {Date} Data/hora de inicio do periodo
 */
function calcularInicioDoPeriodo(dataHoraRegistro, horarioStart) {
  var horaStart = horarioStart.getHours();
  var minutoStart = horarioStart.getMinutes();

  var inicioPeriodo = new Date(dataHoraRegistro);
  inicioPeriodo.setHours(horaStart, minutoStart, 0, 0);

  var horaRegistro = dataHoraRegistro.getHours();
  var minutoRegistro = dataHoraRegistro.getMinutes();

  var minutosTotaisRegistro = horaRegistro * 60 + minutoRegistro;
  var minutosTotaisStart = horaStart * 60 + minutoStart;

  if (minutosTotaisRegistro < minutosTotaisStart) {
    inicioPeriodo.setDate(inicioPeriodo.getDate() - 1);
  }

  return inicioPeriodo;
}

/**
 * Calcula o fim do periodo de 24h
 * @param {Date} inicioPeriodo - Data/hora de inicio do periodo
 * @return {Date} Data/hora de fim do periodo
 */
function calcularFimDoPeriodo(inicioPeriodo) {
  var fimPeriodo = new Date(inicioPeriodo.getTime() + (24 * 60 * 60 * 1000) - 1000);
  return fimPeriodo;
}

/**
 * Salva dados enviados pelo webapp
 * @param {Object} dados - Objeto com ileostomia, urinario e estimado
 * @return {Object} Resultado da operacao
 */
function salvarDadosWebApp(dados) {
  try {
    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var abaRegistros = obterOuCriarAbaRegistros(planilha);

    if (!dados.ileostomia && !dados.urinario) {
      return {
        sucesso: false,
        mensagem: 'E obrigatorio informar pelo menos um dos debitos'
      };
    }

    var dataHora = new Date();
    var ileostomia = dados.ileostomia || '';
    var urinario = dados.urinario || '';
    var estimado = dados.estimado === 'Sim' ? 'Sim' : 'Nao';

    var horarioStart = obterHorarioStart(planilha);
    var inicioPeriodo = calcularInicioDoPeriodo(dataHora, horarioStart);

    abaRegistros.appendRow([dataHora, ileostomia, urinario, estimado, inicioPeriodo]);

    var ultimaLinha = abaRegistros.getLastRow();
    abaRegistros.getRange(ultimaLinha, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    abaRegistros.getRange(ultimaLinha, 2, 1, 3).setHorizontalAlignment('center');
    abaRegistros.getRange(ultimaLinha, 5).setNumberFormat('dd/MM/yyyy HH:mm');

    var resultado24h = verificarEProcessarPeriodosCompletos(abaRegistros, planilha);

    var totais = calcularTotaisPeriodoAtual(abaRegistros, horarioStart);

    var mensagemRetorno = 'Dados salvos com sucesso!';
    if (resultado24h.processado) {
      mensagemRetorno += '\nTotal de 24h registrado!';
    }

    return {
      sucesso: true,
      mensagem: mensagemRetorno,
      totais: totais,
      processou24h: resultado24h.processado,
      horaRegistro: Utilities.formatDate(dataHora, Session.getScriptTimeZone(), 'HH:mm')
    };

  } catch (erro) {
    return {
      sucesso: false,
      mensagem: 'Erro: ' + erro.message
    };
  }
}

/**
 * Obtem totais do periodo atual (chamado pelo webapp)
 * @return {Object} Totais do periodo
 */
function obterTotaisPeriodoAtual() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var abaRegistros = planilha.getSheetByName('Registros');
  var horarioStart = obterHorarioStart(planilha);

  return calcularTotaisPeriodoAtual(abaRegistros, horarioStart);
}

/**
 * Cria ou obtem a aba de Registros
 * @param {Spreadsheet} planilha - Planilha ativa
 * @return {Sheet} Aba de registros
 */
function obterOuCriarAbaRegistros(planilha) {
  var aba = planilha.getSheetByName('Registros');

  if (!aba) {
    aba = planilha.insertSheet('Registros', 0);
    aba.getRange('A1:E1').setValues([['Data e Hora', 'Ostomia (ml)', 'Urina (ml)', 'Estimativa', 'Inicio Periodo']]);
    aba.getRange('A1:E1').setFontWeight('bold')
                         .setBackground('#4285f4')
                         .setFontColor('#ffffff')
                         .setHorizontalAlignment('center');
    aba.setFrozenRows(1);
    aba.setColumnWidth(1, 150);
    aba.setColumnWidth(2, 120);
    aba.setColumnWidth(3, 120);
    aba.setColumnWidth(4, 100);
    aba.setColumnWidth(5, 140);
  }

  return aba;
}

/**
 * Cria ou obtem a aba 24h
 * @param {Spreadsheet} planilha - Planilha ativa
 * @return {Sheet} Aba 24h
 */
function obterOuCriarAba24h(planilha) {
  var aba = planilha.getSheetByName('24h');

  if (!aba) {
    aba = planilha.insertSheet('24h', 1);
    aba.getRange('A1:F1').setValues([['Inicio Periodo', 'Fim Periodo', 'Total Ostomia (ml)', 'Total Urina (ml)', 'N Registros', 'N Estimados']]);
    aba.getRange('A1:F1').setFontWeight('bold')
                         .setBackground('#34a853')
                         .setFontColor('#ffffff')
                         .setHorizontalAlignment('center');
    aba.setFrozenRows(1);
    aba.setColumnWidth(1, 140);
    aba.setColumnWidth(2, 140);
    aba.setColumnWidth(3, 140);
    aba.setColumnWidth(4, 140);
    aba.setColumnWidth(5, 110);
    aba.setColumnWidth(6, 110);
  }

  return aba;
}

/**
 * Cria ou obtem a aba de Medias Semanais
 * @param {Spreadsheet} planilha - Planilha ativa
 * @return {Sheet} Aba de medias
 */
function obterOuCriarAbaMedias(planilha) {
  var aba = planilha.getSheetByName('Medias Semanais');

  if (!aba) {
    aba = planilha.insertSheet('Medias Semanais', 2);
    aba.getRange('A1:E1').setValues([['Janela (Inicio)', 'Janela (Fim)', 'Media Ostomia (ml/dia)', 'Media Urina (ml/dia)', 'Dias']]);
    aba.getRange('A1:E1').setFontWeight('bold')
                         .setBackground('#fbbc04')
                         .setFontColor('#000000')
                         .setHorizontalAlignment('center');
    aba.setFrozenRows(1);
    aba.setColumnWidth(1, 140);
    aba.setColumnWidth(2, 140);
    aba.setColumnWidth(3, 160);
    aba.setColumnWidth(4, 160);
    aba.setColumnWidth(5, 120);
  }

  return aba;
}

/**
 * Verifica e processa periodos de 24h completos
 * @param {Sheet} abaRegistros - Aba de registros
 * @param {Spreadsheet} planilha - Planilha ativa
 * @return {Object} Resultado do processamento
 */
function verificarEProcessarPeriodosCompletos(abaRegistros, planilha) {
  if (abaRegistros.getLastRow() < 2) {
    return { processado: false };
  }

  var dados = abaRegistros.getRange(2, 1, abaRegistros.getLastRow() - 1, 5).getValues();
  var aba24h = obterOuCriarAba24h(planilha);
  var horarioStart = obterHorarioStart(planilha);

  var periodosProcessados = {};
  if (aba24h.getLastRow() > 1) {
    var dadosProcessados = aba24h.getRange(2, 1, aba24h.getLastRow() - 1, 1).getValues();
    for (var i = 0; i < dadosProcessados.length; i++) {
      if (dadosProcessados[i][0]) {
        var timestamp = new Date(dadosProcessados[i][0]).getTime();
        periodosProcessados[timestamp] = true;
      }
    }
  }

  var periodosPorInicio = {};

  for (var i = 0; i < dados.length; i++) {
    if (!dados[i][4] || !dados[i][0]) continue;

    var inicioPeriodo = new Date(dados[i][4]);

    if (inicioPeriodo.getFullYear() < 2020) continue;

    var timestamp = inicioPeriodo.getTime();

    if (!periodosPorInicio[timestamp]) {
      periodosPorInicio[timestamp] = {
        inicio: inicioPeriodo,
        fim: calcularFimDoPeriodo(inicioPeriodo),
        totalOstomia: 0,
        totalUrina: 0,
        numRegistros: 0,
        numEstimados: 0,
        ultimoRegistro: null
      };
    }

    var periodo = periodosPorInicio[timestamp];

    var ostomia = dados[i][1];
    var urina = dados[i][2];
    var estimativa = dados[i][3];

    if (ostomia !== '' && !isNaN(ostomia)) periodo.totalOstomia += Number(ostomia);
    if (urina !== '' && !isNaN(urina)) periodo.totalUrina += Number(urina);
    periodo.numRegistros++;

    if (estimativa === 'Sim') {
      periodo.numEstimados++;
    }

    var dataHoraRegistro = new Date(dados[i][0]);
    if (!periodo.ultimoRegistro || dataHoraRegistro > periodo.ultimoRegistro) {
      periodo.ultimoRegistro = dataHoraRegistro;
    }
  }

  var agora = new Date();
  var inicioPeriodoAtual = calcularInicioDoPeriodo(agora, horarioStart);
  var timestampPeriodoAtual = inicioPeriodoAtual.getTime();

  var processou = false;

  for (var timestamp in periodosPorInicio) {
    var timestampNum = parseInt(timestamp);

    if (periodosProcessados[timestampNum]) continue;
    if (timestampNum === timestampPeriodoAtual) continue;

    var periodo = periodosPorInicio[timestamp];

    aba24h.appendRow([
      periodo.inicio,
      periodo.ultimoRegistro || periodo.fim,
      periodo.totalOstomia,
      periodo.totalUrina,
      periodo.numRegistros,
      periodo.numEstimados
    ]);

    var ultimaLinha = aba24h.getLastRow();
    aba24h.getRange(ultimaLinha, 1, 1, 2).setNumberFormat('dd/MM/yyyy HH:mm');
    aba24h.getRange(ultimaLinha, 3, 1, 4).setHorizontalAlignment('center');

    processou = true;
  }

  if (processou) {
    verificarECalcularMediasSemana(aba24h, planilha);
  }

  return { processado: processou };
}

/**
 * Calcula medias semanais em janelas de 7 dias corridos
 * @param {Sheet} aba24h - Aba de totais 24h
 * @param {Spreadsheet} planilha - Planilha ativa
 */
function verificarECalcularMediasSemana(aba24h, planilha) {
  if (aba24h.getLastRow() < 2) return;

  var dados24h = aba24h.getRange(2, 1, aba24h.getLastRow() - 1, 6).getValues();
  var abaMedias = obterOuCriarAbaMedias(planilha);

  var periodosProcessados = {};
  if (abaMedias.getLastRow() > 1) {
    abaMedias.deleteRows(2, abaMedias.getLastRow() - 1);
  }

  dados24h.sort(function(a, b) {
    return new Date(a[0]) - new Date(b[0]);
  });

  var i = 0;
  while (i < dados24h.length) {
    var inicioPeriodo = new Date(dados24h[i][0]);
    var timestampInicio = inicioPeriodo.getTime();

    if (periodosProcessados[timestampInicio]) {
      i++;
      continue;
    }

    var fimJanela = new Date(inicioPeriodo);
    fimJanela.setDate(fimJanela.getDate() + 6);
    fimJanela.setHours(23, 59, 59, 999);

    var periodosNaJanela = [];
    var totalOstomia = 0;
    var totalUrina = 0;

    for (var j = i; j < dados24h.length; j++) {
      var dataAtual = new Date(dados24h[j][0]);
      var timestampAtual = dataAtual.getTime();

      if (periodosProcessados[timestampAtual]) continue;

      if (dataAtual <= fimJanela) {
        periodosNaJanela.push({
          data: dataAtual,
          ostomia: Number(dados24h[j][2]),
          urina: Number(dados24h[j][3]),
          timestamp: timestampAtual
        });

        totalOstomia += Number(dados24h[j][2]);
        totalUrina += Number(dados24h[j][3]);

        periodosProcessados[timestampAtual] = true;
      } else {
        break;
      }
    }

    if (periodosNaJanela.length > 0) {
      var numDias = periodosNaJanela.length;
      var mediaOstomia = Math.round(totalOstomia / numDias);
      var mediaUrina = Math.round(totalUrina / numDias);

      var ultimoPeriodo = periodosNaJanela[periodosNaJanela.length - 1];

      abaMedias.appendRow([
        inicioPeriodo,
        ultimoPeriodo.data,
        mediaOstomia,
        mediaUrina,
        numDias
      ]);

      var ultimaLinha = abaMedias.getLastRow();
      abaMedias.getRange(ultimaLinha, 1, 1, 2).setNumberFormat('dd/MM/yyyy HH:mm');
      abaMedias.getRange(ultimaLinha, 3, 1, 3).setHorizontalAlignment('center');
    }

    i++;
  }
}

/**
 * Calcula totais do periodo atual
 * @param {Sheet} abaRegistros - Aba de registros
 * @param {Date} horarioStart - Horario de inicio do periodo
 * @return {Object} Totais do periodo
 */
function calcularTotaisPeriodoAtual(abaRegistros, horarioStart) {
  if (!abaRegistros || abaRegistros.getLastRow() < 2) {
    return { ileostomia: 0, urinario: 0, registros: 0, estimados: 0 };
  }

  var dados = abaRegistros.getDataRange().getValues();
  var agora = new Date();
  var inicioPeriodoAtual = calcularInicioDoPeriodo(agora, horarioStart);
  var timestampPeriodoAtual = inicioPeriodoAtual.getTime();

  var totalIleostomia = 0;
  var totalUrinario = 0;
  var contadorRegistros = 0;
  var contadorEstimados = 0;

  for (var i = 1; i < dados.length; i++) {
    if (!dados[i][4]) continue;

    var inicioPeriodoRegistro = new Date(dados[i][4]);

    if (inicioPeriodoRegistro.getFullYear() < 2020) continue;

    if (inicioPeriodoRegistro.getTime() === timestampPeriodoAtual) {
      var ileostomia = dados[i][1];
      var urinario = dados[i][2];
      var estimativa = dados[i][3];

      if (ileostomia !== '' && !isNaN(ileostomia)) totalIleostomia += Number(ileostomia);
      if (urinario !== '' && !isNaN(urinario)) totalUrinario += Number(urinario);

      contadorRegistros++;

      if (estimativa === 'Sim') {
        contadorEstimados++;
      }
    }
  }

  return {
    ileostomia: totalIleostomia,
    urinario: totalUrinario,
    registros: contadorRegistros,
    estimados: contadorEstimados
  };
}

/**
 * Mostra totais do periodo atual via menu
 */
function mostrarTotaisPeriodoAtual() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var abaRegistros = planilha.getSheetByName('Registros');

  if (!abaRegistros) {
    SpreadsheetApp.getUi().alert('Nenhum registro encontrado.');
    return;
  }

  var horarioStart = obterHorarioStart(planilha);
  var totais = calcularTotaisPeriodoAtual(abaRegistros, horarioStart);
  var agora = new Date();
  var inicioPeriodoAtual = calcularInicioDoPeriodo(agora, horarioStart);
  var fimPeriodoAtual = calcularFimDoPeriodo(inicioPeriodoAtual);

  var mensagem = 'TOTAIS DO PERIODO ATUAL:\n\n' +
                 'Inicio: ' + Utilities.formatDate(inicioPeriodoAtual, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm') + '\n' +
                 'Fim: ' + Utilities.formatDate(fimPeriodoAtual, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm') + '\n\n' +
                 'Ostomia: ' + totais.ileostomia + ' ml\n' +
                 'Urina: ' + totais.urinario + ' ml\n' +
                 'Registros: ' + totais.registros + '\n' +
                 'Estimados: ' + totais.estimados;

  SpreadsheetApp.getUi().alert('Totais do Periodo Atual', mensagem, SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Processa totais 24h manualmente via menu
 */
function processarTotais24hManual() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var abaRegistros = planilha.getSheetByName('Registros');

  if (!abaRegistros || abaRegistros.getLastRow() < 2) {
    SpreadsheetApp.getUi().alert('Nenhum registro encontrado.');
    return;
  }

  var resultado = verificarEProcessarPeriodosCompletos(abaRegistros, planilha);

  if (resultado.processado) {
    SpreadsheetApp.getUi().alert('Totais processados com sucesso!');
  } else {
    SpreadsheetApp.getUi().alert('Nenhum periodo completo para processar.');
  }
}

/**
 * Calcula medias semanais manualmente via menu
 */
function calcularMediasSemanais() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba24h = planilha.getSheetByName('24h');

  if (!aba24h || aba24h.getLastRow() < 2) {
    SpreadsheetApp.getUi().alert('Necessario ter pelo menos 1 periodo na aba "24h".');
    return;
  }

  verificarECalcularMediasSemana(aba24h, planilha);
  SpreadsheetApp.getUi().alert('Medias calculadas com sucesso!');
}
