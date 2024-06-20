import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import NavBar from '../components/NavBar';

const About = () => {
  // Fetching user details from UserContext
  const { user } = useContext(UserContext);

  
  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` }
  return(

    <NavBar />
    
  )
}

export default About;
