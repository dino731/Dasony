import { createContext, useContext, useState } from "react";

const ChatDataContext = createContext();

export const ChatDataProvider = ({children}) => {
    const [chatData, setChatDate] = useState([
        { id: 1, chatname: '안 고독한 이명수', username: '말미잘', people: 20 },
        { id: 2, chatname: '안 고독한 박명수', username: '말미잘', people: 20 },
        { id: 3, chatname: '안 고독한 박명수', username: '말미잘', people: 20 },
        { id: 4, chatname: '안 고독한 김명수', username: '말미잘', people: 20 }
    ]);

    return(
        <ChatDataContext.Provider value={{chatData, setChatDate}}>
            {children}
        </ChatDataContext.Provider>
    );
};

export const useChatData = () => {
    return useContext(ChatDataContext);
}