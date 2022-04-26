import React, { useContext } from 'react';
import { Redirect } from 'react-router'
import { AuthContext, AuthProvider } from "./contextApi";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Navigate , Outlet} from 'react-router-dom';



export default function PrivateRouting({ Component: Component, ...rest }) {
    const {user} = useContext(AuthContext)
    return  user ? <Outlet/>: <Navigate to="/login" />
}
