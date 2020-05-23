const express = require('express');
const { Router } = require('express');
const _ = require('lodash');

//defino el router
const router = Router();

// de donde obtengo los datos
const books = require('../../books.json');
const authors = require('../../authors.json');

const url = '/authors';

// 1- Get all authors
router.get( url, (req,res) => {
    res.json(authors);
});

// 3- Add an author
router.post( url, (req,res) => {
    const { id, name, lastname } = req.body;

    if ( id && name && lastname ) {
        const newAuthor = { ...req.body };
        authors.push( newAuthor );

        res.status(201).json({ "message": "Author Added :D" });

    } else {
        res.status(400).json({ "message": "Author Not added :c Es posible que no esten cargaods todos los datos" });
    }
});

//5- Modify an author
router.put( `${url}/:id`, (req,res) => {
    const id = req.params.id; //params es lo que le pasamos por la url
    // console.log('ID ingresado: ', id);

    const { name, lastname } = req.body;

    _.each( authors, (author) => {
        if ( author.id == id ) {
            author.name = name;
            author.lastname = lastname;

            res.status(200).json({ "message": "Author Modified ;)" });
            
        } //else {
        //     res.status(404).json({ "message": "Author not found :( Es posible que haya ingresao de forma erronea el authors.id" });
        // }
    });
});

// 7- Delete a author - debe eliminar los libros
router.delete( `${url}/:id`, (req,res) => {
    
    const id = req.params.id;

    _.remove(authors, (author) => {
        // return( author.id == id );
        _.remove(books, (book) => {
            return( 
                book.authorID == id
            );
        });

        return( author.id == id );

    });

    res.status(200).json({ 'message':'Author and his-her Books deleted :o' });
});


module.exports = router;