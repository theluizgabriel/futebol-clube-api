
# 📄 Sobre

O TFC é um app informativo que disponibiliza a tabela de partidas de futebol de acordo com a atualização das partidas.
Através dele você pode informar os novos resultados de cada time e alterar a tabela, cuja a API foi totalmente desenvolvida por mim.

## Stack utilizada
- [Node.js](https://nodejs.org/en/);
- [Express.js](https://expressjs.com/);
- [MySQL](https://www.mysql.com/);
- [Sequelize(ORM)](https://sequelize.org/);
- [JWT(Autenticação)](https://jwt.io/);
- [bcrypt.js](https://github.com/kelektiv/node.bcrypt.js#readme);
- [Docker](https://www.docker.com/);
- [TypeScript](https://www.typescriptlang.org/);
- [Mocha](https://mochajs.org/);
- [Chai](https://www.chaijs.com/);


## 📋 Executando o app

Clone o repositório:

```
git@github.com:theluizgabriel/futebol-clube-api.git
```

<details>
  <summary><strong>🐳 Rodando no Docker vs Localmente</strong></summary><br />
  
  ## Com Docker
  
  > Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queira fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `trybesmith` e outro chamado `trybesmith_db`.
  - A partir daqui você pode rodar o container `trybesmith` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it trybesmith bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`

  ⚠ Atenção ⚠ Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  ⚠ Atenção ⚠ O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  ⚠ Atenção ⚠ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

   ⚠ Atenção ⚠ Caso você esteja usando macOS e ao executar o `docker-compose up -d` se depare com o seguinte erro:

  ~~~bash
  The Compose file './docker-compose.yml' is invalid because:
  Unsupported config option for services.db: 'platform'
  Unsupported config option for services.node: 'platform'
  ~~~

> Foram encontradas 2 possíveis soluções para este problema:
> 1. Você pode adicionar manualmente a option `platform: linux/amd64` no service do banco de dados no arquivo docker-compose.yml do projeto, mas essa é uma solução local e você deverá reproduzir isso para os outros projetos.
> 2. Você pode adicionar manualmente nos arquivos .bashrc, .zshenv ou .zshrc do seu computador a linha `export DOCKER_DEFAULT_PLATFORM=linux/amd64`, essa é uma solução global.
> As soluções foram com base [nesta fonte](https://stackoverflow.com/a/69636473).

---
  
  ## Sem Docker
  
  > Instale as dependências [**Caso existam**] com `npm install`

</details>

## 🔎 Rotas

<details>
<summary><strong>LOGIN</strong></summary>
  
  > <strong>POST /login</strong>
  
   • Se o login for feito com sucesso retorna um token para o usuário.
   <b>O endpoint deve receber a seguinte estrutura:</b>
   
```json
  {
    "username": "string",
    "password": "string"
  }
```

 > <strong>GET /login/validate</strong>

   • O Token recebido no método POST deve ser passado em Authorization no Headers.
   • Caso correto, retorna o Role do usúario.
</details>

<details>
<summary><strong>TEAMS</strong></summary>

  > <strong>GET /teams</strong>
   
   • Retorna todos os times cadastrados na base de dados.
   
  > <strong>GET /teams/:id</strong>

   • Retorna todos o time referente ao id passado como Params.
</details>

<details>
<summary><strong>MATCHES</strong></summary>

  > <strong>GET /matches</strong>
  
   • Retorna todas as partidas cadastradas na base de dados.
   
  > <strong>GET /matches?inProgress=true</strong>
     
   • Retorna as partidas em progresso cadastradas na base de dados.
  
  > <strong>GET /matches?inProgress=false</strong>
     
   • Retorna as partidas finalizadas cadastradas na base de dados.
  
  > <strong>POST /matches</strong>

   • Cadastrada partidas na base de dados.

   <b>O endpoint deve receber a seguinte estrutura (Token deve ser passado no Header):</b>
   
```json
  {
    "homeTeam": "number",
    "awayTeam": "number",
    "homeTeamGoals": "number",
    "awayTeamGoals": "number"
  }
```
  > <strong>PATCH /matches/:id/finish</strong>
  
  • Finaliza partidas em progresso na base de dados.
  
  > <strong>PATCH /matches/:id</strong>
  
  • Atualiza partidas em progresso na base de dados.

   <b>O endpoint deve receber a seguinte estrutura (Token deve ser passado no Header):</b>
   
```json
  {
    "id": "number",
    "homeTeamGoals": "number",
    "awayTeamGoals": "number"
  }
```
</details>

<details>
  <summary><strong>LEADERBOARD</strong></summary>
  
  > <strong>GET /leaderboad</strong>
  
   • Retorna a classificação geral.
   
  > <strong>GET /leaderboard/home</strong>
     
   • Retorna a classificação baseada no desempenho em casa.
  
  > <strong>GET /leaderboard/away</strong>
     
   • Retorna a classificação baseada no desempenho fora de casa.
</details>

## 👨🏻‍💻 Habilidades

- Criação de API REST utilizando a arquitetura de camadas (Model-Service-Controller);
- Utilização de TDD ao longo do projeto para efetuar testes de integração e cobertura;
- Modelagem de dados com MySQL através do Sequelize;
- Utilização de Typescript com Banco de Dados;
- Utilização de JWT;
- Criação e associação de tabelas usando models do sequelize;
- Conhecimento dos pilares da Programação Orientada a Objetos: Herança, Abstração, Encapsulamento e Polimorfismo;
- habilidade de utilizar Composição;
- Implementação em TypeScript de Classes, Instâncias, Atributos, Métodos e Objetos;
- Validar conhecimento e aplicação dos princípios SOLID.
