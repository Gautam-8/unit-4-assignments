const { createClient } = require("redis");

const client =  createClient();


const connect = async () => {
   await client.connect();
}

connect();

module.exports = client;