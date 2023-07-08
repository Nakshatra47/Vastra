import { loginStart, loginSuccess, loginFailure,setNavImage } from "./userRedux";
import { publicRequest } from "../requestMethod";
import {  notifyFailure } from "../Components/alert";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(
      "https://vastra-backend.onrender.com/api/auth/login",
      user 
    );
    dispatch(loginSuccess(res.data));
    dispatch(setNavImage(res.data.img));
   // console.log(res); 
   
   //console.log(res.data);
  } catch (err) {
    console.log(err);
    dispatch(loginFailure());
    
    notifyFailure("Login Failed");
  }
};
