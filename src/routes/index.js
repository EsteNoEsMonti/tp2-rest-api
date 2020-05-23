const { Router } = require('express');
const router = Router();

const authors = require('./authors.router');
const books = require('./books.router');

//routes
// Aauthors
router.use('/api', authors);
// Books
router.use('/api', books);

module.exports = router;