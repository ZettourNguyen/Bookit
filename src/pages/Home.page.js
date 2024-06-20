import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import NavBar from '../components/NavBar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import useAxios from 'axios-hooks';
import "./styles/Home.style.css";

const Home = () => {
  // Fetching user details from UserContext
  const { user } = useContext(UserContext);

  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` }
  
  // Fetching random 9 books from the backend
  const [{ data: books }] = useAxios(
    'http://localhost:5000/api/getbooks',
    { headers }
  );
  
  const handleaddcart = (title, price, author) => {
    console.log("Add to cart clicked");
    const userEmail = localStorage.getItem('email');
    //a post request to add the book to the cart
    const response = fetch(`http://localhost:5000/api/addToCart?email=${userEmail}&title=${title}&price=${price}&author=${author}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    if (response.ok) {
      alert('Book added to cart successfully');
    }
    else{
      alert('Book could not be added to cart' + response.status);
    }
  }

  return(
    <>
    <NavBar />
    {//create a card for each book for 9 random books obtained on fetch request using react-bootstrap cards
    }       
    <div className="container-body">
      
      <div className="row">
        <strong id='head'>Books available in Market</strong>
        {books && books.map((book) => (
          <div className="col-md-4">
           <Card border="success" bg="dark" key="dark" text="white" style={{ width: '18rem' }}>
      <Card.Img variant="top" src="#" />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          {book.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Price Listing: {book.price}</ListGroup.Item>
        <ListGroup.Item>Author: {book.author}</ListGroup.Item>
        <ListGroup.Item> Genre: {book.genre}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link onClick={() => handleaddcart(book.title, book.price, book.author)} href="#">Add to Cart</Card.Link>
      </Card.Body>
    </Card>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Home;
