import React, { useContext, useState } from "react";

export const UserContext = React.createContext({});

export const UserContextProv = ({ children }) => {
  //User
  const [favChars, setFavChars] = useState([
    { name: "", status: "", species: "", gender: "", origin: "", image: "" },
  ]);

  return (
    <UserContext.Provider value={{ favChars, setFavChars }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserContextProv;
