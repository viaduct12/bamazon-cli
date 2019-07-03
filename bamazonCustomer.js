var inquirer = require("inquirer");
var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "wordpass123",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  printTable();
  start();
});

function printTable(){
  connection.query("SELECT id, product_name, price FROM products", (err,data) => {
    if (err) throw err;
    console.log("\n");
    console.table(data);
  });
}

function start() {
  inquirer.prompt([
    {
      name: "productID",
      message: "What is the ID of the product you would like to purchase?"
    },
    {
      name: "units",
      message: "How many units of the product you'd like to purchase?"
    }
  ]).then (response => {
    productSearch(parseInt(response.productID), parseInt(response.units));
  })
}

function productSearch(id, unit){
  console.log(unit);
  connection.query("SELECT * FROM products", (err, results) => {
    if (err) throw err;
    results.filter(item => {
      if(item.id === parseInt(id)){
        if(unit <= item.stock_quantity){
          var newAmount = item.stock_quantity - unit;
          var purchased = (item.price * unit) + (item.price * unit) * .15;
          console.log("The total amount for your purchase plus tax is: $" + purchased);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newAmount
              },
              {
                id: item.id
              }
            ],
            )
            return true;
        } else {
          console.log("Insufficient quantity!");
          start();
        }
      }
      return false;
    });
    printTable();
    connection.end();
  })
}
