import React from 'react'
import { ReactSVG } from 'react-svg'
import { Link, BrowserRouter as Router, Route, useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

const DateFormat = ({dateTime}) => {
    let dateFormatValue = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        day: "2-digit",
        month: "long"
    }).format(new Date(dateTime))

    dateFormatValue = dateFormatValue.split(' ')
    return (dateFormatValue[1]+" "+dateFormatValue[0]+", "+dateFormatValue[2])
}

export {
    React,
    ReactSVG,
    Link,
    Router,
    Route,
    axios,
    DateFormat,
    useLocation,
    connect,
    useHistory,
    Helmet
}

export * from 'react'