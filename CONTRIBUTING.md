# Guia de Contribuição

Obrigado por considerar contribuir com o projeto! Este documento explica como você pode ajudar.

## Como Contribuir

### Reportando Bugs

1. Verifique se o bug já foi reportado em [Issues](https://github.com/RMSantista/debitos-ostomia/issues)
2. Se não, abra uma nova issue usando o template de bug report
3. Inclua o máximo de detalhes possível:
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots se aplicável
   - Navegador e versão

### Sugerindo Melhorias

1. Abra uma issue usando o template de feature request
2. Descreva a melhoria e por que seria útil
3. Considere como outros usuários poderiam se beneficiar

### Enviando Código

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Faça suas alterações
4. Commit: `git commit -m "feat: adiciona minha feature"`
5. Push: `git push origin feature/minha-feature`
6. Abra um Pull Request

## Padrões de Código

### Google Apps Script (JavaScript ES5)

```javascript
// Use var (não let/const - Apps Script usa ES5)
var minhaVariavel = 'valor';

// Funções documentadas com JSDoc
/**
 * Descrição da função
 * @param {string} parametro - Descrição do parâmetro
 * @return {number} Descrição do retorno
 */
function minhaFuncao(parametro) {
  // implementação
}

// Nomes descritivos
function calcularTotalPeriodo() {} // bom
function calc() {}                  // evite
```

### HTML/CSS

- Indentação: 2 espaços
- Classes em kebab-case: `.minha-classe`
- Mobile-first

### Commits

Use o padrão Conventional Commits:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes

## Estrutura do Projeto

```
src/
├── backend/
│   └── Codigo.gs      # Sistema principal
└── frontend/
    └── webapp.html    # Interface mobile
```

## Testando

1. Crie uma planilha de teste no Google Sheets
2. Copie o código para `Extensões > Apps Script`
3. Teste todas as funcionalidades antes de enviar PR

## Dúvidas?

Abra uma [Discussion](https://github.com/RMSantista/debitos-ostomia/discussions) ou envie uma mensagem.

---

Agradecemos sua contribuição!
