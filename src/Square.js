import React from 'react';
// import logo from './logo.svg';
import './Square.css';

// class Square extends React.Component {

//     render() {
//         return (
            
//             <button className="square">
                
//             </button>
//         )
//     }
// }


function Square(props) {
    return (
         <button className="square" onClick={props.onClick}>
                <span className="dot" id={props.value}></span>
         </button>
    )
}


export default Square;