const { Client } = require('pg')
const client = new Client({
    user:'Admin',
    host: 'localhost',
    database: 'spotify',
})
client.connect()


// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })

module.exports = client;