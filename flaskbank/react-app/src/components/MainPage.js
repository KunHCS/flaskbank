import React from 'react';
import Navigation from "./Navigation";
import Search from "./Search";
import Container from "./Container";
import Login from './login';



const mainPage = () => {

    return (
        <div >
            <Navigation/>
            <Search/>
            <Container>
                <Login/>
            </Container>
        </div>

    );
}


export default mainPage;
