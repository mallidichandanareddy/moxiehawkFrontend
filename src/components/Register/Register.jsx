import React ,{useState,useEffect}from 'react'
import '../Login/login.css'
import {
    useHistory ,
    Link
  } from "react-router-dom";
  
const Login = () => {
    let history = useHistory();
    const [email,setEmail] =useState('')
   const [password,setPassword] =useState('')
   const [error,setError]=useState({})
   const[isFormSubmit,setIsFormSubmit]=useState(false)
   const [confirmPassword,setConfirmPassword]=useState('')
   
    const handleSubmit=(e)=>{
        e.preventDefault()
        setIsFormSubmit(true)
        if(!isValidCredentials()){
            const userData={email,password}
           const usersData= localStorage.getItem("userData")
             if(usersData){
            const localStorageUserData= JSON.parse(usersData)
            localStorageUserData.push(userData)
            localStorage.setItem("userData",JSON.stringify(localStorageUserData))

             }else{
                localStorage.setItem("userData",JSON.stringify([userData]))
             }
          
             history.push('/')
        }
    }

    useEffect(() => {
        isValidCredentials()
    }, [email,password])

    const isValidCredentials=()=>{
        const IsError={}
         if(email || email==''){
            const emailRegularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!emailRegularExpression.test(String(email).toLowerCase()) ) {
                // console.log(emailRegularExpression.test(String(email).toLowerCase()))
                IsError['email']="Please enter valid email"
            }
        }
          // at least one number, one lowercase and one uppercase letter
         // at least six characters that are letters, numbers or the underscore
         if(password || password==''){  
            const  passwordRegularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
           if(!passwordRegularExpression.test(password)) {
            IsError['password']="Please enter  at least one number, one lowercase and one uppercase letter "
           }
    }

      if(!(confirmPassword==password) ||confirmPassword=="" ){
          console.log(confirmPassword==password)
        IsError['confirmPassword']="Both Passwords are  not matching "
      }
    setError(IsError)   
    return Object.keys(IsError).length>0
}

    return (
        <div className="login__container">
             <form onSubmit={handleSubmit} className="form__container">
             <h1>Please Login</h1>
                  <div className="form__control">
                      <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                      <label>Email</label>
                     { isFormSubmit&& <p className="error">{error['email'] && error['email']}</p>}
                  </div>
                  <div className="form__control">
                      <input type="password"  name="password"  value={password} onChange={(e)=> setPassword(e.target.value)}/>
                      <label>Password</label>
                      {isFormSubmit && <p className="error">{error['password'] && error['password']}</p>}
                  </div>
                  <div className="form__control">
                      <input type="password"  name="confrimPassword"  value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
                      <label>ConfirmPassword</label>
                      {isFormSubmit && <p className="error">{error['confirmPassword'] && error['confirmPassword']}</p>}
                  </div>
                  <button className="btn btn_submit">Submit</button>
                  <Link to="/"> <p className="text"> have an account?<a> login</a></p></Link>
                
             </form>
        </div>
    )
}

export default Login
