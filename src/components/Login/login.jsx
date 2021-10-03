import React ,{useState,useEffect}from 'react'
import { Link ,useHistory} from 'react-router-dom'
import './login.css'
const Login = () => {
   const [email,setEmail] =useState('')
   const [password,setPassword] =useState('')
   const [error,setError]=useState({})
   const[isFormSubmit,setIsFormSubmit]=useState(false)
   const [isUserNotFound,setIsUserNotFound]= useState(false)
   let history = useHistory();

    const handleSubmit=(e)=>{
        setIsUserNotFound(false)
        e.preventDefault()
        setIsFormSubmit(true)
        console.log(isValidCredentials())
        if(!isValidCredentials()){
            const usersData=JSON.parse(localStorage.getItem("userData")) 
            const currentUser= usersData.find(user=>(user.email == email && user.password == password ))
            if(currentUser){
                  localStorage.setItem("isLogin",true)
                  setTimeout(() => {
                    history.push('/admin')   
                  }, 3000);
            }else{
                setIsUserNotFound(true)
            }
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
        setError(IsError)   
    
        return Object.keys(IsError).length>0
    }
}

    return (
        <div className="login__container">
            {isUserNotFound &&  <h3 className="user_notFound">Unable to find your account Please Register</h3>}
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
                  <button className="btn btn_submit">Submit</button>
                  <Link to="/register"> <p className="text">Don't have an account?<a> Register</a></p></Link>
                  
             </form>
        </div>
    )
}

export default Login
