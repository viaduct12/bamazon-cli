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
  // printTable();
  start();
});

function printTable() {
  connection.query("SELECT * FROM products", (err, data) => {
    if (err) throw err;
    console.log("\n");
    console.table(data);
  });
}

function start() {
  inquirer.prompt([
    {
      name: "options",
      type: "list",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ],
      message: "What would you like to do?"
    }
  ]).then(answer => {
    switch (answer.options) {

      case "View Products for Sale":
        products();
        break;

      case "View Low Inventory":
        lowInv();
        break;

      case "Add to Inventory":
        addInv();
        break;
      
      case "Add New Product":
        addProd();
        break;

        default:
          break;
    }
  })
}

function products(){
  connection.query("SELECT * FROM products", (err,result) =>{
    if (err) throw err;

    console.table(result);
    connection.end();
  })
}

function lowInv(){
  connection.query("SELECT * FROM products WHERE stock_quantity < 5 ", (err,data) => {
    if (err) throw err;

    console.table(data);
    connection.end();
  })
}