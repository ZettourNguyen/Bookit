//page to get user profile details and post them to the database
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import NavBar from '../components/NavBar';


const Details = () => {
    // Simulating user data, replace with your actual user data
    const { user } = useContext(UserContext);

    // To prove that the identity of the user, we are attaching
    // an Authorization Header with the request
    const headers = { Authorization: `Bearer ${user._accessToken}` }

    const [bookuser, setUser] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      favoriteBooks: '',
      socialMedia: {
        Twitter: '',
        Linkedin: '',
        Github: '',
      }, 
    });
  
    //getting email from local storage
    const email = localStorage.getItem('email');
    
    useEffect(() => {
      // Simulate fetching user data from an API
        fetch(`http://localhost:5000/api/profile?email=${email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUser(data);
        })
    }, []);

    return (
        <>
        <NavBar />       
    <div className='user-conatiner'>
      <h2>User Profile</h2>
      <div className='user'>
      <div>  
        <strong>Name:</strong> {bookuser.name}
      </div>
      <div>
        <strong>Email:</strong> {bookuser.email}
      </div>
      <div>
        <strong>Phone:</strong> {bookuser.phone}
      </div>
      <div>
        <strong>Address:</strong> {bookuser.address}
      </div>
      <div>
        <strong>Favorite Book: {bookuser.favoriteBooks ? `${bookuser.favoriteBooks}` : "No Favorite Book" }</strong>
      </div>
      <div>
        <strong>Social Media:</strong>
        <ul>
          <li>
            <a href={bookuser.socialMedia.Twitter}>Twitter</a>
            </li>
            <li>
            <a href={bookuser.socialMedia.Linkedin}>Linkedin</a>
            </li>
            <li>
            <a href={bookuser.socialMedia.Github}>Github</a>
            </li>
        </ul>
      </div>
      </div>
    </div>
    </>
);
}

export default Details;

