import React from 'react'
import { useHistory } from 'react-router'
import '../Login/login.css'
const Header = () => {
    const history= useHistory()
    const handleClick=()=>{
        localStorage.setItem("isLogin",false)
         history.push('/')
    }
    return (
        <div className="header__container">
            <ul>
                <li onClick={handleClick} className="header_item">Logout</li>
            </ul>
        </div>
    )
}

export default Header
