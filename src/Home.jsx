import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Home() {
  return (
    <div>
      <h1>Welcome to Mobiles Showroom 💕💕💖📳📱</h1>
      <Login />
    </div>
  );
}

function Login() {

    const navigate = useNavigate();
    const [form, setForm] = useState("success");

    const {values,handleChange,handleSubmit} = useFormik({
      initialValues: {username: "", password: ""},
      onSubmit: async (values) => {
        console.log(values)

    const data = await fetch('http://localhost:4000/users/login',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
      })
      if(data.status === 400){
        console.log("❌ Error")
        setForm("error")
      }else{
        setForm("success")
        const result = await data.json();
        console.log(result);
        localStorage.setItem('token', result.token)
        navigate("/mobiles/all");
      }
  },
  })

  return(
    <form onSubmit={handleSubmit} className='login-form'>
      <h2>Login</h2>
      <div className="login">
        <TextField  value={values.username} onChange={handleChange} label="Username" name='username' variant="outlined" />
        <TextField  value={values.password} onChange={handleChange} label="Password" name='password' variant="outlined" />
        <Button color={form} type='submit' variant="contained">{form === "success" ? "Submit" : "Retry"}</Button>
      </div>
    </form>
  )
}