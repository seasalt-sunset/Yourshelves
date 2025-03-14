import React, { useEffect, useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { AuthContext } from './services/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import Entry from './pages/Entry';
import Home from './pages/Home.js';
import axios from 'axios';
import { PrivateRoute } from './services/PrivateRoute.js';
import Giochi_InCorso from "./pages/components/Giochi_InCorso.js";
import AddVideogames from "./pages/components/AddVideogames.js";
function App() {

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(localStorage.getItem("AuthToken")) {
      checkAuth();
    } else {
      setLoading(false);
    }
}, [])

  async function checkAuth() {
   let response = await axios.get(process.env.REACT_APP_SERVER_URL + "/users/auth",
    {
      headers: {
        authToken: localStorage.getItem("AuthToken")
      }
    }
    )

    console.log(response.data.user)
    if (response?.data?.error) {
      toast.error(response.data.error);
    } else {
      setAuth(response?.data?.user)
    }
        setLoading(false);
    }
    if(loading) {
      return <></>
    }

  return (
    <>
    <AuthContext.Provider value={{auth, setAuth}}>
      <Router>
        <Routes>
          <Route path="/entry" element= {<Entry />}/>
          <Route path="/home" element={<PrivateRoute />} >
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/giochi_inCorso" element={<PrivateRoute />} >
            <Route path="/giochi_inCorso" element={<Giochi_InCorso />} />
          </Route>
          <Route path="/addVideogames" element={<PrivateRoute />} >
            <Route path="/addVideogames" element={<AddVideogames />} />
          </Route>
          <Route path="*" element={<Navigate to={auth ? "/home" : "/entry"} />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
      <ToastContainer position="top-center"/>
    </>
  );
}

export default App;
