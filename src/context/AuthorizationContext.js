import { createContext, useState } from "react";

const AuthorizationContext = createContext()

export function AuthorizationProvider({ children }) {

    const persistedAuthorization = JSON.parse(localStorage.getItem("authorization"))
    const [authorization, setAuthorization] = useState(persistedAuthorization)

    function login(authorizationData) {
        if(authorizationData === undefined){
            return setAuthorization("")
        }
        setAuthorization(authorizationData)
        localStorage.setItem("authorization", JSON.stringify(authorizationData))
    }

    return (
        <AuthorizationContext.Provider value={{ authorization, login }}>
            {children}
        </AuthorizationContext.Provider>
    )
}

export default AuthorizationContext