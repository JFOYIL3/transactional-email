const {createPool} = require('mysql');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'email_test',
    connectionLimit: 10
});


const email = "email";
const firstName = "firstName";
const lastName = 'lastName';
const lastPlayed = '4/4/2004';



pool.query(`insert into user (firstName, lastName, email, lastPlayed) values ('${firstName}', '${lastName}', '${email}', '${lastPlayed}')`, (err, result, fields) => {
    if(err){
        return console.log(err);
    }
    return console.log(result);
});


