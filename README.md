# Registro de Debitos Medicos

Sistema para registro e acompanhamento de debitos de ostomia e urinario, desenvolvido para pacientes e profissionais de saude.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)](https://developers.google.com/apps-script)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Por que este projeto?

Pacientes com ostomia (ileostomia, colostomia) ou sonda urinaria frequentemente precisam registrar seus debitos diarios para:

- **Acompanhamento medico**: Medicos precisam dessas informacoes para avaliar a saude do paciente
- **Prevencao de desidratacao**: Debitos altos podem indicar necessidade de reposicao de liquidos
- **Identificacao de padroes**: Analisar tendencias ao longo do tempo
- **Compartilhamento facilitado**: Enviar dados para a equipe medica de forma organizada

Este sistema resolve a dificuldade de anotar e organizar esses registros de forma pratica, usando apenas o celular e o Google Sheets.

## Funcionalidades

- **Webapp Mobile**: Interface otimizada para registro rapido via celular
- **Periodos de 24h**: Consolidacao automatica de debitos diarios
- **Medias Semanais**: Calculo em janelas de 7 dias corridos
- **Horario Customizavel**: Defina quando seu dia comeca (ex: 00:00 ou 06:00)
- **Estimativas**: Marque quando o valor foi estimado
- **Totais em Tempo Real**: Veja os totais do periodo atual enquanto registra
- **100% Privado**: Dados armazenados na sua propria conta Google

## Como Usar

### 1. Copiar o Template

1. Acesse o [Template da Planilha](https://docs.google.com/spreadsheets/d/1cydSYTOC9URJ_YXjcYn2a5Wb2mCP4d_cyH2eBp38hTU/copy)
2. Clique em "Fazer uma copia"
3. Uma nova planilha sera criada na sua conta Google

### 2. Instalar o Sistema

1. Na planilha, va em `Extensoes > Apps Script`
2. Cole o codigo de `src/backend/Codigo.gs`
3. Crie um arquivo `webapp.html` e cole o codigo de `src/frontend/webapp.html`
4. Salve (Ctrl+S)
5. Volte para a planilha e atualize a pagina
6. Use o menu `Registro de Debitos > Instalar Sistema Completo`
7. Autorize as permissoes solicitadas

### 3. Usar o Webapp

1. Menu `Registro de Debitos > Abrir Formulario Web`
2. Copie a URL exibida
3. No celular, acesse a URL e adicione a tela inicial
4. Pronto! Use como um app para registrar seus debitos

## Estrutura do Projeto

```
debitos-ostomia/
├── src/
│   ├── backend/
│   │   └── Codigo.gs         # Logica do sistema (Google Apps Script)
│   └── frontend/
│       └── webapp.html       # Interface mobile
├── docs/
│   └── instalacao.md         # Guia detalhado de instalacao
├── .github/
│   └── ISSUE_TEMPLATE/       # Templates para issues
├── LICENSE                   # Licenca MIT
├── README.md                 # Este arquivo
├── CONTRIBUTING.md           # Como contribuir
├── CODE_OF_CONDUCT.md        # Codigo de conduta
└── SECURITY.md               # Politica de seguranca
```

## Abas da Planilha

| Aba | Descricao |
|-----|-----------|
| **Registros** | Cada medicao individual com data/hora |
| **24h** | Totais consolidados por periodo de 24 horas |
| **Medias Semanais** | Medias calculadas em janelas de 7 dias |
| **Configuracao** | Horario START e outras configuracoes |

## Configuracoes

### Horario START

Define quando cada periodo de 24h comeca. Por exemplo:
- `00:00` - Meia-noite (padrao)
- `06:00` - 6h da manha
- `00:20` - 00:20 ate 00:19:59 do dia seguinte

Acesse via menu: `Registro de Debitos > Configurar Horario START`

## Privacidade e Seguranca

- Dados armazenados exclusivamente na sua conta Google
- Nenhum dado enviado para servidores externos
- Codigo open-source e auditavel
- Voce tem controle total sobre seus dados

## Contribuindo

Contribuicoes sao bem-vindas! Veja [CONTRIBUTING.md](CONTRIBUTING.md) para saber como ajudar.

Algumas formas de contribuir:
- Reportar bugs
- Sugerir melhorias
- Traduzir para outros idiomas
- Melhorar documentacao
- Enviar pull requests

## Licenca

Este projeto esta licenciado sob a [MIT License](LICENSE).

## Autor

Desenvolvido por [Rodrigo Santos](https://github.com/RMSantista)

---

**Se este projeto te ajudou, considere dar uma estrela!**
