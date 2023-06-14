import React from 'react'
import { Link } from 'react-router-dom'
import classes from './notFound.module.css'

const NotFound = () => {
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Whooops!!! We got nothing here.</h2>
                <Link to='/'>
                    Go back to home
                </Link>
            </div>
        </div>
    )
}

export default NotFound