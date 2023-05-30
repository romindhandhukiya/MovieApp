import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div className='nav-title' style={{display:'flex', padding:'.7rem'}}>
                <Link to='/' style={{textDecoration:'none'}}>
                    <h1>MoviesApp</h1>
                </Link>
                <Link to='/favourites' style={{textDecoration:'none'}}>
                    <h3 style={{marginLeft:'2rem', marginTop:'.7rem'}}>Favourites</h3>
                </Link>
            </div>
        );
    }
}

export default Navbar;
