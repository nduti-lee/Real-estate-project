import React from 'react'
import classes from './footer.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
// import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
          Epic Real Estates is a web application mainly centered/designed 
          to help users discover scenic apartments and commercials, 
          river-side and mountain view sites, from villages all way to urban centres,
          ranging from their esteemed prices to the relevance obtainable amounts
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +254 7015 35212</span>
          {/* <span><Link to="/home">Click here to go back to home page</Link></span> */}

          <span>Youtube: View my YouTube channel</span>
          <span>Twitter: View my Twitter Account</span>
          <span>GitHub: https://github.com/Samuthe</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Africa</span>
          <span>Country: Kenya</span>
          <span>Current Location: Kenya, Nairobi</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer