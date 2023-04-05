import React, {Component} from "react";

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
                <div>
                    <button onClick={this.props.is_playing? this.pauseSong: this.playSong}>{this.props.is_playing? "Pause" : "Play"}</button>
                    <div>
                        <h7>{this.props.votes} {" / "} {this.props.votes_required}</h7>
                        <button onClick={this.skipSong}>Next</button>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default MediaPlayer