import { Link } from "react-router-dom";
import './Navigation.css'

export default function Navigation(){
    return(<>
        <div className="navbar--block">
            <div className="right--section">
                <div className="register">
                <Link to="/register">REGISTER</Link>
                </div>
                <div className="login">
                <Link to="/login">LOGIN</Link>
                </div>
            </div>
        </div>
    
     </>)
}