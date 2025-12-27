# Guia de Instalação

Este guia detalha como instalar o Sistema de Registro de Débitos na sua conta Google.

## Pré-requisitos

- Conta Google
- Acesso ao Google Sheets
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Clique em "Em branco" para criar nova planilha
3. Renomeie para "Registro de Débitos" (ou nome de sua preferência)

## Passo 2: Adicionar o Código

1. Na planilha, vá em `Extensões > Apps Script`
2. Apague qualquer código existente
3. Copie todo o conteúdo de `src/backend/Codigo.gs`
4. Cole no editor
5. Clique em `Arquivo > Novo > Arquivo HTML`
6. Nomeie como `webapp` (sem extensão)
7. Copie todo o conteúdo de `src/frontend/webapp.html`
8. Cole no arquivo HTML
9. Salve (Ctrl+S ou Cmd+S)

## Passo 3: Publicar como Webapp

1. No Apps Script, clique em `Implantar > Nova implantação`
2. Clique no ícone de engrenagem e selecione `App da Web`
3. Preencha:
   - Descrição: "Registro de Débitos v1"
   - Executar como: "Eu"
   - Quem pode acessar: "Apenas eu"
4. Clique em `Implantar`
5. Autorize as permissões solicitadas
6. Copie a URL do webapp

## Passo 4: Instalar o Sistema

1. Volte para a planilha e atualize a página (F5)
2. Aguarde o menu "Registro de Débitos" aparecer
3. Clique em `Registro de Débitos > Instalar Sistema Completo`
4. Autorize novamente se solicitado

## Passo 5: Usar no Celular

1. No celular, acesse a URL do webapp copiada
2. No navegador:
   - **Android**: Menu > "Adicionar à tela inicial"
   - **iPhone**: Compartilhar > "Adicionar à Tela de Início"
3. Um ícone será criado como um app

## Configurações Opcionais

### Horário START

Por padrão, cada período de 24h começa à meia-noite. Para alterar:

1. Menu `Registro de Débitos > Configurar Horário START`
2. Digite o horário desejado (ex: 06:00)
3. Confirme e reprocesse se desejar

## Solução de Problemas

### Menu não aparece

- Atualize a página (F5)
- Aguarde alguns segundos
- Verifique se o script foi salvo

### Erro de autorização

- Clique em "Revisar permissões"
- Selecione sua conta Google
- Clique em "Avançado" > "Ir para [nome do projeto]"
- Clique em "Permitir"

### Webapp não carrega

- Verifique se a URL está correta
- Tente reimplantar o webapp
- Limpe o cache do navegador

## Próximos Passos

- Faça seu primeiro registro
- Configure o horário START conforme sua rotina
- Compartilhe a planilha com seu médico (apenas visualização)

---

Dúvidas? Abra uma [issue](https://github.com/RMSantista/debitos-ostomia/issues).
