import React, {useState, useEffect,} from "react";
import {useNavigate, redirect} from "react-router-dom"
import withRouter from "./withRouter";

const pages = {
    JOIN: "pages.join",
    CREATE: "pages.create"
}

export default function Info(props){
    const navigate = useNavigate();
    const [page, setPage] = useState(pages.JOIN);

    function joinInfo(){
        return <div>
            <div>Join a music share with unique room code.</div>
        </div>;
    }

    function createInfo(){
        return  <div>
            <div>Create a room with a special room code. Share this code with friends and family for a special listening experience</div>
        </div>;
    }

    // const active = (event) => {
    //     let el = event.target
    //     console.log(el)
    //     console.log("el")
    //     el.innerHtML = "active"
    // }

    function active(event) {
        const el = event.target
        console.log(el)
        console.log("el")
        el.innerHtML = "active"
    }

    return( 
    <div className="page-body">
        <div>
            <button 
                style={{backgroundColor: "transparent", border: "none", color: "whitesmoke"}}
                onClick={() => navigate("/")}>
                Back
            </button>
        </div>
        <div className="page-title">
            What is Connect?
        </div>
        <div className="">
        <div className="page-body">
            {page === pages.JOIN? joinInfo(): createInfo()}
            <div className="" style={{display: "flex", gap:"1rem", width: "100%", justifyContent: "space-between", marginTop: "2rem"}}>
                <button
                    onClick={() => setPage(pages.JOIN)} 
                    style={{backgroundColor: "transparent", border: "none", color: "whitesmoke", padding: "1rem", width: "100%", borderBlockEnd: "white solid 2px"}}>
                    To Join?
                </button>
                <button
                    onClick={() => {setPage(pages.CREATE); active()}} 
                    style={{backgroundColor: "transparent", border: "none", color: "whitesmoke", padding: "1rem", width: "100%", borderBlockEnd: "white solid 2px"}}>
                    To Create?
                </button>
            </div>
        </div>
        </div>
    </div>
    )
}

