const express = require('express');
const { Router } = require('express');
const router = Router();
const _ = require('lodash');

// de donde obtengo los datos
const books = require('../../books.json');
const authors = require('../../authors.json');

const url = '/books';

// 2- Get all books with the author - it's wrong !!!!!!!!!!
router.get( url, (req,res) => {
    _.each( books, (book) => { 
        _.each( authors, (author) => {
            if ( author.id == book.authorID ) {
                book = { ...book, author: { author } } //book será = a lo que ya tenia + el autor
            }
        });
    });
    
    res.json(books);
});

// 4- Add a book
router.post( url, (req,res) => {
    const { id, name, authorID } = req.body;

    if ( id && name && authorID ) {
        const newBook = { ...req.body };
        books.push(newBook);

        res.status(201).json({ "message": "Book Added :D" });
    } else {
        res.status(400).json({ "message": "Book Not added :c" });
    }
});

// 6- Modify a book
router.put( `${url}/:id`, (req,res) => {
    const id = req.params.id; //params es lo que le pasamos por la url
    // console.log('ID ingresado: ', id);

    const { name, authorID } = req.body;

    _.each( books, (book) => {
        if ( book.id == id ) {
            book.name = name;
            book.authorID = authorID;

            res.status(200).json({ "message": "Book Modified ;)" });
            
        } //else {
        //     res.status(404).json({ "message": "Author not found :( Es posible que haya ingresao de forma erronea el authors.id" });
        // }
    });
});

//8- Delete a book
router.delete( `${url}/:id`, (req,res) => {
    const id = req.params.id;

    _.remove(books, (book) => {
        return( book.id == id );

    });

    res.status(200).json({ 'message':'Book deleted :o' });
});


module.exports = router;