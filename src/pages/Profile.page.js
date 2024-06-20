//page to get user profile details and post them to the database
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import illustration3 from "../assets/illustration3.svg"
import { Avatar } from '@mui/material';
import avatar from "../assets/avatar.png"

import "./styles/Profile.style.css"
const Details = () => {

    // To prove that the identity of the user, we are attaching
    // an Authorization Header with the request

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
    
    useEffect(() => {
      const email = localStorage.getItem('email');
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
    <div className='user-container'>
      <img src={illustration3} alt='user' className='user-img' />
      <div className='user-details'>
      <h1>User Profile</h1>
      <Avatar sx={{ width: 100, height: 100 }} src={avatar} />
      <br/>
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
        <strong>Favorite Book: </strong> {bookuser.favoriteBooks ? `${bookuser.favoriteBooks}` : "No Favorite Book" }
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
    </div>
    </>
);
}

export default Details;

