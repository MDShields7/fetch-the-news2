import React, { Component } from 'react'
import {connect} from 'react-redux';
import {updateRoom, updateRoomList, updateUser} from '../../ducks/reducer';



class ULogin extends Component {
  constructor(props){
    super(props)
  }
  
  checkRoom = () => {
    for(let i=0;i<this.props.roomList;i++){
      if(this.props.roomList[i] === this.props.room){
        return <div>Username is already taken</div>
        console.log('username taken')
      } else {
        return <div>Username ok</div>
        console.log('username ok')
      }
    }
  }
  render() {
    return (
      <div>
        <h1>User Login</h1>
        <h2>Room Name:</h2>
        <input type="text" onChange={this.props.updateRoom()}/> 
        {this.checkRoom}
        <h2>Username:</h2> 
        <input type="text" onChange={this.props.updateUser()}/> 
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}
function mapStateToProps( state ){
  const {host, user, room, roomList} = state;
  return {
    host,
    room,
    roomList,
    user
  };
}
export default connect (mapStateToProps, {updateRoom, updateRoomList, updateUser})(ULogin); 