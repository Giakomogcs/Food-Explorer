
# Food Explorer API

A aplicação que desenvolveremos é um cardápio digital para um restaurante fictício, conhecido como foodExplorer.

Tecnologias usadas: `HTML`, `CSS`, `JavaScript`, `Node.js`, `React.js`

Esse é um projeto feito para a conclusão do curso do explorer, onde fiz do zero uma api para cadastro de usuarios que terão acesso a um menu com todos os pratos e produtos de um restaurante para assim utilizar a aplicação como um cardápio.

O food explorer terá duas personas: o *admin* e o *usuário*;

O **admin** é a pessoa responsável pelo restaurante, logo, poderá criar, visualizar, editar e apagar um prato a qualquer momento. Cada prato deve conter uma imagem, um nome, uma categoria, uma breve descrição, os ingredientes e o seu preço. Ao clicar em adicionar prato, o admin receberá uma mensagem de sucesso e será redirecionado para a página principal;

O **usuário** irá visualizar todos os pratos cadastrados e, quando clicar em um prato, será redirecionado para uma nova tela com informações mais detalhadas sobre ele.

 


## Start

Instale o projeto com npm

```bash
  npm install
  npm start
```
    
## Documentação da API

#### Cria usuario

```http
  POST http://localhost:3333/users
```

#### Alterar informações do usuario

```http
  PUT http://localhost:3333/users/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

```json
{
	"name" : "Giovani",
	"email" : "gigi@gmail.com",
	"password" : "123",
	"isAdmin" : true
}
```


#### SignIn

```http
  POST http://localhost:3333/sessions
```
```json
{
	"email" : "gigi@gmail.com",
	"password" : "123"
}
```


#### Criar prato

```http
  POST http://localhost:3333/pratos
```
```json
{
	"name" : "Esfirra",
	"category" : "Refeições",
	"price" : "6.45",
	"description": "Caseira!",
	"Ingredients" : ["Massa", "Carne", "Queijo"]
}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Ingredients`      | `array` | Será adicionado em outra tabela, com link polo user_id |


#### Retorna os pratos de acordo com Query

```http
  GET http://localhost:3333/pratos?name=&Ingredients=
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | Nome do prato |
| `Ingredients`      | `string` | Nome de um ingrediente |


#### Deletar prato

```http
  DELETE http://localhost:3333/pratos/${prato_id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `prato_id`      | `string` | **Obrigatório**. O ID do prato que você quer |


#### Inserir imagem ao prato

```http
  PATCH http://localhost:3333/pratos/picture/${prato_id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `prato_id`      | `string` | **Obrigatório**. O ID do prato que você quer inserir a imagem |


#### Exibir imagem do prato

```http
  GET http://localhost:3333/files/${picture_path}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `picture_path`      | `string` | **Obrigatório**. O PATH da imagem que você quer exibir|


## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio de giakomogcs@gmail.com

