import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Success from "./Pages/Success";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderDetails from "./Pages/orderdetails";
import Profile from "./Pages/Profile";
import { useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { userRequest } from "./requestMethod";
import { setCart } from "./redux/cartRedux";
import { setNavImage } from "./redux/userRedux";
function App() {
  const user = useSelector((state) => state.user);
  const User = useSelector((state) => state.user.currentUser);
  const [cart, setCarti] = useState({});
  const dispatch=useDispatch();

 //console.log(user.currentUser);
 
 useEffect(() => {
  let isMounted = true; // Flag to track component mount status

  const getData = async () => {
    try {
      const res = await userRequest.get(`carts/find/${User._id}`);
      // console.log(res);
      if (res.data != null) {
        const fetchedCart = { products: res.data.products, total: res.data.total };
        console.log(fetchedCart);
        if (isMounted) {
          setCarti(fetchedCart);
          if (fetchedCart.products.length !== 0) {
            dispatch(setCart(fetchedCart));
          }
        }
      } else {
        try {
          const res = await userRequest.post(`carts/add`, {
            userId: User._id,
            products: [],
            total: 0
          });
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (User && isMounted) {
      getData();
    
  } else {
    setCart({ products: [], total: 0 });
  }

  return () => {
    isMounted = false; // Cleanup: Cancel pending getData calls
  };
}, [User, dispatch]);




  

  return ( 
    <Routes>
      {/* <Route path="/test" element={<Login />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      {/* <Route path="/login" element={<Login />} /> */}

      <Route path="/login" element={User ? <Navigate to="/" /> : <Login />} />

      <Route path="/success" element={<Success />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orderdetails/:id" element={<OrderDetails />} />

      {/* <ProductList /> */}
      {/* <Product /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Cart /> */}
    </Routes>
  );
}

export default App;
