# case-shopper
Repositório utilizado para fazer o case da shopper

## Tecnologias Utilizadas no Back-End

 1. Typescript
 2. Node.js
 3. Knex
 4. Bcryptjs
 5. Express
 6. cors
 7. Uuid
 8. Jsonwebtoken
 9. Dotenv
 10. Mysql 
 11. Postman (documentação)
 12. Arquitetura limpa com Solid e injenção de dependencias

## Tabelas Criadas
```sql
CREATE TABLE IF NOT EXISTS products_shopper (
    id VARCHAR(80) PRIMARY KEY ,
    name VARCHAR(120) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    quantity_stock INT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_shopper (
    id VARCHAR(80) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(120) NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT "NORMAL"
);

CREATE TABLE IF NOT EXISTS user_shopping_list(
    id_product VARCHAR(80) NOT NULL,
    id_user VARCHAR(80) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (id_product) REFERENCES products_shopper(id),
    FOREIGN KEY (id_user) REFERENCES user_shopper(id)
);
```
## Documentação
- link aqui

## Tecnologias Utilizadas no Front-End
1. React.js
2. Axios
3. React router dom
4. Styled components
5. Ui material
6. Arquitetura limpa por meio de componentes funcionais

## Paginas Criadas
- [x] Home;
- [x] Login;
- [x] Signup;
- [x] Area do admin;

# 

# Como rodar a aplicação na maquina local

## Dentro das pasta back-end

1. Rodar o comando npm (ou yarn) install dentro da pasta back-end;
2. Criar arquivo .env;
3. dentro do arquivo .env:
```.env
DB_HOST: (insira o host do BD)
DB_USER: (insira o usuario do BD aqui)
DB_PASS: (insira a senha do BD aqui)
DB_NAME: (insira o nome do BD aqui)
JWT_KEY: ahduwhduhawdui
ACCESS_TOKEN_EXPIRES_IN: 1h
```
4. Rodar o npm (ou yarn) start dentro da pasta back-end.

**Observações:**
>  1. JWT_KEY e ACESS_TOKEN_EXPIRES_IN podem deixar da forma que esta
>  2. BD = Banco de dados

## Dentro das pasta front-end

1. Rodar o comando npm (ou yarn) install dentro da pasta front-end;
2. Rodar o npm (ou yarn) start dentro da pasta front-end.
