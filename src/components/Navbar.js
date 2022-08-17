import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import "../App.css"


const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
                <img src='https://www.dictionary.com/e/wp-content/uploads/2018/03/Thinking_Face_Emoji-Emoji-Island.png' width='30' height='30' alt='' />
                <Link to='/' className="fs-3 ubuntu navbar-brand">Testing</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <style jsx="true">
                        {`
                        button[aria-expanded="false"] > .close{
                            display : none;
                        }

                        button[aria-expanded="true"] > .open{
                            display : none;
                        }
                        `}
                    </style>
                    <i className='fas fa-bars open'></i>
                    <i className='fas fa-times close'></i>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className='navbar-nav fs-5'>
                        <NavLink activeclassname='active' to='/' className="nav-link">Transactional</NavLink>
                        <NavLink activeclassname='active' to='/list' className="nav-link">List</NavLink>
                        <NavLink activeclassname='active' to='/count' className="nav-link">Counter test</NavLink>
                        
                    </div> 
                </div>
            </div>
        </nav>
    )
}

export default Navbar