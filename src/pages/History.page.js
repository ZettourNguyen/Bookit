import React from 'react';
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';
import illustration4 from "../assets/illustration4.svg"
import "./styles/History.style.css"
const History = () => {
  
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Retrieve the user email from local storage or wherever it is stored in your frontend
      const email = localStorage.getItem('email');
  
      // Check if the email is available
      if (!email) {
        setError('User email is not available');
        setLoading(false);
        return;
      }
  
      // Make a request to the backend API
      fetch(`http://localhost:5000/api/history?email=${email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch listings');
          }
          return response.json();
        })
        .then((data) => {
          setHistory(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, []); // This useEffect runs only once when the component mounts
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <>
      <NavBar/>
      <div className='history-container'>
        <h1>Your History</h1>
       {// a react-boostrap table of all the listings of the user aloing with the edit and delete buttons
       }
       <div className='historycontainer'>
        <Table responsive variant="dark" hover bordered class="table">
          <thead>
            <tr>
              <th scope="col">Book Transactions ID</th>
              <th scope="col">Book Title</th>
              <th scope="col">Author</th>
              <th scope="col">Genre</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {history.map((bhistory) => (
              <tr>
                <td>{bhistory._id}</td>
                <td>{bhistory.title}</td>
                <td>{bhistory.author}</td>
                <td>{bhistory.genre}</td>
                <td>{bhistory.price}</td>
                <td>{bhistory.description}</td>
                </tr>
            ))}
          </tbody>
        </Table>
        </div>
        <img src={illustration4} alt='history' width={300} height={300} className='history-img' />
      </div>
  
      </>
    )
}

export default History;
