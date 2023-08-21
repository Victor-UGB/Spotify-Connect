import React, {Component} from "react";
import withRouter from "./withRouter";


class RoomJoinPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: "hey",
            error: ""
        }
        this.roomCodeSubmit = this.roomCodeSubmit.bind(this)
        this.roomCodeEntered = this.roomCodeEntered.bind(this)
    }

    roomCodeSubmit(event){
        event.preventDefault();
        console.log(this.state);
        const requestOptions = {
            method : 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                code: this.state.roomCode
            })
        };
        fetch('api/join-room', requestOptions)
        .then(response => {
            if (response.ok) {
                console.log(response)
                this.props.navigate(`/room/${this.state.roomCode}/`)
            }
            else{
                this.setState({
                    error: "Room Not Found"
                })
                console.log(response)
            }
        })
        .catch(error => {
            console.log(error);
        })

    };

    roomCodeEntered(event){
        this.setState({
            roomCode: event.target.value
        })
        console.log(this.state.roomCode)
    }

    render(){
        return(
            <div className="page-body">
                {/* <p className="page-title">Join a room</p> */}
                <div>
                    <form>
                        <div className="form-input">
                            <input
                                placeholder="Room code"
                                id="room-code"
                                type="text"
                                required="true"
                                onChange={this.roomCodeEntered}
                            />
                            <label for="room-code"> Enter room code</label>
                        </div>
                        <button type="submit" onClick={this.roomCodeSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        ) 
    }
}

export default withRouter(RoomJoinPage)