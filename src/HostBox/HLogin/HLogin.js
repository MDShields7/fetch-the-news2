import React, { Component } from 'react'
import {connect} from 'react-redux';
import {updateHost, updateRoom, updateUser, updateRoomList} from '../../ducks/reducer';

class HLogin extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  // handleChange = (e) => {
  //   const name = e.target.name
  //   const value = e.target.value
  //   this.setState({[name]: value})
  // }
  handleChangeRoom = (e) => {
    const room = e.target.value
    this.props.updateRoom(room)
  }
  handleChangeHost = (e) => {
    const host = e.target.value
    this.props.updateHost(host)
  }
  //Check for host first, then check if room exists
  handleSubmit = () => {
      console.log('HLogin starting joinHostRequest')
      this.props.joinHostRequest();
      this.props.submitFn();
    // }
  }
  checkItemMsg = () => {
    let str = 'The ' + String(this.state.checkItemType) + ' name is not available';
    return <p>{str}</p>
  }

  render() {
    const {room, host } = this.state;
    return (
      <div>
        <h1>Host Login</h1>
        <h2>Room name:</h2>
          <input type="text" name={'room'} value={room} onChange={this.handleChangeRoom}/>
          {/* { roomCheck ?
            this.checkItemMsg(): <p></p>} */}
        <h2>Host name:</h2>
          <input type="text" name={'host'} value={host} onChange={this.handleChangeHost}/> 
          {/* { hostCheck ?
              this.checkItemMsg() : <p></p>} */}
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}
function mapStateToProps( state ){
  const {user, room} = state;
  return {
    room,
    user
  };
}
export default connect (mapStateToProps, {updateHost,updateRoom, updateRoomList,updateUser})(HLogin); 
