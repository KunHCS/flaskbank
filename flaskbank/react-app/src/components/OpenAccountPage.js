import React from 'react';
import Navigation from "./Navigation";
import Search from "./Search";
import Container from "./Container";
import Register from './register_test';



const openAccountPage = () => {

    return (
        <div >
            <Navigation/>
            <Search/>
            <Container>
                <Register/>
            </Container>
        </div>

    );
}


export default openAccountPage;
