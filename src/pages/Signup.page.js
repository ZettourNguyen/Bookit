import { Button, TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { useContext, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "../assets/logo.png"
import "./styles/Signup.style.css"

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" style={{color: 'white'}} {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/">
        Bookit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // As explained in the Login page.
  const { emailPasswordSignup } = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // As explained in the Login page.
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };


  // As explained in the Login page.
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  }

  // As explained in the Login page.
  const onSubmit = async () => {
    try {
      const user = await emailPasswordSignup(form.email, form.password);
      fetch(`http://localhost:5000/api/signup?name=${form.username}&email=${form.email}&phone=${form.phone}&address=${form.address}&twitter=${form.twitter}&linkedin=${form.linkedin}&github=${form.github}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.reload();
      })
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };
  const defaultTheme = createTheme();

  return(
    <>
<ThemeProvider theme={defaultTheme}>
<Grid container component="main" sx={{ height: '100vh' }}>
  <CssBaseline />
  <Grid
    item
    xs={false}
    sm={4}
    md={7}
    sx={{
      backgroundImage: 'url(https://basecamplive.com/wp-content/uploads/2023/02/books.jpeg)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />
  <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{backgroundColor: "#1a1b26", color: "white"}}>
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
    <img src={logo} alt="Bookit" height={100}></img>
      <Typography component="h1" variant="h5">
       <strong> Sign Up </strong>
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          InputLabelProps={{
            style: { color: '#fff' }, 
         }}
          variant="outlined"
          name="email"
          value={form.email}
          onChange={onFormInputChange}
          id="email"
          autoComplete="email"
          autoFocus
          onInput={onFormInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          InputLabelProps={{
            style: { color: '#fff' }, 
         }}
          type="password"
          variant="outlined"
          color="success"
          name="password"
          onChange={onFormInputChange}
          id="password"
          autoComplete="password"
          value={form.password}
          onInput={onFormInputChange}
        />
 
    <TextField
      margin="normal"
      label="Username (required)"
      type="text"
      required
      variant="outlined"
      InputLabelProps={{
        style: { color: '#fff' }, 
     }}
      name="Username"
      id="username"
      value={form.username}
      onInput={onFormInputChange}
      style={{ marginBottom: "1rem", marginRight: defaultTheme.spacing(1) }}
      onChange={onFormInputChange}
    />
    <TextField
      margin="normal"
      required
      InputLabelProps={{
         style: { color: '#fff' }, 
      }}
      onChange={onFormInputChange}
      label="Phone (required)"
      type="text"
      id="phone"
      variant="outlined"
      name="phone"
      value={form.phone}
      onInput={onFormInputChange}
      style={{ marginBottom: "1rem", marginRight: defaultTheme.spacing(1) }}
    />
    <TextField
    margin="normal"
    required
    id="address"
    InputLabelProps={{
       style: { color: '#fff' }, 
    }}
    onChange={onFormInputChange}
    
      label="Country (required)"
      type="text"
      variant="outlined"
      name="address"
      value={form.address}
      onInput={onFormInputChange}
      style={{ marginBottom: "1rem", marginRight: defaultTheme.spacing(1) }}
    />
    <TextField
    margin="normal"
    id="twitter"
    InputLabelProps={{
       style: { color: '#fff' }, 
    }}
    onChange={onFormInputChange}
    
      label="Twitter"
      type="text"
      variant="outlined"
      name="twitter"
      value={form.twitter}
      onInput={onFormInputChange}
      style={{ marginBottom: "1rem", marginRight: defaultTheme.spacing(1) }}
    />
    <TextField
    margin="normal"
    id="linkedin"
    InputLabelProps={{
       style: { color: '#fff' }, 
    }}
    onChange={onFormInputChange}
      label="Linkedin"
      type="text"
      variant="outlined"
      name="linkedin"
      value={form.linkedin}
      onInput={onFormInputChange}
      style={{ marginBottom: "1rem", marginRight: defaultTheme.spacing(1) }}
    />
    <TextField
    margin="normal"
    id="github"
    InputLabelProps={{
       style: { color: '#fff' }, 
    }}
    onChange={onFormInputChange}  
      label="Github"
      type="text"
      variant="outlined"
      name="github"
      value={form.github}
      onInput={onFormInputChange}
      style={{ marginBottom: "1rem", marginRight: defaultTheme.spacing(1) }}
    />

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onSubmit}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/login" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  </Grid>
</Grid>
</ThemeProvider>
</>
);
}

export default Signup;