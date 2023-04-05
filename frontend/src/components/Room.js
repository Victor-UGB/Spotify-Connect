
import React, {Component} from 'react';
import {Navigate} from 'react-router-dom'
import CreateRoomPage from './CreateRoomPage';
import withRouter from './withRouter';
import MediaPlayer from './MediaPlayer';


class Room extends Component{
    constructor(props){
        super(props);
        this.state = {
            votesToSkip : 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated : false,
            song: {}
        };
        this.roomCode = this.props.params.roomCode
        this.updateShowSettings = this.updateShowSettings.bind(this)
        this.leaveRoom = this.leaveRoom.bind(this)
        this.renderSettings= this.renderSettings.bind(this)
        this.getRoomDetails = this.getRoomDetails.bind(this)
        this.authenticateSpotify = this.authenticateSpotify.bind(this)
        this.getCurrentSong = this.getCurrentSong.bind(this)
        this.getRoomDetails();
    }
    // red(){
    //     console.log(this.state)
    //     console.log(this.props)
    // }
    // componentDidMount(){
    //     this.red()
    // }

    componentDidMount(){
        this.interval = setInterval(this.getCurrentSong, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    renderSettings(){
        return(
            <div>
                <div>
                    <CreateRoomPage 
                        update={true} 
                        votesToSkip = {this.state.votesToSkip} 
                        guestCanPause = {this.state.guestCanPause}
                        roomCode = {this.roomCode}
                        updateCallback = {()=>{this.getRoomDetails}}
                    />
                </div>
                <div>
                    <button onClick={() => this.updateShowSettings(false)}>
                        Close
                    </button>
                </div>
            </div>
        )
    }

    getRoomDetails(){
        console.log("running get rooom details")
        fetch('/api/get-room' + "?code=" + this.roomCode)
        .then(response => {
            if (!response.ok){
                this.props.leaveRoomCallback()
                this.props.navigate("/")
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            this.setState({
                votesToSkip : data.votes_to_skip,
                guestCanPause : data.guest_can_pause,
                isHost: data.is_host
            });
            if(this.state.isHost){
                this.authenticateSpotify();
                console.log(this.state)
            }
            
        
        });
    }

    authenticateSpotify(){
        console.log("running authenticateSpotify()")
        fetch("/spotify/is-authenticated")
        .then(response => response.json())
        .then(data => {
            this.setState({
                spotifyAuthenticated: data.status
            });
            console.log(`spotifyAutheticated is ${data.status}`)
            console.log(this.state)
            if(!data.status){
                fetch("/spotify/get-auth-url")
                .then(response => response.json())
                .then(data => {
                    window.location.replace(data.url);
                });
            }
        })
        
    }

    getCurrentSong(){
        console.log('fetching current song')
        fetch('/spotify/current-song')
        
        .then(response => {
            if (!response.ok){
                return {};
            }else {
                return response.json();
            }
        })
        .then(data => {
            this.setState({song: data});
            console.log(data);
            console.log(this.state)
        })
    }
    
    leaveRoom(event){
        event.preventDefault()
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
        }
        fetch('/api/leave-room', requestOptions)
        .then(response => {
            this.props.leaveRoomCallback()
            this.props.navigate("/")
            console.log(response)
        })
        
    }

    updateShowSettings(value){
        this.setState({
            showSettings: value
        })
        this.getRoomDetails()

    }

    renderSettingsButton(){
        return(
            <div>
                <button onClick={() => this.updateShowSettings(true)}>
                    Settings
                </button>
            </div>
        )
    }

    render(){
        if(this.state.showSettings){
            return this.renderSettings();
        }
        return(
            <div>
                <h3>{this.roomCode}</h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
                <div>
                    <div>Title 
                        {this.state.song.title}
                    </div>
                    <div>Artists 
                        {this.state.song.artist}
                    </div>
                    <div>
                        <button>Pause</button>
                        <button>Next</button>
                    </div>
                    <div>
                        <MediaPlayer {...this.state.song}/>
                    </div>
                </div>
                <div>
                    <button onClick={this.leaveRoom} >Leave Room</button>
                </div>

                {this.state.isHost ? this.renderSettingsButton() : ''}
            </div>
        )
    }
}

export default withRouter(Room);