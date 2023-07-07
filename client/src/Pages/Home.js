import React from "react";
import Announcements from "../Components/Announcements";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import Category from "../Components/Category";
import Products from "../Components/Products";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { useDispatch,useSelector } from "react-redux";
import { setNavImage } from "../redux/userRedux";

import { useEffect } from "react";
const Home = () => {
  const dispatch=useDispatch();
  const user = useSelector((state) => state.user);
  const User=user.currentUser;
  
 
  useEffect(() => {
   User && dispatch(setNavImage(user.navImage));
   
  }, [User]);

  return (
    <div>
      <Announcements />
      <Navbar />
      <Slider />
      <Category />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
