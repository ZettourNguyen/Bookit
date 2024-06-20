import { useContext, useState } from 'react';
import { UserContext } from '../contexts/user.context';
import NavBar from '../components/NavBar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles/Listbook.style.css';
import illustration from '../assets/illustration.svg';

const ListBook = () => {
  // Fetching user details from UserContext
  const { user } = useContext(UserContext);

  // To prove the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` };
  var genre = ["Fiction and Fantasy", "Science Fiction", "Mystery and Thriller", "Romance", "Horror", "Self Help", "Biographies and Autobiographies", "History", "Travel", "Children's", "Religion, Spirituality & New Age", "Science and Technology", "Cookbooks, Food and Wine", "Arts & Photography", "Humor & Entertainment"] 

  const [validated, setValidated] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      alert("Please fill all the required fields");
      return;
    }
    setValidated(true);
    
    const book = {
      title: form.elements.formBookTitle.value,
      author: form.elements.formBookAuthor.value,
      genre: selectedGenre,
      price: form.elements.formBookPrice.value,
      description: form.elements.formBookDescription.value,
      email: form.elements.formBasicEmail.value,
      password: form.elements.formBasicPassword.value,
      cover:{
        data: form.elements.formBookCover.value,
        contentType: "image/jpeg"
      },
    };

    
    const response = await fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(book),
    });

    const data = await response.json();
    console.log(data);
    if (response.status === 201) {
      alert(data.message);
      window.location.reload(true);
      return;
    }
    alert(data.error);
  }

    return (
      <>
      <NavBar />
      <div class="container-form">
        <div class="column"> 
      <h1 className="title"><strong>List Your Own Book</strong></h1>
      <br/>
      <p>Fill the form below to list your book in the store.</p>
      <img src={illustration} alt="Add a Book" width="500" height="600"></img>
      </div>
      <div className="form-container">
      <Form noValidate validated={validated} onSubmit={handleSubmit} className='formfill'>
      <Form.Group className="mb-3" controlId="formBookTitle">
        <Form.Label>Book Title</Form.Label>
        <Form.Control required type="text" placeholder="Enter Book Title (*required)" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBookAuthor">
        <Form.Label>Book Author</Form.Label>
        <Form.Control required type="text" placeholder="Enter Book Author (*required)" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBookGenre">
            <Form.Label>Select Book Genre</Form.Label>
            <Form.Select
              aria-label="genre-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              required
            >
              <option value="">Select Genre</option>
              {genre.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </Form.Select>
      </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBookPrice">
        <Form.Label>Book Price</Form.Label>
        <Form.Control required type="text" placeholder="Enter Book Listing Price (*required)" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBookDescription">
        <Form.Label>Book Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Book Description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBookCover">
        <Form.Label>Book Cover</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" placeholder="Enter email (*required)" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password (*required)" />
        <Form.Text className="text-success">
          We'll never share your email and password with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I agree to the Terms and Conditions* as well as Privacy Policy** laid down by Bookit." />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit LIsting
      </Button>
    </Form>
    </div>
    </div>
      </>
    )
}

export default ListBook;
