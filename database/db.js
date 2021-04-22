const {Pool} = require('pg')

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fgmilhoverde',
    password: '12345678',
    port: 5432,

})

module.exports = db