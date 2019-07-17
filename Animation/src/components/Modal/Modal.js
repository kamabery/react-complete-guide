import React from 'react';
import { Transition } from 'react-transition-group';
import './Modal.css';

const animationTiming = {
    enter: 4000,
    exit: 2000
}

const modal = (props) => {
    return (        
        <Transition 
            timeout={animationTiming}
            mountOnEnter
            unmountOnExit
            in={props.show}                             
            >
            {state => {
                const cssClasses = ['Modal', 
                state === 'entering' 
                ? 'ModalOpen' 
                : state === "exiting" ? "ModalClose" : null
                ];

                return (
                    <div className={cssClasses.join(' ')}>
                        <h1>A Modal</h1>
                        <button className="Button" onClick={props.closed}>
                            Dismiss
                        </button>
                    </div>
                )}}
        </Transition>
    )};

export default modal;