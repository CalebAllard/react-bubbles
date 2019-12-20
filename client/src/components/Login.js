import React,{useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';
const Login = (props) => {
  
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [data, setData] = useState({
    username:'',
    password:''
  });
  const handelChange = (e) =>{
    setData({
      ...data,
      [e.target.name]: e.target.value
    });

  };
  const handleSubmit = (e) => {

    e.preventDefault();
    axiosWithAuth().post('/login', data)
    .then(res => {
      console.log(res);
      localStorage.setItem('token',res.data.payload)
      props.history.push('/bubbles');
    }).catch(err => {
      console.log(err);
    })

  };


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label>User Name: <input name='username' id='username' type='text' onChange={handelChange} value={data.username}/></label>
        <label>Password: <input name='password' id='password' type='password' onChange={handelChange} value={data.password}/></label>
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
