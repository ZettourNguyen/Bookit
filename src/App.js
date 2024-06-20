import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";
import ListBook from "./pages/ListBook";
import UserListings from "./pages/UserListings";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./pages/Profile.page";
import History from "./pages/History.page";
import Reset from "./pages/Reset.page";

import Cart from "./pages/Cart.page";

function App() {
  return (
    <BrowserRouter>
      {/* We are wrapping our whole app with UserProvider so that */}
      {/* our user is accessible through out the app from any page*/}
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/reset" element={<Reset />} />
          {/* We are protecting our Home Page from unauthenticated */}
          {/* users by wrapping it with PrivateRoute here. */}
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/user" element={<Profile />} />
            <Route exact path="/history" element={<History />} />
            <Route exact path="/listbook" element={<ListBook />} />
            <Route exact path="/userlistings" element={<UserListings />} />
            <Route exact path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
