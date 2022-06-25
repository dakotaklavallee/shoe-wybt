import React from 'react';
import ShoeGif from '../../img/shoe-transition.gif';
export default function ShoeLoading(){
    return (
        <div style={{height:"90vh"}} className="d-flex align-items-center justify-content-center">
            <img src={ShoeGif} alt="shoe" height="450px" />
        </div>
    );
}