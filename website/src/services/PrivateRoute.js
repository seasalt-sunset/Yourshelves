import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const {auth} = useContext(AuthContext);

    console.log('auth', auth)

    return auth ? <Outlet /> : <Navigate to="/entry" />
}