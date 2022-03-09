import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase'

export const AuthContext = createContext()
function AuthContextProvider({children}) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const authChange = (user) => {
        setUser(prevUser => user)
        setLoading(prevValue => false)
    }
    useEffect(() => {
        auth.onAuthStateChanged(authChange)
    },[])
    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
