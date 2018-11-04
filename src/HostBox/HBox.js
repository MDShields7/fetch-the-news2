import React, { Component } from 'react'
import {connect} from 'react-redux';
import HLogin from './HLogin/HLogin'
import HParty from './HParty/HParty'
import './HBox.css'

class HBox extends Component {
  constructor(props){
    super(props)
    this.state ={
      submit: false,
    }
  }
  submitFn = () => {
    this.setState({
      submit: true,
    })
  }

  render() {
    // console.log('this.state.submit',this.state.submit)
    // console.log('!this.state.submit',!this.state.submit)
  // HOST VIEW FLOW
  const guestView = (() => {
    if (!this.state.submit) {
    return <HLogin joinHostRequest={this.props.joinHostRequest} submitFn={this.submitFn}/>   
      } else if ( this.props.room && this.props.host && this.state.submit) {
    return <HParty/>
    }
  })
    return (
      <div>

        <h1 className='HBox'>HostBox</h1>
        {guestView()}
      </div>
    )
  }
}
function mapStateToProps( state ){
  const {room, host} = state;
  return {
      room,
      host
  };
}
export default connect (mapStateToProps)(HBox);
