## MEAN Stack CRUD Tutorial by Jani Makinen (2017) ##

This tutorial is intended for Ubuntu 16.04 Linux, but can work on other Linux versions as well. You can install Oracle VirtualBox on Windows or MacOS and add Ubuntu on it for free to follow this tutorial if you wish. All software that is used is free & open source. The end result will be a basic starting point for a MongoDB, Express, Angular and NodeJS application with a rather... crude... implementation of CRUD.

> **Requirements to succeed:** 
> * basic knowledge of the Linux shell
> * basic understanding of JavaScript
> * 10 to 15 minutes of your time depending on your Internet connection

#### First step: Install the operating system & the NodeJS toolset
> Download and install the Ubuntu Linux Operating System (Mine was Ubuntu 16.04) and install Node & NPM.
>> sudo apt-get update
>> sudo apt-get install nodejs
>> sudo apt-get install npm

#### Second step: Install the database (MongoDB) to connect to later with NodeJS
> It is important to understand that MongoDB is it's own program, and NodeJS has another NPM package called 'mongodb' as well which will be interface between the actual running Linux MongoDB program and the NodeJS JavaScript based server application.
>> sudo apt-get install mongodb
>> sudo service mongodb start
>> sudo systemctl enable mongodb
>>> Note that the last command enables mongodb to restart itself when you reboot your server,
>>> see the section about Troubleshooting MongoDB for more advice if you run into trouble.

#### Third step: Install the required NodeJS components & backend
> Start Ubuntu and open your terminal by pressing CTRL+T. Enter or copy paste the following command:
>> cd ~ 
>> git clone https://github.com/gfx0/meanstackcrud.git
>> cd meanstackcrud
>> npm start
>>>You might be asked for sudo passwords, that's because we're using the port 80 to be able to only write localhost into the browser without that pesky extra number typing from the port numbers in localhost:3000 :P
>
> Then just navigate with your browser to your **http://localhost** and you can experience the MEAN stack CRUD by clicking them buttons .

#### Troubleshooting MongoDB
>Make sure you have enough hard disk on your server before  proceeding, mongo failed to start silently as my tiny virtualbox instance ran out of diskspace, beware of this.
>
> Make sure you don't have apache2 or nginx running under some other user, by checking with 
> **sudo ps aux |grep apache2** to see if there are any processes running. A nice way of shutting apache down for example is **sudo service apache2 stop** but this is the part where GoogleFu is important to master.
> 
You do a quick test of your MongoDB installation by running: npm install --save mongodb incase you haven't cloned this git repository yet. After that operation is complete, put the code snippet below this paragraph into index.js and run **sudo node index.js** If the result is 'database connection OK' then your MongoDB installation was succesfull and you're ready to party.

> ```js
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://127.0.0.1:27017/test', function >(err, db) {
  if (err) { throw err; }
  console.log("Database connection OK.");
  db.close(); // Not that this db.close() is only for testing purposes, don't leave it into your code.
});
```
