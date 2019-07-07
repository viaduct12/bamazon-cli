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

//prints the data from the database to a table with the selected columns
function printTable(){
  connection.query("SELECT id, product_name, price FROM products", (err,data) => {
    if (err) throw err;
    console.log("\n");
    console.table(data);
  });
}

function start() {
  //asks for user input
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
    //parses the responses as ints and passes it into a function to search for the product in the database
    productSearch(parseInt(response.productID), parseInt(response.units));
  })
}

function productSearch(id, unit){
  //connects to the server and prompts a query which selects all of the columns from the products table where id matches the user input id
  connection.query("SELECT * FROM products WHERE ? ", {id:id}, (err, results) => {
    if (err) throw err;

    //compares the amount the customer wants to buy to the stock quantity
    if (unit <= results[0].stock_quantity) {
      //created variables to subtract the quantity from the stock and to store the purchase price and the total purchases.
      var newAmount = results[0].stock_quantity - unit;
      var purchased = (results[0].price * unit) + (results[0].price * unit) * .15;
      var purchase = results[0].price * unit;
      var totalPurchase = results[0].product_sales + (results[0].price * unit);
      console.log("The total amount before tax is: $" + purchase + " after tax it is: $" + purchased);

      //updates the database with the new quantity
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
