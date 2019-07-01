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
  start();
});

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
  connection.query("SELECT id, stock_quantity FROM products", (err, results) => {
    if (err) throw err;

    
    var idCrap = results.filter(item => {
      if(item.id === parseInt(id)){
        // return true;
        if(unit <= item.stock_quantity){
          var newAmount = item.stock_quantity - unit;
          // console.log(newAmount);
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
          console.log("We regret to inform you that the number of units you wish procure is greater than our stock. Please reselect a different quantity");
          // connection.end();
          start();
        }
      }
      return false;
      // console.log(item.id, id);
    });

    console.log(idCrap, "hello");

    connection.end();
  })
}
