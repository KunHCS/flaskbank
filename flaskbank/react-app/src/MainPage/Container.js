import React from 'react';



const left = () => {
    return (
        <div>
            <p> This is left side content</p>
        </div>
    );
}


const right = () => {
    return (
        <div>
            <p>This is the right side</p>
        </div>
    );
}


const container = () => {
    return (
        <div>
            <left/>
            <right/>
        </div>
    );
}

export default container;