import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateRoomList} from './ducks/reducer';
import {isMobile} from 'react-device-detect';
import {updateMobileDevice} from './ducks/reducer';
import socketIOClient from 'socket.io-client';
import UBox from './UserBox/UBox';
import HBox from './HostBox/HBox';
import './App.css';

var socket = socketIOClient("http://192.168.1.5:4000/")

class App extends Component {
  constructor(props){
    super(props)
    this.state = {}

    socket.on('welcome', (welcome) => {
      console.log('App.js, receiving welcome', welcome);
      this.props.updateHost(welcome.host)
      this.props.updateRoomList(welcome.roomList)
    })

  }
  joinUser (){
    socket.emit('join user', {
      // user: this.state.user.toLowerCase(),
      // room: this.state.room.toLowerCase()
  })
  }
  componentDidMount = () => {
    this.props.updateMobileDevice(isMobile)
  }
  // componentDidUpdate = (prevProps, prevState) => {
  //   return prevProps === prevState ? true : false;
  // }
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
        return <HBox /> //desktop devices given Host component
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
  const {mobileDevice,room,roomList,user} = state;
  return {
      mobileDevice,
      room,
      roomList,
      user,
  };
}
export default connect (mapStateToProps, {updateMobileDevice})(App); 