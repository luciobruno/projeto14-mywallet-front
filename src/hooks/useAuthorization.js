import { useContext } from "react";
import AuthorizationContext from "../context/AuthorizationContext";

export default function useAuthorization(){
    return useContext(AuthorizationContext)
}