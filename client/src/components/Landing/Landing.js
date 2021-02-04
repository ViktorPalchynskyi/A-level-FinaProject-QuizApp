import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
   return (
      <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Final Project Quiz App</h1>
          <p className='lead'>
            Technologys: 
            <br/>
            Frontend: Ract,Redux,React-Router, Redux-Thunk
            <br/>
            Backend: NodeJS, Express, MongoDB, Mongoose, REST API, Axios
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
   );
};

export default Landing;