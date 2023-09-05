import { createContext, useContext, useState } from "react";

const DonaDataContext = createContext();

// const donalist =[
//     {id : 1, title : '기부해주세요1', dona : '초록 어린이 우산 재단', createdate : '2023-03-22'},
//     {id : 2, title : '도와주세요', dona : '노인복지단체', createdate : '2023-03-25'},
//     {id : 3, title : '기부해주세요2', dona : '어린이 보호 재단', createdate : '2023-03-27'},
//     {id : 4, title : '기부해주세요3', dona : '해피빈', createdate : '2023-03-28'}
// ]; 


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