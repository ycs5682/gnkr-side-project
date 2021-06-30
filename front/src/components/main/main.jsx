import React from 'react';
import Feed from '../contents/feed/feed';
import Tag from '../contents/tag/tag';
import Footer from '../footer/footer';
import Header from '../header/header'; 
import Banner from '../banner/banner'; 
import styled from 'styled-components';

const MainStyle = styled.section`
    background-color: mintcream;
    height: 100vh;
    .main_contain {
        display: flex;
        justify-content: space-around;
        align-content: center;
        height: 100vh;
    }
`

function Main() {
    return (
        <MainStyle className="main">
            <Header/>
            <Banner/>
            <div className='main_contain'>
                <Feed/>
                <Tag/>
            </div>
            <Footer/>
        </MainStyle>
    );
}

export default Main;


