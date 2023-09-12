import { createContext, useContext, useState } from "react";

const ChatDataContext = createContext();

export const ChatDataProvider = ({children}) => {
    const [chatData, setChatDate] = useState([]);

    return(
        <ChatDataContext.Provider value={{chatData, setChatDate}}>
            {children}
        </ChatDataContext.Provider>
    );
};

export const useChatData = () => {
    return useContext(ChatDataContext);
}