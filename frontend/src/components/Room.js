
import React, {Component} from 'react';
import {Navigate} from 'react-router-dom'
import CreateRoomPage from './CreateRoomPage';
import withRouter from './withRouter';
import MediaPlayer from './MediaPlayer';
import {AiFillSetting} from "react-icons/ai"


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
        // this.getCurrentSong = this.getCurrentSong.bind(this)
        this.getRoomDetails();
    }

    componentDidMount(){
        // this.interval = setInterval(this.getCurrentSong, 1000)
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
                <div className='' style={{marginInline: "1rem"}}>
                    <button 
                        className='leave-room-button' 
                        onClick={() => this.updateShowSettings(false)}
                        >
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
                <button className="react-icon-btns" onClick={() => this.updateShowSettings(true)}>
                    {<AiFillSetting className='react-icon-mediaplayer' style={{height: "2rem", width: "2rem"}}/>}
                </button>
            </div>
        )
    }

    render(){
        if(this.state.showSettings){
            return this.renderSettings();
        }
        return(
            <div className='bg-zinc-400 page-body'>
                
                <div 
                    className='page-title' 
                    style={{display:"flex", justifyContent: "space-between",}}>
                    <h3 className=''>{this.roomCode}</h3>
                    <p>Host: {this.state.isHost.toString()}</p>
                </div>
                <div className='page-body'>
                <p className='text-red-400'>Votes to skip: {this.state.votesToSkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
                <div>
                    <div>Title 
                        {this.state.song.title}
                    </div>
                    <div>Artists 
                        {this.state.song.artist}
                    </div>
                    {/* <div>
                        <button>Pause</button>
                        <button>Next</button>
                    </div> */}
                    <div>
                        <MediaPlayer {...this.state.song}/>
                    </div>
                </div>
                <div style={{position: "absolute", bottom: "2rem", right: "2rem", display:"flex", gap:"1rem", flexDirection:"column-reverse", alignItems: "end"}}>
                <div 
                    style={{display: "flex",}}>
                    <button
                        onClick={this.leaveRoom} 
                        className='leave-room-button'
                        >
                        Leave Room
                    </button>
                </div>

                {this.state.isHost ? this.renderSettingsButton() : ''}
                </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Room);