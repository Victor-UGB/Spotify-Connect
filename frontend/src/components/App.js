import React, {Component} from "react";
import { render } from "react-dom";
import CreateRoomPage from "./CreateRoomPage";
import Homepage from "./Homepage";
import RomeJoinPage from "./RoomJoinPage";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import '../../static/css/index.css';
import '../index.css'

export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
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