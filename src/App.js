import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateMobileDevice,updateHost,updateRoomList, updateUserList} from './ducks/reducer';
import {isMobile} from 'react-device-detect';
import socketIOClient from 'socket.io-client';
import UBox from './UserBox/UBox';
import HBox from './HostBox/HBox';
import './App.css';

var socket = socketIOClient("http://192.168.1.5:4000/")

class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
    // RECEIVE WELCOME
    socket.on('welcome', (welcome) => {
      console.log('App.js, receiving welcome', welcome);
      this.props.updateHost(welcome.host)
      this.props.updateRoomList(welcome.roomList)
      this.props.updateUserList(welcome.userList)
    })
    // RECEIVE HOST REQUEST RESPONSE
    socket.on('host request response', (response) => {
      console.log('host request response',response)
      socket.emit(response.entry, {host:this.props.host, room:this.props.room})
      console.log(`${this.props.host} started a game in room ${this.props.room}`);
    })
  }
  joinUser (){
    socket.emit('join user', {
      // user: this.state.user.toLowerCase(),
      // room: this.state.room.toLowerCase()
  })}
  joinHostRequest = () => {
    //  SEND HOST REQUEST
    socket.emit('host request', {host:this.host
    })
    console.log('host request')
  }
  componentDidMount = () => {
    this.props.updateMobileDevice(isMobile)
  }
  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.setState({
        room: this.props.room,
        user: this.props.user,
        mobileDevice: this.props.mobileDevice,
      })
    }
  }
  stateBtn = () => {
    console.log(this.props);
  }

  render() {
    console.log('App.js, this.props', this.props)
    // DESKTOP OR MOBILE? 
    const viewType = () => {
      if (this.props.hasOwnProperty('mobileDevice') === false){
        return <h1>Loading</h1>
      } else if (this.props.mobileDevice === true){
        return <UBox /> //mobile devices given User component
      } else if (this.props.mobileDevice === false){
        return <HBox joinHostRequest={this.joinHostRequest}/> //desktop devices given Host component
      }
    };
    return (
      <div className="App">
        <h1>App</h1>
        <div>mobile device: {String(this.state.mobileDevice)}</div>
        <div>Room is {this.props.room}</div>
        <button onClick={this.stateBtn}>Check App.js Props</button>
        <div >{viewType()}</div>
      </div>
    );
  }
}
function mapStateToProps( state ){
  const {mobileDevice,room,roomList,user,userList,host} = state;
  return {
      host,
      mobileDevice,
      room,
      roomList,
      user,
      userList,
  };
}
export default connect (mapStateToProps, {updateMobileDevice, updateRoomList, updateUserList, updateHost})(App); 