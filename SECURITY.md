# Politica de Seguranca

## Reportando Vulnerabilidades

Se voce descobrir uma vulnerabilidade de seguranca, por favor **NAO** abra uma issue publica.

Em vez disso, envie um email para o mantenedor do projeto ou use o recurso de "Report a vulnerability" do GitHub (aba Security).

## Praticas de Seguranca

Este projeto segue as seguintes praticas:

### Armazenamento de Dados

- Todos os dados sao armazenados na conta Google do proprio usuario
- Nenhum dado e enviado para servidores externos
- O codigo roda inteiramente no ambiente do Google Apps Script

### Permissoes

O sistema requer as seguintes permissoes:
- Acesso a planilha especifica (para ler/escrever dados)
- Execucao como webapp (para o formulario mobile)

### Boas Praticas para Usuarios

1. **Nao compartilhe a URL do webapp** com pessoas nao autorizadas
2. **Revise as permissoes** concedidas ao script
3. **Mantenha sua conta Google segura** com autenticacao de dois fatores

## Versoes Suportadas

| Versao | Suportada |
| ------ | --------- |
| 1.x    | Sim       |

## Atualizacoes de Seguranca

Atualizacoes de seguranca serao publicadas assim que disponiveis e anunciadas no repositorio.
