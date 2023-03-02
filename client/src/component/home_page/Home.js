import React from 'react'
import './homepage.css'
import Carousel from './Carousel'
const Home = () => {
    return (
        <div>
            <nav className="navbar navbar-light  bg-nav d-flex justify-content-between px-5">
                <a className="navbar-brand text-white brand" href="/">
                    <img src="navbrand3.png" className="logo-nav" />&nbsp;
                </a>
                <a href="/">logout</a>
            </nav>
            <div className="black-g">
                <div className="content">
                    <div className="head-content mt-5">
                        <div className="d-flex justify-content-center">
                            <div className="w-75 shadow-sm">
                                 <Carousel/>
                            </div>
                        </div>
                    </div>
                    <div className="body-content">

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Home