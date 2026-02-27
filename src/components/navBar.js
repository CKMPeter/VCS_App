import React from "react" 
  
export const NavBar = () => {
    return (
        <div>
            <ul className="nav-bar">
                <li><a href="/">Home</a></li>
                <li><a href="/#/checkin">Check-in</a></li>
                <li><a href="/#/detail">Details</a></li>
            </ul>
        </div>
    ) 
}