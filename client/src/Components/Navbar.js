import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { userRequest } from "../requestMethod";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { mobile } from "../Responsive";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userRedux";
import { useState,useEffect } from "react";
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
//Styling left part
const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

//Styling Center Part
const Center = styled.div`
  flex: 3;
  text-align: center;
`;

const Logo = styled.h1`
  /* font-weight: bold; */
  font-weight: 600;

  ${mobile({ fontSize: "24px" })}
`;
//Right Part
const Right = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-around;
  ${mobile({ justifyContent: "spaceAround", flex: 4 })}
  flex: 1;
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
  margin-left: 10px;
  border-radius: 50%;
  object-fit: cover;
  ${mobile({ width: "30px", height: "30px" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState({});
  
  // console.log(user);
  const user = useSelector((state) => state.user);
  // console.log(user);
  const quantity = useSelector((state) => state.cart.quantity);
  const productss = useSelector((state) => state.cart.products);
  const tot = useSelector((state) => state.cart.total);
  
  useEffect(() => {
    // console.log(productss);
    // console.log(tot);
     setCart({ products: productss, total: tot }); 
    //console.log(cart);
    
   
  }, [productss,tot,quantity]);
  useEffect(() => {
    let isMounted = true;
    const doSomething = async() =>{
      // code here...
      try {
        const res = await userRequest.put(`carts/${user.currentUser._id}`, cart);
       //console.log(res.data);
     } catch (err) {
       console.log(err);
     }
    }
    setTimeout(() => {
      if (cart && isMounted) {
        console.log(cart);
        doSomething();
      }
    }, 500);
    return () => {
      isMounted = false; // Cleanup: Cancel pending getData calls
    };
  }, [cart]);
  const handleClick = async () => {
   
    setCart({ products: [], total: 0 });
    dispatch(logoutUser());
    navigate("/login");
  };
  // console.log(user.navImage);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          
        </Left>
        <Center>
          <Logo>Welcome back, {user.currentUser && user.currentUser.username}</Logo>
        </Center>
        <Right>
          {!user.currentUser ? (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <MenuItem>LOGIN</MenuItem>
              </Link>
            </>
          ) : (
           // console.log(user.currentUser),
           // console.log(user),
            <>
            
              <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
              <Link to="/cart">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </MenuItem>
              </Link>
              <Link to="/profile">
                <Image
                  src={
                    user.navImage ||
                    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiMwMDgwODAiPjxwYXRoIGQ9Ik04NiwxNC4zMzMzM2MtMzkuNTgxNSwwIC03MS42NjY2NywzMi4wODUxNyAtNzEuNjY2NjcsNzEuNjY2NjdjMCwzOS41ODE1IDMyLjA4NTE3LDcxLjY2NjY3IDcxLjY2NjY3LDcxLjY2NjY3YzM5LjU4MTUsMCA3MS42NjY2NywtMzIuMDg1MTcgNzEuNjY2NjcsLTcxLjY2NjY3YzAsLTM5LjU4MTUgLTMyLjA4NTE3LC03MS42NjY2NyAtNzEuNjY2NjcsLTcxLjY2NjY3ek04NiwzNC4wNDE2N2MxMi44NjQxNywwIDIzLjI5MTY3LDEwLjQyNzUgMjMuMjkxNjcsMjMuMjkxNjdjMCwxMi44NjQxNyAtMTAuNDI3NSwyMy4yOTE2NyAtMjMuMjkxNjcsMjMuMjkxNjdjLTEyLjg2NDE3LDAgLTIzLjI5MTY3LC0xMC40Mjc1IC0yMy4yOTE2NywtMjMuMjkxNjdjMCwtMTIuODY0MTcgMTAuNDI3NSwtMjMuMjkxNjcgMjMuMjkxNjcsLTIzLjI5MTY3ek04NiwxNDMuMzMzMzNjLTE5Ljg1MTY3LDAgLTM3LjMzODMzLC0xMC4wOTA2NyAtNDcuNjI5NjcsLTI1LjQyMDE3YzguMDMzODMsLTExLjY4MTY3IDMzLjYyNiwtMTcuNTc5ODMgNDcuNjI5NjcsLTE3LjU3OTgzYzE0LjAwMzY3LDAgMzkuNTk1ODMsNS44OTgxNyA0Ny42Mjk2NywxNy41Nzk4M2MtMTAuMjkxMzMsMTUuMzI5NSAtMjcuNzc4LDI1LjQyMDE3IC00Ny42Mjk2NywyNS40MjAxN3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
                  }
                  alt="user"
                />
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
