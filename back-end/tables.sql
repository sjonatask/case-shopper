-- Active: 1662679144787@@35.226.146.116@3306@joy-419687-jonathan-souza
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