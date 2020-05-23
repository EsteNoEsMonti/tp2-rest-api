/* 
    Tp 2 - Rest API
    Lucas Daniel Montivero

    1- Create 2 JSON files with authors and books 
    2- Author have id, name and lastname
    3- Book have id, name and authorId

    Create a RestApi with the followinf endpoints

    1- Get all authors
    2- Get all books with the author
    3- Add an author
    4- Add a book
    5- Modify an author
    6- Modify a book
    7- Delete a author
    8- Delete a book
*/

const express = require('express');
const morgan = require('morgan');
const router = require('./routes/index');

const app = express(); //Defino app que proviene de express

app.use(morgan('dev'));
app.set('port', 3000);
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//route
//routes
app.use(router);

app.listen(app.get('port'), () =>{
    console.log(`Server listen on port ${app.get('port')}`);
});



