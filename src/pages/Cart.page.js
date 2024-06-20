import React from 'react';
import { UserContext } from '../contexts/user.context';
import NavBar from '../components/NavBar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import useAxios from 'axios-hooks';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';

const Cart = () => {
    // Fetching user details from UserContext
    const { user } = useContext(UserContext);
    
    // To prove that the identity of the user, we are attaching
    // an Authorization Header with the request
    const headers = { Authorization: `Bearer ${user._accessToken}` }
   
    //getting the email of the user from local storage
    const email = localStorage.getItem('email');
    
    // Fetching user cart from the backend
    const [{ data: books }] = useAxios(
        `http://localhost:5000/api/getCart?email=${email}`,
        { headers }
    );
    
    const handleRemove = (title) => {
        const response = fetch(`http://localhost:5000/api/deleteFromCart?email=${email}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => alert(response.body))
        .then(data => {
            console.log(data);
            window.location.reload();
        })
    }

    return(
        <>
        <NavBar />
        <h1>Cart</h1>       
        <div className="container">
        <div className="row">
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
        </ListGroup>    
        <Card.Body>
        <Button variant="outline-danger" onClick={() => handleRemove(book.title)}>Remove from Cart</Button>
        </Card.Body>
        </Card>
            </div>
            ))}
        </div>
        </div>
        </>
    )
    }
    
export default Cart;
