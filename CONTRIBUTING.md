# Guia de Contribuicao

Obrigado por considerar contribuir com o projeto! Este documento explica como voce pode ajudar.

## Como Contribuir

### Reportando Bugs

1. Verifique se o bug ja foi reportado em [Issues](https://github.com/RMSantista/debitos-ostomia/issues)
2. Se nao, abra uma nova issue usando o template de bug report
3. Inclua o maximo de detalhes possivel:
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots se aplicavel
   - Navegador e versao

### Sugerindo Melhorias

1. Abra uma issue usando o template de feature request
2. Descreva a melhoria e por que seria util
3. Considere como outros usuarios poderiam se beneficiar

### Enviando Codigo

1. Fork o repositorio
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Faca suas alteracoes
4. Commit: `git commit -m "feat: adiciona minha feature"`
5. Push: `git push origin feature/minha-feature`
6. Abra um Pull Request

## Padroes de Codigo

### Google Apps Script (JavaScript ES5)

```javascript
// Use var (nao let/const - Apps Script usa ES5)
var minhaVariavel = 'valor';

// Funcoes documentadas com JSDoc
/**
 * Descricao da funcao
 * @param {string} parametro - Descricao do parametro
 * @return {number} Descricao do retorno
 */
function minhaFuncao(parametro) {
  // implementacao
}

// Nomes descritivos
function calcularTotalPeriodo() {} // bom
function calc() {}                  // evite
```

### HTML/CSS

- Indentacao: 2 espacos
- Classes em kebab-case: `.minha-classe`
- Mobile-first

### Commits

Use o padrao Conventional Commits:

- `feat:` Nova funcionalidade
- `fix:` Correcao de bug
- `docs:` Documentacao
- `style:` Formatacao
- `refactor:` Refatoracao
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
2. Copie o codigo para `Extensoes > Apps Script`
3. Teste todas as funcionalidades antes de enviar PR

## Duvidas?

Abra uma [Discussion](https://github.com/RMSantista/debitos-ostomia/discussions) ou envie uma mensagem.

---

Agradecemos sua contribuicao!
