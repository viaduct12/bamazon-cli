# bamazon-cli

## Descriptionn
Bamazon that will check the stock to sell items to customers. Supervisor mode will allow the user to view product sales and create departments. Manager mode allows the user to View products for sale, low inventory, add to inventory, and add new products. 

## Software Installations

- Node.js - download the latest version of Node (https://nodejs.org/en/).

- Clone the bamazon repo (https://github.com/viaduct12/bamazon-cli).

- On the terminal of the root folder of the bamazon-cli; npm install

## Built With
- Visual Studio Code

- Node.js

## Node Packages

- [mysql](https://www.npmjs.com/package/mysql)

- [inquirer](https://www.npmjs.com/package/inquirer)

## Functionality

- ``` node liri.js concert-this '<artist/band name here>' ```

* Uses the Bands in Town API and npm axios to search for concert events using the artist or band as a search key. The response will render information regarding the following :

  * Name of the venue
  * Venue location
  * Date of the Event (using the format "MM/DD/YYYY")

- ``` node bamazonCustomer.js ```

* Shows a table of items to purchase and asks the customer what id of the item they would like to purchase. Then asks the customer how many of the item would they like to acquire. If the quantity is greater than the stock quantity then an error will be thrown. Uses SQL to store all the data.

- ``` node bamazonManager.js ```

* Shows a table of all the items and information regarding the products. Has several choices that the manager can choose from. Uses SQL to store all the data.

  -View products for sale, which shows all the products in the database.
  -Low inventory, shows inventory that is less than 5
  -Add to inventory, adds to the quantity.
  -Add new product, adds a new product to the database.
  -Exit

- ``` node bamazonManager.js ```

* Shows a table of all the items and information regarding the products. Has several choices that the manager can choose from. Uses SQL to store all the data.

  -View product sales, shows the total product sales
  -Create new department, creates a new department.


## Demo
[Video on what Bamazon does](https://vimeo.com/346338140)

## Author
Lawrence Fiesta