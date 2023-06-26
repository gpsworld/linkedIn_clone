import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/counter/userSlice";
import { auth } from "./firebase";
import "./Login.css";
import { Link, Outlet } from "react-router-dom";
import { selectUser } from "./features/counter/userSlice";
import { useSelector } from "react-redux";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prof, setProf] = useState('');
  const dispatch =useDispatch('');
  const user = useSelector(selectUser);

  // const loginToApp = (e) => {
  //   e.preventDefault();

  //   auth.signInWithEmailAndPassword(email, password)
  //   .then(userAuth => {
  //     dispatch(login({
  //           email: userAuth.user.email,
  //           uid: userAuth.user.uid,
  //           displayName: userAuth.user.displayName,
  //           photoURL: userAuth.user.photoURL,
  //     }))
  //   }).catch((error)=>alert(error));

  // }

  const Register = () => {
    if(!name){
      return alert('Please enter a full name')
    }
    auth.createUserWithEmailAndPassword(email, password)
    .then((userAuth) => {
      userAuth.user.updateProfile({
        displayName: name,
        photoURL: prof,
      })
      .then(() => {
         dispatch(login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: name,
            photoURL: prof,
         }))
      });
    }).catch(error => alert(error));
  };


  return (
    <>
    <div className="login">
      <img
        src="https://1000logos.net/wp-content/uploads/2017/03/Linkedin-Logo.png"
        alt=""
      />
      <input value={name}  onChange={(e) => setName(e.target.value)}type="text" placeholder="full name" />
      <input value={prof}  onChange={(e) => setProf(e.target.value)}type="text" placeholder="profile picture Url" />
      <input value={email}  onChange={(e) => setEmail(e.target.value)}type="email" placeholder="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
      <Link to={user ? ("/"): ("/signup")}><button onClick={Register}>Sign Up</button></Link>
      <p>Already a user?<Link to="/"><span className="login_register">Sign In!</span></Link></p>
      
    </div>
    <Outlet />
    </>
  )
}

export default Signup
