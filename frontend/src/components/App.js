import React, {Component} from "react";
import { render } from "react-dom";
import CreateRoomPage from "./CreateRoomPage";
import Homepage from "./Homepage";
import RomeJoinPage from "./RoomJoinPage";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import {BsSpotify} from "react-icons/bs"
import {HiMenuAlt4} from "react-icons/hi"
import '../../static/css/index.css';
import '../index.css'

export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="bg-red-300" id="main" style={{}}>

                <div style={{backgroundColor: "#1f1f1f", display: "flex", alignItems: "center", padding: "1rem", justifyContent: "space-between"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <BsSpotify className="react-icon-mediaplayer"/>
                        <h1 style={{padding: ".4rem", fontSize: "1.2rem", color: "gainsboro"}}>Connect <span style={{fontStyle: "italic", fontWeight: "100" }}>Spotify</span></h1>
                    </div>
                    <HiMenuAlt4 style={{height: "2rem", width: "2rem", color: "#3478db"}}/>
                </div>
                <Homepage/>
                {/* <h1> Testing React Code On Connect Server</h1>
                <p>
                    Hello Worlds, Welcome again
                </p> */}
            </div>
            
            
        )

    }
}

const appDiv = document.getElementById("app");
render(<App/>,appDiv)