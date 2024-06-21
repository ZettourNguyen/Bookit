// server.js
const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(cors())
const dotenv = require('dotenv').config();


const PORT = process.env.PORT || 5000;

const mongoURI = "mongodb://mongodb:27017/bookit";
// "mongodb://mongo:27017/";

// Connect to local MongoDB
mongoose.connect(mongoURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema and model for books
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  email: { type: String, required: true },
  cover: {
    data: Buffer,
    contentType: String
  }
});

// Create a schema and model for cart
const cartSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: String, required: true },  
});

// Create a schema and model for users
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  favoriteBooks: { type: String, required: false },
  socialMedia: {
    Twitter: { type: String, required: false },
    Linkedin: { type: String, required: false },
    Github: { type: String, required: false },
  },
});

const Book = mongoose.model('bookit', bookSchema);
const Cart = mongoose.model('cart', cartSchema);
const User = mongoose.model('user', userSchema);

app.use(bodyParser.json());

// Define a route to display user profile info from the database
app.get('/api/profile', async (req, res) => {
  try {
    const useremail = req.query.email;
    const user = await User.findOne({ email: useremail });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to add user profile info to the database
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, phone, address, favoriteBook, twitter, linkedin, github } = req.body;

    const newUser = new User({
      name,
      email,
      phone,
      address,
      favoriteBook,
      socialMedia: {
        twitter,
        linkedin,
        github,
      },
    });

    await newUser.save();

    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to get all books
app.get('/api/getbooks', async (req, res) => {
  try {
    const books = await Book.distinct('_id').find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to add a new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, genre, price, description, email, cover } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      price,
      description,
      email,
      cover,
    });

    await newBook.save();

    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//to get all the listings of the user withthe help of user email id incoming as a query parameter
app.get('/api/listings' , async (req, res) => {
  try {
    const useremail = req.query.email;
    const listings = await Book.find({email: useremail});
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//to delete a listing of the user with the help of object id as well as book title incoming as a query parameter
app.delete('/api/listingsDelete' , async (req, res) => {
  try {
    const useremail = req.query.email;
    const booktitle = req.query.title;
    const id = req.query.id;
    const listings = await Book.deleteOne({email: useremail, title: booktitle, _id: id});
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//to add books to cart of the user with the help of object id as well as book title incoming as a query parameter
app.post('/api/addToCart' , async (req, res) => {
  try {
    const useremail = req.query.email;
    const booktitle = req.query.title;
    const bookprice = req.query.price;
    const bookauthor = req.query.author;
    const listcart = new Cart({
      email: useremail,
      title: booktitle,
      price: bookprice,
      author: bookauthor,
    });
   
    await listcart.save();
    res.status(201).json({message: 'Book added to cart successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//to get all books in cart of a user using email id as a query parameter
app.get('/api/getCart' , async (req, res) => {
  try {
    const useremail = req.query.email;
    const listings = await Cart.find({email: useremail});
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//to delete a book from cart of a user using email id as well as book title as a query parameter
app.delete('/api/deleteFromCart' , async (req, res) => {
  try {
    const useremail = req.query.email;
    const booktitle = req.query.title;
    const listings = await Cart.deleteOne({email: useremail, title: booktitle});
    res.json({message: 'Book deleted from cart successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//to get all the history of the user with the help of user email id incoming as a query parameter
app.get('/api/history' , async (req, res) => {
  try {
    const useremail = req.query.email;
    //const listings = await Cart.find({email: useremail});
    const list = await Book.find({email: useremail});
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
