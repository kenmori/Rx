// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill';
import Rx from 'rx';
import fetch from 'isomorphic-fetch';

class Greet extends Component {
 render() {
    var source =  Rx.Observable.timer(200, 100)
         .timerInterval()
         .pluck('interval')
         .take(3);
    source.subscribe(
        function (x) {
           console.log(x);
        },
        function (error) {
           console.log('faError')
        },
        function () {
            conswole.log('Comp')
        }
    )

  return (
   <ul id='result'>
      </ul>
  )
 }
}
window.addEventListener('DOMContentLoaded', ()=>{
 ReactDOM.render(<Greet />, document.querySelector('main'));
})

