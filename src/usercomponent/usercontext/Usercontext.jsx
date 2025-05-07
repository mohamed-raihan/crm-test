import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userLoginData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userLoginData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for accessing the context
export const useUser = () => useContext(UserContext);
