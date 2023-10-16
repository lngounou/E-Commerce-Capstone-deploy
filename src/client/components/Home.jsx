import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="homecontainer">
            <br></br>
            <div className="homehero">
                <div className="homeheroitemimg">
                    <img src="https://images.unsplash.com/photo-1487768047333-c8781e88b283?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" width="100%" alt="purple and yellow flower"></img>
                </div>
                <div className="homeheroitem">
                    <div className="largefont">Bloom Market</div>
                    <h2>Find unique, high-quality items for sale.</h2>
                    <br></br>
                    <button className="sleekbutton" onClick={() => {navigate(`/register`)}}>Register for a new account</button>
                    <button className="sleekbutton" onClick={() => {navigate(`/login`)}}>Sign into an existing account</button>
                </div>
            </div>
        </div>
    )
}

export default Home;