import React, {Component} from "react";
import { BrowserRouter, Route, Routes,Link, redirect, Navigate } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import Info from "./Info";
import '../../static/css/index.css';
import '../index.css';
import withRouter from "./withRouter";


class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: null
        };
        this.clearRoomCode = this.clearRoomCode.bind(this)
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
    renderHomepage(){
        return(
            <div style={{padding: "1rem"}}>
                <div className="page-title">
                    Share your music
                </div>

            <div className="homepage " id="">
                <div className="homepage-grid">
                    <div className="bg-red">
                        <Link to="/join">
                        <button >Join a Room</button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/create">
                        <button >Create a Room</button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/info">
                        <button >What is Connect?</button>
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