import React, {Component} from "react";
import '../../static/css/index.css';
import {Listbox, Transition, RadioGroup} from '@headlessui/react';
import withRouter from "./withRouter";

class CreateRoomPage extends Component{
    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: ()=> {}
    }

    constructor(props){
        super(props);

        this.state = {
            defaultVotes : 2,
            guestCanPause : this.props.guestCanPause, 
            votesToSkip : this.props.votesToSkip,
            errorMsg: "",
            successMsg: ""

        }
        this.onValueChange = this.onValueChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    }
    onValueChange(event) {
        this.setState({
        selectedOption: event.target.value
        });
    }

    formSubmit(event) {
        event.preventDefault();
        console.log(this.state.selectedOption)
    }

    handleVotesChange(event){

        this.setState({
            votesToSkip : event.target.value
        });
        console.log(this.state.votesToSkip)
    }

    handleGuestCanPauseChange(event){
        this.setState({
            guestCanPause: event.target.value
        })
        console.log(this.state.guestCanPause)
    }

    handleRoomButtonPressed(event){
        event.preventDefault();
        console.log(this.state)
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
            }),
        };
        fetch('/api/create-room', requestOptions)
        .then(response => response.json())
        .then(data => this.props.navigate("/room/" + data.code));
    }

    handleUpdateButtonPressed(event){
        event.preventDefault();
        console.log(this.state)
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode
            }),
        };
        fetch('/api/update-room', requestOptions)
        .then(response => {
            if (response.ok){
                this.setState({
                    successMsg: "Room Update Successfully"
                })
                this.renderNotice(false)
                console.log(this.state)
            }else{
                this.setState({
                    errorMsg: "Couldn't Update Room"
                })
                this.renderNotice(true)
            }
            console.log(this.props.updateCallback)
            
            this.props.updateCallback();
        })
        // .then(data => console.log(data));
    }

    renderCreateButtons(){
        return (
            <div className="bg-red-500">
                <button type="submit" onClick={this.handleRoomButtonPressed} >
                    Create Room
                </button>
                <button type="submit" style={{backgroundColor: "red",}}>
                    Back
                </button>
            </div>
        )
    }

    renderUpdateButtons(){
        return(
            <div>
            <button type="submit" onClick={this.handleUpdateButtonPressed} >
                Update Room
            </button>
            </div>
        )
    }
    renderNotice(success){
        if (success){
            return(
                <div>{this.state.successMsg}</div>
            )
        }else{
            return(
                <div>{this.state.errorMsg}</div>
            )
        }
    }

    render(){
        const title = this.props.update ? "Update room" : "Configure room" 
        
        return(
            <div className="align-center page-body text-center font-extrabold">
                {this.renderNotice(this.state.successMsg)}
                <h1 className="text-2xl bg-slate-500 page-title " >
                    {title}
                </h1>
                <div className="" style={{paddingBlock: "1rem"}}>
                    <form>
                        <div className="form-radio-container">
                            <div style={{fontWeight: "900", paddingInline:".5rem",}}>Member control</div>
                            <div className="form-radio-input">
                                    <input type="radio" value = "true" color="blue" name="musicControl" checked={this.state.guestCanPause === "true"} onChange ={this.handleGuestCanPauseChange}/>
                                <label>
                                    Play/Pause
                                </label>
                            </div>
                            <div className="form-radio-input">
                                    <input type="radio" value = "false" color="red" name="musicControl" checked={this.state.guestCanPause === "false"} onChange ={this.handleGuestCanPauseChange}/>
                                <label>
                                    No Control
                                </label>
                            </div>
                        </div>
                        <div className="form-input">
                                <input 
                                    type="number" 
                                    required="true" 
                                    defaultValue={this.state.votesToSkip} 
                                    min="1" 
                                    onChange={this.handleVotesChange}
                                />
                            <label>
                                Votes Required to Skip
                            </label>
                        </div>
                        {this.props.update? this.renderUpdateButtons() : this.renderCreateButtons()}
                    </form>
                </div>
                

            </div>
        ) 
    }
}

export default withRouter(CreateRoomPage);

{/* <div>
                    <form onSubmit={this.formSubmit}>
                        <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="Male"
                            checked={this.state.selectedOption === "Male"}
                            onChange={this.onValueChange}
                            />
                            Male
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="Female"
                            checked={this.state.selectedOption === "Female"}
                            onChange={this.onValueChange}
                            />
                            Female
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="Other"
                            checked={this.state.selectedOption === "Other"}
                            onChange={this.onValueChange}
                            />
                            Other
                        </label>
                        </div>
                        <div>
                        Selected option is : {this.state.selectedOption}
                        </div>
                        <button className="btn btn-default" type="submit">
                        Submit
                        </button>
                    </form>
                </div> */}