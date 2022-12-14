import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Admin from "../pages/Admin"

const RoutesApp = () => {
    return(
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </Router>
    )
}

export default RoutesApp