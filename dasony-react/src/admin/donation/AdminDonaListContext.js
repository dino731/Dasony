import { createContext, useContext, useState } from "react";

export const DonaDataContext = createContext();

export const AdminDonaListContext = ({ children }) => {

  const [adDonaList, setAdDonaList] = useState([]);

  return (
    <DonaDataContext.Provider value={{ adDonaList, setAdDonaList }}>
      {children}
    </DonaDataContext.Provider>
  );
};

export const useDonaList = () => {
  return useContext(DonaDataContext);
};

export function getDonaById(adDonaList, id) {
  return adDonaList.find(dona => dona.id === id);
}
