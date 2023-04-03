import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Login from "./Components/Login.jsx";
import Home from "./Components/Home.jsx";
import HeaderHome from "./Components/Header.jsx";
import {getUserAuth, signInAPI} from "./redux/actions/index.js";
import {connect} from "react-redux";
import RequireAuth from "./Components/RequireAuth.js";

const App = (props)=> {

  useEffect(()=> {
    props.getUserAuth()
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={ <Login /> }/>
          <Route path='/home' element={
              <RequireAuth>
                  <Home />
                  <HeaderHome />
              </RequireAuth>
          } />
        </Routes>
      </Router>
    </div>
  )
}

const mapStateToProps = (state)=> {
    return {}
}
const mapDispatchToProps = (dispatch)=> {
    return {
        getUserAuth: ()=> dispatch(getUserAuth()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
