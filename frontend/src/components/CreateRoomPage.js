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
            <div>
                <button type="submit" onClick={this.handleRoomButtonPressed} >
                    Create Room
                </button>
                <button type="submit">
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
        const title = this.props.update ? "Update Room" : "Create A Room" 
        
        return(
            <div className="align-center  text-center font-extrabold">
                {this.renderNotice(this.state.successMsg)}
                <div className="text-2xl bg-slate-500" >
                    {title}
                </div>
                {/* <div>
                    <Listbox></Listbox>
                    <RadioGroup value= {this.state.selected} onChange="">
                        <RadioGroup.Label>Server Size</RadioGroup.Label>
                        <RadioGroup.Option value="business" >
                            {({checked}) => (<span className={checked? 'bg-blue-200' : ''}>Business</span>)}
                        </RadioGroup.Option>
                        <RadioGroup.Option value="startup">
                            {({checked}) => (<span className={checked? 'bg-blue-200' : ''}>Start up</span>)}
                        </RadioGroup.Option>
                        <RadioGroup.Option value="enterprise">
                            {({checked}) => (<span className={checked? 'bg-blue-200' : ''}>Enterprise</span>)}
                        </RadioGroup.Option>
                    </RadioGroup>
                </div> */}
                <div>
                    <form>
                        <div>
                            <label>
                                <input type="radio" value = "true" color="blue" name="musicControl" checked={this.state.guestCanPause === "true"} onChange ={this.handleGuestCanPauseChange}/>
                                Play/Pause
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="radio" value = "false" color="red" name="musicControl" checked={this.state.guestCanPause === "false"} onChange ={this.handleGuestCanPauseChange}/>
                                No Control
                            </label>
                        </div>
                        <div>
                        Selected option is : {this.state.guestCanPause}
                        </div>
                        <div>
                            <label>
                                <input 
                                    type="number" 
                                    required="true" 
                                    defaultValue={this.state.votesToSkip} 
                                    min="1" 
                                    onChange={this.handleVotesChange}
                                />
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