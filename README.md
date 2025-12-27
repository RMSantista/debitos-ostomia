# Registro de Débitos Médicos

Sistema para registro e acompanhamento de débitos de ostomia e urinário, desenvolvido para pacientes e profissionais de saúde.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)](https://developers.google.com/apps-script)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Vibe Engineering](https://img.shields.io/badge/Vibe-Engineering-blueviolet)](https://github.com/RMSantista)

## 💡 Por que este projeto?

Pacientes com ostomia (ileostomia, colostomia) ou sonda urinária frequentemente precisam registrar seus débitos diários para:

- **Acompanhamento médico**: Médicos precisam dessas informações para avaliar a saúde do paciente
- **Prevenção de desidratação**: Débitos altos podem indicar necessidade de reposição de líquidos
- **Identificação de padrões**: Analisar tendências ao longo do tempo
- **Compartilhamento facilitado**: Enviar dados para a equipe médica de forma organizada

Este sistema resolve a dificuldade de anotar e organizar esses registros de forma prática, usando apenas o celular e o Google Sheets.

## ✨ Funcionalidades

- **Webapp Mobile**: Interface otimizada para registro rápido via celular
- **Períodos de 24h**: Consolidação automática de débitos diários
- **Médias Semanais**: Cálculo em janelas de 7 dias corridos
- **Horário Customizável**: Defina quando seu dia começa (ex: 00:00 ou 06:00)
- **Estimativas**: Marque quando o valor foi estimado
- **Totais em Tempo Real**: Veja os totais do período atual enquanto registra
- **100% Privado**: Dados armazenados na sua própria conta Google

## 🚀 Como Usar

### 1. Copiar o Template

1. Acesse o [Template da Planilha](https://docs.google.com/spreadsheets/d/1cydSYTOC9URJ_YXjcYn2a5Wb2mCP4d_cyH2eBp38hTU/copy)
2. Clique em "Fazer uma cópia"
3. Uma nova planilha será criada na sua conta Google

### 2. Instalar o Sistema

1. Na planilha, vá em `Extensões > Apps Script`
2. Cole o código de `src/backend/Codigo.gs`
3. Crie um arquivo `webapp.html` e cole o código de `src/frontend/webapp.html`
4. Salve (Ctrl+S)
5. Volte para a planilha e atualize a página
6. Use o menu `Registro de Débitos > Instalar Sistema Completo`
7. Autorize as permissões solicitadas

### 3. Usar o Webapp

1. Menu `Registro de Débitos > Abrir Formulário Web`
2. Copie a URL exibida
3. No celular, acesse a URL e adicione à tela inicial
4. Pronto! Use como um app para registrar seus débitos

## 📁 Estrutura do Projeto

```
debitos-ostomia/
├── src/
│   ├── backend/
│   │   └── Codigo.gs         # Lógica do sistema (Google Apps Script)
│   └── frontend/
│       └── webapp.html       # Interface mobile
├── docs/
│   └── instalacao.md         # Guia detalhado de instalação
├── .github/
│   └── ISSUE_TEMPLATE/       # Templates para issues
├── LICENSE                   # Licença MIT
├── README.md                 # Este arquivo
├── CONTRIBUTING.md           # Como contribuir
├── CODE_OF_CONDUCT.md        # Código de conduta
└── SECURITY.md               # Política de segurança
```

## 📊 Abas da Planilha

| Aba | Descrição |
|-----|-----------|
| **Registros** | Cada medição individual com data/hora |
| **24h** | Totais consolidados por período de 24 horas |
| **Médias Semanais** | Médias calculadas em janelas de 7 dias |
| **Configuração** | Horário START e outras configurações |

## ⚙️ Configurações

### Horário START

Define quando cada período de 24h começa. Por exemplo:
- `00:00` - Meia-noite (padrão)
- `06:00` - 6h da manhã
- `00:20` - 00:20 até 00:19:59 do dia seguinte

Acesse via menu: `Registro de Débitos > Configurar Horário START`

## 🔐 Privacidade e Segurança

- Dados armazenados exclusivamente na sua conta Google
- Nenhum dado enviado para servidores externos
- Código open-source e auditável
- Você tem controle total sobre seus dados

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja [CONTRIBUTING.md](CONTRIBUTING.md) para saber como ajudar.

Algumas formas de contribuir:
- Reportar bugs
- Sugerir melhorias
- Traduzir para outros idiomas
- Melhorar documentação
- Enviar pull requests

## 🎨 Vibe Engineering

Este projeto foi desenvolvido utilizando a metodologia **Vibe Engineering**: codificado por I.A. (Claude Code/Opus 4.5) mas revisado, testado e validado por humanos. Esta abordagem combina:

- ⚡ Velocidade de desenvolvimento com I.A.
- 🧪 Testes e validação humana rigorosa
- 🎯 Foco em resolver problemas reais
- 💡 Iteração rápida baseada em feedback

Parte do portfólio de desenvolvimento com I.A. de [Rodrigo Marques](https://github.com/RMSantista).

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 👨‍💻 Autor

**Rodrigo Marques**
- GitHub: [@RMSantista](https://github.com/RMSantista)
- Desenvolvedor especializado em automações com I.A.
- Paciente ostomizado compartilhando soluções práticas

---

**Se este projeto te ajudou, considere dar uma ⭐ estrela!**
