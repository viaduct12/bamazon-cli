var inquirer = require("inquirer");
var mysql = require("mysql");


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

function printDept() {
  connection.query("SELECT * FROM departments", (err,data) => {
    console.table(data);
  })
}

function start() {
  inquirer.prompt([
    {
      name:"options",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Product Sales by Department",
        "Create New Department",
        "Exit"
      ]
    }
  ]).then(results => {
    switch (results.options) {
      case "View Product Sales by Department":
        sales();
        break;
      
      case "Create New Department":
        create();
        break;

      case "Exit":
        console.log("Goodbye!")
        connection.end();
        break;
        
      default:
        break;
    }
  })
}

function sales() {
  var query = "SELECT departments.department_id, departments.over_head_costs, departments.department_name, products.product_sales, products.stock_quantity AS total_profit FROM departments INNER JOIN products on departments.department_name=products.department_name";

  connection.query(query, (err,data) => {
    if (err) throw err;
  
    for(var i = 0; i < data.length; i++){
      data[i].total_profit = data[i].product_sales - data[i].over_head_costs;
    }
    console.log("\n");
    console.table(data);
    console.log("\n");
  })
  
  start();
}

function create() {

  inquirer.prompt([
    {
      name: "dept",
      message: "What department would like to add?"
    },
    {
      name: "costs",
      message: "How much over head will they have?"
    }
  ]).then(answer => {
    var queries = "INSERT INTO departments (department_name, over_head_costs) VALUES ?";
    var values = [[answer.dept.toLowerCase(), parseInt(answer.costs)]]
    connection.query(queries, [values], (err,data) => {
      if(err) throw err;

      console.log(answer.dept, "has been added!");
    })
    printDept();
    start();
  })
}