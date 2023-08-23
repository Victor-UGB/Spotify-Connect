import React, {Component} from "react";
import { BrowserRouter, Route, Routes,Link, redirect, Navigate } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import Info from "./Info";
import '../../static/css/index.css';
import '../index.css';
import {AiOutlineArrowRight} from "react-icons/ai"
import withRouter from "./withRouter";


class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: null
        };
        this.clearRoomCode = this.clearRoomCode.bind(this)
        this.homeButtonRef = React.createRef()
    }

    async componentDidMount(){
        fetch('api/user-in-room')
        .then(response => response.json())
        .then(data => {
            this.setState({
                roomCode: data.code
            });
            console.log("async running")
        });
    }

    handleHomeButtonHover(id){
        console.log(this.homeButtonRef.current)
        this.homeButtonRef.current.style.color = "#3478db"
        const el = document.getElementById("home-btn-" + id)
        el.classList.add("animate-right-slide")
        console.log(el)
        
    }

    renderHomepage(){
        return(
            <div style={{padding: "1rem"}}>
                <div className="page-title" style={{padding:"1rem .5rem", fontSize: ".9rem", color: "", fontWeight: "900"}}>
                    <div style={{paddingBottom: ".3rem"}}>Share great music</div>
                    <div className="" style={{padding: "0rem", fontSize: "1.2rem", fontWeight: "400", color: "#3478db"}}>Join / Create a listening party</div>
                </div>

            <div className="homepage " id="">
                <div className="homepage-grid">
                    <div className="bg-red">
                        <Link to="/join">
                        <button onMouseEnter={this.handleHomeButtonHover(0)} ref={this.homeButtonRef} className="home-button" style={{position: "relative"}}>
                            Join a Room
                            <AiOutlineArrowRight style={{position: "absolute", bottom: "1rem", right: "1rem"}} className="home-button-arrow" id="home-btn-0"/>
                        </button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/create">
                        <button onMouseEnter={this.handleHomeButtonHover(1)} ref={this.homeButtonRef} className="home-button" style={{position: "relative"}}>
                            Create a Room
                            <AiOutlineArrowRight style={{position: "absolute", bottom: "1rem", right: "1rem"}} className="home-button-arrow" id="home-btn-1"/>
                        </button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/info">
                        <button onMouseEnter={this.handleHomeButtonHover(2)} ref={this.homeButtonRef} className="home-button" style={{position: "relative"}}>
                            What is Connect
                            <AiOutlineArrowRight style={{position: "absolute", bottom: "1rem", right: "1rem"}} className="home-button-arrow" id="home-btn-2"/>
                        </button>
                        </Link>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
            </div>
        )
    }

    renderRoom(){
        return(
            <div>
                {<Room/>}
            </div>
        )
    }

    clearRoomCode(){
        this.setState({
            roomCode: null,
        })
        console.log("room code cleared")
    }

    render(){
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route>
                            <Route path="/" element= {!this.state.roomCode? this.renderHomepage(): <Navigate replace to={`/room/${this.state.roomCode}`}/>}/>
                            <Route path="/join" element= {<RoomJoinPage/>}/>
                            <Route path="/info" element={<Info/>}/>
                            <Route path="/create" element= {<CreateRoomPage/>}/>
                            <Route path="/room/:roomCode" element= {<Room  leaveRoomCallback={this.clearRoomCode} />}/>
                        </Route>
                    </Routes>
                </BrowserRouter>

            </div>
        )
    }
}

export default Homepage