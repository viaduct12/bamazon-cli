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
  connection.query("SELECT * FROM products WHERE ? ", {id:id}, (err, results) => {
    if (err) throw err;

    if (unit <= results[0].stock_quantity) {
      var newAmount = results[0].stock_quantity - unit;
      var purchased = (results[0].price * unit) + (results[0].price * unit) * .15;
      var purchase = results[0].price * unit;
      var totalPurchase = results[0].product_sales + (results[0].price * unit);
      console.log("The total amount before tax is: $" + purchase + " after tax it is: $" + purchased);

      connection.query("UPDATE products SET ? WHERE ?", [
          {
            stock_quantity: newAmount,
            product_sales: totalPurchase            
          },
          {
            id: id
          }
        ], (err, data) => {
          if (err) throw err;
        })

    } else {
      console.log("Insufficient quantity!");
    }
    connection.end();
    
  })
}
