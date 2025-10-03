import React  from 'react'
import {NavBar} from './navBar';

export  function MainPage () {

    return (
      <>
        <NavBar />
        <div className="App">
            <h1 class="title">
                VERDANCY
            </h1>

            <div class="base">
                <div class="main">
                    <img src="/public/Northern Lights3.png" alt="logo" class="logo"/>
                </div>
                <div class="side">
                    side
                </div>
            </div>
        </div>
      </>
    )

}
