import React from './node_modules/react/react';
import ReactDOM from './node_modules/react/react-dom';
import Rx from './node_modules/rx';


const Content = Props => {
    const remainMinutes = Math.floor(props.remain / 60);
    const remainSeconds = props.remain % 60;
    return (
        <div>
            {remainMinutes}: {("0" + remainSeconds).slice(-2)}
        </div>
    );
};

const intervalTime =1000;
const countDown = 3 * 60;


Rx.Observable.timer(0, intervalTime)
.map(x => countDown -x)
.takeWhile(x => x > 0)
.subscribe(
    x => ReactDOM.render(<Content remain={x} />, document.getElementById('content')),
    err => console.log('Error: ' + err),
    () => ReactDOM.render(<Content remain={0}/>. document.getElementById('content'))
);