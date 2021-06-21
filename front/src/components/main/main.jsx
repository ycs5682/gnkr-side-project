import React from 'react';
import Feed from '../contents/feed/feed';
import Tag from '../contents/tag/tag';
import Footer from '../footer/footer';
import Header from '../header/header'; 

function Main() {
    return (
        <section>
            <Header/>
            main
            <div className='main_contain'>
                <Feed/>
                <Tag/>
            </div>
            <Footer/>
        </section>
    );
}

export default Main;