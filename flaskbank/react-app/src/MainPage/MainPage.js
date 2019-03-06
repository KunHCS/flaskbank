import React from 'react';
import Navigation from "./Navigation";
import Search from "./Search";
import Container from "./Container";



const mainPage = () => {

    return (
        <div >
            <Navigation/>
            <Search/>
            <Container/>
        </div>

    );
}


export default mainPage;
