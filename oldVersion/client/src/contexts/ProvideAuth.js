import {createContext, useState} from 'react'

const ProvideAuth = createContext({});

export const ProvideAuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});

  return (
    <ProvideAuth.Provider value={{auth, setAuth}}>
        {children}
    </ProvideAuth.Provider>
  )
}

export default ProvideAuth;