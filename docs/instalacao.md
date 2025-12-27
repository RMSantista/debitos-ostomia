# Guia de Instalacao

Este guia detalha como instalar o Sistema de Registro de Debitos na sua conta Google.

## Pre-requisitos

- Conta Google
- Acesso ao Google Sheets
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Clique em "Em branco" para criar nova planilha
3. Renomeie para "Registro de Debitos" (ou nome de sua preferencia)

## Passo 2: Adicionar o Codigo

1. Na planilha, va em `Extensoes > Apps Script`
2. Apague qualquer codigo existente
3. Copie todo o conteudo de `src/backend/Codigo.gs`
4. Cole no editor
5. Clique em `Arquivo > Novo > Arquivo HTML`
6. Nomeie como `webapp` (sem extensao)
7. Copie todo o conteudo de `src/frontend/webapp.html`
8. Cole no arquivo HTML
9. Salve (Ctrl+S ou Cmd+S)

## Passo 3: Publicar como Webapp

1. No Apps Script, clique em `Implantar > Nova implantacao`
2. Clique no icone de engrenagem e selecione `App da Web`
3. Preencha:
   - Descricao: "Registro de Debitos v1"
   - Executar como: "Eu"
   - Quem pode acessar: "Apenas eu"
4. Clique em `Implantar`
5. Autorize as permissoes solicitadas
6. Copie a URL do webapp

## Passo 4: Instalar o Sistema

1. Volte para a planilha e atualize a pagina (F5)
2. Aguarde o menu "Registro de Debitos" aparecer
3. Clique em `Registro de Debitos > Instalar Sistema Completo`
4. Autorize novamente se solicitado

## Passo 5: Usar no Celular

1. No celular, acesse a URL do webapp copiada
2. No navegador:
   - **Android**: Menu > "Adicionar a tela inicial"
   - **iPhone**: Compartilhar > "Adicionar a Tela de Inicio"
3. Um icone sera criado como um app

## Configuracoes Opcionais

### Horario START

Por padrao, cada periodo de 24h comeca a meia-noite. Para alterar:

1. Menu `Registro de Debitos > Configurar Horario START`
2. Digite o horario desejado (ex: 06:00)
3. Confirme e reprocesse se desejar

## Solucao de Problemas

### Menu nao aparece

- Atualize a pagina (F5)
- Aguarde alguns segundos
- Verifique se o script foi salvo

### Erro de autorizacao

- Clique em "Revisar permissoes"
- Selecione sua conta Google
- Clique em "Avancado" > "Ir para [nome do projeto]"
- Clique em "Permitir"

### Webapp nao carrega

- Verifique se a URL esta correta
- Tente reimplantar o webapp
- Limpe o cache do navegador

## Proximos Passos

- Faca seu primeiro registro
- Configure o horario START conforme sua rotina
- Compartilhe a planilha com seu medico (apenas visualizacao)

---

Duvidas? Abra uma [issue](https://github.com/RMSantista/debitos-ostomia/issues).
