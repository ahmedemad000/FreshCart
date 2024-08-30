import Style from "./ProtectedRoute.module.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { token } = useContext(UserContext);
  if (token){
    return props.children
  }else {
    alert('You Should Login First')
    return <Navigate to={'login'}></Navigate>
  }
}
