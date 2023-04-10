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
        return "Join Page";
    }

    function createInfo(){
        return "Create Page";
    }

    return( 
    <div>
        <div>
            What is Connect?
        </div>
        <div>
            {page === pages.JOIN? joinInfo(): createInfo()}
            <div>
                <button onClick={() => setPage(pages.JOIN)}>Join</button>
                <button onClick={() => setPage(pages.CREATE)}>Create</button>
            </div>
        </div>
        <div>
            <button onClick={() => navigate("/")}>
                Back
            </button>
        </div>
    </div>
    )
}

