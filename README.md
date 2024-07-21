# BeTalent-API
API Restful desenvolvida em NodeJS e TypeScript com framework Adonis.JS v6 e Banco de Dados MySQL para atender a desafio técnico de backend proposto por [BeTalent.tech](https://betalent.tech).


<details>
<summary>Enunciado do desafio proposto.</summary>


#### Desafio
O Teste Técnico Back-end da BeTalent consiste em estruturar uma API RESTful conectada a um banco de dados.

Trata-se de um sistema que permite cadastrar usuários externos. Ao realizarem login, estes usuários deverão poder registrar clientes, produtos e vendas.

O(a) candidato(a) deve desenvolver o projeto em um dos seguintes frameworks: Adonis (Node.js) ou Laravel (PHP).


##### Banco de dados
O banco de dados deve ser estruturado à escolha do(a) candidato(a), mas minimamente deve conter:
- usuários: email, senha;
- clientes: nome, cpf;
- endereço: todos os campos de endereço;
- telefones: cliente, número;
- produtos: colocar os dados necessários para um tipo de produto, além de preço.
- vendas: cliente, produto, quantidade, preço unitário, preço total, data e hora.


##### Rotas do sistema
O sistema deve contar com rotas para:
- cadastro de usuário do sistema (signup);
- login com JWT de usuário cadastrado (login);
- clientes:
    - listar todos os clientes cadastrados (index)
        - apenas dados principais devem vir aqui;
        - ordenar pelo id;
    - detalhar um(a) cliente e vendas a ele(a) (show):
        - trazer as vendas mais recentes primeiro;
        - possibilidade de filtrar as vendas por mês + ano;
    - adicionar um(a) cliente (store);
    - editar um(a) cliente (update);
    - excluir um(a) cliente e vendas a ele(a) (delete);
- produtos:
    - listar todos os produtos cadastrados (index):
        - apenas dados principais devem vir aqui;
        - ordenar alfabeticamente.
    - detalhar um produto (show);
    - criar um produto (store);
    - editar um produto (update);
    - exclusão lógica ("soft delete") de um produto (delete);
- vendas:
    - registrar venda de 1 produto a 1 cliente (store).

- Observação: as rotas em clientes, produtos e vendas só devem poder ser acessadas por usuário logado.


##### Requisitos
São requisitos básicos:
- estruturar o sistema observando o MVC (porém, sem as views);
- usar MySQL como banco de dados;
- respostas devem ser em JSON;
- pode-se usar recursos e bibliotecas que auxiliam na administração do banco de dados (Eloquent, Lucid, Knex, Bookshelf etc.);
- documentar as instruções necessárias em um README (requisitos, como instalar e rodar o projeto, detalhamento de rotas e outras informações que julgar relevantes).

Caso o(a) candidato(a) não consiga completar o teste até o prazo definido, deve garantir que tudo que foi construído esteja em funcionamento. Neste caso, relatar no README quais foram as dificuldades encontradas.


##### Critérios de avaliação
Serão critérios para avaliação da solução fornecida:
- lógica de programação;
- organização do projeto;
- legibilidade do código;
- validação necessária dos dados;
- forma adequada de utilização dos recursos;
- seguimento dos padrões especificados;
- clareza na documentação.


##### Envio da solução
O projeto deverá ser hospedado em um repositório no GitHub. O link do repositório deverá ser fornecido no formulário.

</details>

# INCOMPLETO
## Instalação e execução

Para instalar e executar o projeto localmente em ambiente de desenvolvimento, é preciso:
- ter o Node.js, versão 20.6 ou superior; e o NPM instalados na máquina.
- ter um banco MySQL rodando localmente. Se não tiver, leia a seção [Execução dos testes](#execução-dos-testes) que contém instruções de como instanciar rapidamente.
```
# Clonar o repositório
$ git clone git@github.com:LCSLITX/BeTalent_API.git

# Acessar o diretório
cd BeTalent_API

# Instalar as dependências
$ npm install

# Antes de prosseguir configure o arquivo .env com as credenciais do banco de dados

# Executar as migrations. ATENÇÃO: Este comando apaga os dados do banco configurado no arquivo .env.
$ node ace migration:run

# Executar o servidor
$ npm run dev 
# ou node ace serve
```

# INCOMPLETO
## Execução dos testes

Os testes funcionais se prestam a evidenciar o preenchimento dos requisitos do desafio proposto, bem como dos critérios de avaliação.

Para executar os testes funcionais, é preciso uma instância do MySQL rodando localmente e um arquivo `.env` configurado com as credenciais de acesso.

Para executar os testes de maneira fácil, é possível utilizar:
1. O Dockerfile presente no repositório para iniciar uma instância MySQL. Para isso, execute o seguinte comando:

    ```bash
    $ command
    ```
2. O arquivo `.env.example`, que já conta com a configuração para acessar o banco criado pelo comando anterior. Basta renomear o arquivo para `.env`.

Com o banco de dados rodando e o arquivo `.env` configurado, execute o seguinte comando:

```bash
# ATENÇÃO: Este comando irá executar as migrations e todos os testes constantes no diretório e, consequentemente, apagar os dados do banco configurado no arquivo .env.
$ npm run fresh-test
```


<details>
<summary>Atendimento dos requisitos.</summary>

#### Atendimento dos requisitos

##### Banco de dados
O banco de dados deve ser estruturado à escolha do(a) candidato(a), mas minimamente deve conter:
- [X] usuários: email, senha;
- [X] clientes: nome, cpf;
- [X] endereço: todos os campos de endereço;
- [X] telefones: cliente, número;
- [X] produtos: colocar os dados necessários para um tipo de produto, além de preço.
- [X] vendas: cliente, produto, quantidade, preço unitário, preço total, data e hora.


##### Rotas do sistema
O sistema deve contar com rotas para:
- [X] cadastro de usuário do sistema (signup);
- [X] login com JWT de usuário cadastrado (login);
- [X] clientes:
    - [X] listar todos os clientes cadastrados (index)
        - [X] apenas dados principais devem vir aqui;
        - [X] ordenar pelo id;
    - [X] detalhar um(a) cliente e vendas a ele(a) (show):
        - [X] trazer as vendas mais recentes primeiro;
        - [X] possibilidade de filtrar as vendas por mês + ano;
    - [X] adicionar um(a) cliente (store);
    - [X] editar um(a) cliente (update);
    - [X] excluir um(a) cliente e vendas a ele(a) (delete);
- [X] produtos:
    - [X] listar todos os produtos cadastrados (index):
        - [X] apenas dados principais devem vir aqui;
        - [X] ordenar alfabeticamente.
    - [X] detalhar um produto (show);
    - [X] criar um produto (store);
    - [X] editar um produto (update);
    - [X] exclusão lógica ("soft delete") de um produto (delete);
- [X] vendas:
    - [X] registrar venda de 1 produto a 1 cliente (store).

- [X] Observação: as rotas em clientes, produtos e vendas só devem poder ser acessadas por usuário logado.


##### Requisitos
São requisitos básicos:
- [X] estruturar o sistema observando o MVC (porém, sem as views);
- [X] usar MySQL como banco de dados;
- [X] respostas devem ser em JSON;
- [X] pode-se usar recursos e bibliotecas que auxiliam na administração do banco de dados (Eloquent, Lucid, Knex, Bookshelf etc.);
- [X] documentar as instruções necessárias em um README (requisitos, como instalar e rodar o projeto, detalhamento de rotas e outras informações que julgar relevantes).


</details>



# INCOMPLETO
## Detalhamento das rotas

```bash
# Utilize o seguinte comando para visualizar as rotas disponíveis no projeto
$ npm run routes
```



## Database Entities Relationships Diagram
