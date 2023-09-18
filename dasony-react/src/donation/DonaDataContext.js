import { createContext, useContext, useState } from "react";

const DonaDataContext = createContext();

export const DonaDataProvider = ({children}) => {

    const [donalist, setDonalist] = useState([
        {id : '', title : '', dona : '', createdate : ''}
    ]);

    return(
        <DonaDataContext.Provider value={{donalist, setDonalist}}>
            {children}
        </DonaDataContext.Provider>
    );
};

export const useDonaData = () => {
    return useContext(DonaDataContext);
}