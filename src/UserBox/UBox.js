import React, { Component } from 'react'
import {connect} from 'react-redux';
import ULogin from './ULogin/ULogin'
import UParty from './UParty/UParty'
import './UBox.css'

class UBox extends Component {  
  constructor(props){
    super(props)
    this.state ={
      submitEntry: false,
    }
  }
  submitFn = () => {
    this.setState({
      submitEntry: true,
    })
  }
  render() {
    //    USER VIEW FLOW
    const userView = (() => {
      if (this.props.room==='') {
      return <ULogin submitFn={this.submitFn}/>   
       } else if ( this.props.room && this.props.user ) {
      return <UParty/>
      }
    })


    return (
      <div>
        <h1 className='UBox'>UserBox</h1>
        {userView()}
      </div>
    )
  }
}
function mapStateToProps( state ){
  const {user, room} = state;
  return {
    room,
    user,
  };
}
export default connect (mapStateToProps)(UBox); 