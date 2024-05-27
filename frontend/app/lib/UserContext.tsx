'use client'
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({children}: {
    children: React.ReactNode;
}){
  const [userId, setUserId] = useState(""); 
  const [userRole, setUserRole] = useState(""); 
  const [clientQuery, setClientQuery] = useState("");

  return(
    <AppContext.Provider value={{
      userId, setUserId, 
      userRole, setUserRole, 
      clientQuery, setClientQuery
      }}>
      {children}
    </AppContext.Provider>
  );
} 

export function useAppContext(){
  return useContext(AppContext)
}
