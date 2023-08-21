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
            <div>Join Page</div>
        </div>;
    }

    function createInfo(){
        return "Create Page";
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
            <div className="" style={{display: "flex", gap:"1rem", width: "100%", justifyContent: "space-between"}}>
                <button
                    onClick={() => setPage(pages.JOIN)} 
                    style={{backgroundColor: "transparent", border: "none", color: "whitesmoke", padding: "1rem", width: "100%", borderBlockEnd: "white solid 2px"}}>
                    Join
                </button>
                <button
                    onClick={() => setPage(pages.CREATE)} 
                    style={{backgroundColor: "transparent", border: "none", color: "whitesmoke", padding: "1rem", width: "100%", borderBlockEnd: "white solid 2px"}}>
                    Create
                </button>
            </div>
        </div>
        </div>
    </div>
    )
}

