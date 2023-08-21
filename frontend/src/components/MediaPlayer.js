import React, {Component} from "react";
import {BsFillPlayFill, BsFillPauseFill,} from "react-icons/bs"
import {BiSkipNext} from "react-icons/bi"

class MediaPlayer extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    skipSong(){
        console.log("skipping song")
        const requestOption = {
            method: "POST",
            header: "application/json"
        };
        fetch("/spotify/skip", requestOption)
        .then(response => response.json())
        .then(data => console.log(data))
    }

    playSong(){
        console.log("Playing Song")
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"}
        };
        fetch("/spotify/play", requestOptions)
        .then(response => console.log(response))
    }

    pauseSong(){
        console.log("Pausing Song")
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"}
        };
        fetch("/spotify/pause", requestOptions)
        .then(response => console.log(response))
    }

    render(){
        const songProgress = (this.props.time / this.props.duration) * 100
        return(
            <div>
                <div>
                    <img src={this.props.image_url} />
                </div>
                <div>
                    {"Title: " + this.props.title}
                </div>
                <div>
                    {"Artist{s}: " + this.props.artist}
                </div>
                <div>
                    {this.props.duration}
                    {songProgress}
                </div>
                <div className="mediaplayer-control">
                    <div>
                        <button 
                            className="react-icon-btns" 
                            onClick={this.props.is_playing? this.pauseSong: this.playSong}>
                                {this.props.is_playing? 
                                    <BsFillPauseFill className="react-icon-mediaplayer"/> 
                                    : <BsFillPlayFill className="react-icon-mediaplayer"/>
                                }
                        </button></div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <h7>{this.props.votes} {" / "} {this.props.votes_required}</h7>
                        <button className="react-icon-btns" 
                            onClick={this.skipSong}>
                                {<BiSkipNext className="react-icon-mediaplayer" style={{width: "4rem", height: "4rem"}}/>}
                        </button>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default MediaPlayer