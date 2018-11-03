import React, { Component } from 'react'
import ULogin from './ULogin/ULogin'
import './UBox.css'

export default class UBox extends Component {
  render() {
    return (
      <div>
        <h1 className='UBox'>UserBox</h1>
        <ULogin/>
      </div>
    )
  }
}
