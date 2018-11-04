import React, { Component } from 'react'
import {connect} from 'react-redux';
import {updateRoom, updateUser} from '../../ducks/reducer';

class ULogin extends Component {
  constructor(props){
    super(props)
    this.state = {
      room: this.props.room,
      user: this.props.user,
      roomCheck: false,
      userCheck: false,
    }
  }
  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }
  handleSubmit = () => {

    this.props.submitFn();
  }
  checkItemMsg = () => {
    let str = 'The ' + String(this.state.checkItemType) + ' name is not available';
    return <p>{str}</p>
  }

  render() {
    const {room, user, roomCheck, userCheck} =this.state;
    return (
      <div>
        <h1>User Login</h1>
        <h2>Room name:</h2>
          <input type="text" name={'room'} value={room} onChange={this.handleChange}/>
          { roomCheck ?
            this.checkItemMsg(): <p></p>}
        <h2>Username:</h2>
          <input type="text" name={'user'} value={user} onChange={this.handleChange}/>
          { userCheck ?
            this.checkItemMsg() : <p></p>}
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}
function mapStateToProps( state ){
  const {host, user, userList, room, roomList} = state;
  return {
    host,
    room,
    roomList,
    user,
    userList
  };
}
export default connect (mapStateToProps, {updateRoom, updateUser})(ULogin); 

// FUTURE ISSUES
// userCheck checks all users, not just the ones in the room you want

/*
handleSubmit = () => {
  console.log('userList', this.props.userList)
  console.log('user', this.state.user)
  if(this.props.userList[0]){        
    this.setState({userCheck:true, checkItemType:'user'})}
  for(let i=0;i<this.props.userList.length;i++){
    console.log('user',i)
    if(this.props.userList[i] !== this.state.user){
      this.props.updateUser(this.state.user);
    } else {  alert('user does not exist')}}
  if(!this.props.roomList[0]){
    this.setState({roomCheck:true, checkItemType:'room'})}
  for(let i=0; i<this.props.roomList.length; i++){
    if(this.props.roomList[i] === this.state.room){
      this.props.updateRoom(this.state.room);
    } else {  alert('room does not exist')  }
  }
  this.props.submitFn();
}
*/