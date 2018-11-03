import React, { Component } from 'react'
import HLogin from './HLogin/HLogin'
import './HBox.css'

export default class HBox extends Component {
  constructor(props){
    super(props);
    this.state ={
    }
  }

  render() {

    return (
      <div>

        <h1 className='HBox'>HostBox</h1>
        <HLogin/>
      </div>
    )
  }
}
