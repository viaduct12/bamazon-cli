DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT DEFAULT 0,
  product_sales INT DEFAULT 0,
  stock_quantity INT DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs INT DEFAULT 0,
  PRIMARY KEY (department_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook", "electronics", 1299, 10), ("Balenciaga x Nike", "shoes", 780, 2), ("Supreme x North Face", "clothing", 2488, 1);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("electronics", 40000), ("clothing", 5000), ("shoes", 25000);

SELECT * FROM products;
SELECT * FROM departments;