import { createContext, useContext, useState } from "react";

export const DonaDataContext = createContext();

export const AdminDonaListContext = ({ children }) => {

  const [adDonaList, setAdDonaList] = useState([
    {id : 1, title : '독립유공자 후손들에게 도움을 주세요1', dona : '노인종합복지회관1', content : '히히1', createdate : '2022-03-20', enddate : '2022-09-19', mony : '222,222다손'},
    {id : 2, title : '독립유공자 후손들에게 도움을 주세요2', dona : '노인종합복지회관2', content : '히히2', createdate : '2022-03-20', enddate : '2022-09-19', mony : '222,222다손'},
    {id : 3, title : '독립유공자 후손들에게 도움을 주세요3', dona : '노인종합복지회관3', content : '히히3', createdate : '2022-03-20', enddate : '2022-09-19', mony : '222,222다손'},
    {id : 4, title : '독립유공자 후손들에게 도움을 주세요4', dona : '노인종합복지회관4', content : '히히4', createdate : '2022-03-20', enddate : '2022-09-19', mony : '222,222다손'}
  ]);

  return (
    <DonaDataContext.Provider value={{ adDonaList, setAdDonaList }}>
      {children}
      {console.log(children)}
    </DonaDataContext.Provider>
  );
};

export const useDonaList = () => {
  return useContext(DonaDataContext);
};

export function getDonaById(adDonaList, id) {
  return adDonaList.find(dona => dona.id === id);
}
