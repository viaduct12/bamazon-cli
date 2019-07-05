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
      name: "options",
      type: "list",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
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

      case "Exit":
        console.log("Goodbye!");
        connection.end();
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
    start();
  })
}

function lowInv(){
  connection.query("SELECT * FROM products WHERE stock_quantity < 5 ", (err,data) => {
    if (err) throw err;

    console.table(data);
    start();
  })
}

function addInv(){
  inquirer.prompt([
    {
      name:"item",
      message:"Which item id would you like to add more inventory too?"
    },
    {
      name:"quantity",
      message:"How much would you like to add to the current stock?"
    }
  ]).then(answer => {
    
    var idInt = parseInt(answer.item);
    connection.query("SELECT * FROM products WHERE ?", {id:idInt}, (err,data)=> {
      if (err) throw err;
      var quantityInt = parseInt(answer.quantity) + data[0].stock_quantity;
    
      connection.query("UPDATE products SET ? WHERE ?", [
        {
          stock_quantity: quantityInt
        },
        {
          id: idInt
        }
      ], (err,data) => {
        if(err) throw err;
        products();
      })
    })
  })
}

function addProd(){
  inquirer.prompt([
    {
      name:"prodName",
      message:"What is the name of the product that you want to add?"
    },
    {
      name: "deptName",
      message: "What is the type of the product is this?"
    },
    {
      name: "pricePoint",
      message: "What is the price of the product that you want to add?"
    },
    {
      name: "stock",
      message: "How much of the product did you want to add?"
    }            
  ]).then(answer =>{
    var queries = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?";
    var values = [[answer.prodName, answer.deptName, parseInt(answer.pricePoint), parseInt(answer.stock)]];
    connection.query(queries, [values], (err,data) => {
      if (err) throw err;
    })
    products();
  })
}