# Política de Segurança

## Reportando Vulnerabilidades

Se você descobrir uma vulnerabilidade de segurança, por favor **NÃO** abra uma issue pública.

Em vez disso, envie um email para o mantenedor do projeto ou use o recurso de "Report a vulnerability" do GitHub (aba Security).

## Práticas de Segurança

Este projeto segue as seguintes práticas:

### Armazenamento de Dados

- Todos os dados são armazenados na conta Google do próprio usuário
- Nenhum dado é enviado para servidores externos
- O código roda inteiramente no ambiente do Google Apps Script

### Permissões

O sistema requer as seguintes permissões:
- Acesso à planilha específica (para ler/escrever dados)
- Execução como webapp (para o formulário mobile)

### Boas Práticas para Usuários

1. **Não compartilhe a URL do webapp** com pessoas não autorizadas
2. **Revise as permissões** concedidas ao script
3. **Mantenha sua conta Google segura** com autenticação de dois fatores

## Versões Suportadas

| Versão | Suportada |
| ------ | --------- |
| 1.x    | Sim       |

## Atualizações de Segurança

Atualizações de segurança serão publicadas assim que disponíveis e anunciadas no repositório.
