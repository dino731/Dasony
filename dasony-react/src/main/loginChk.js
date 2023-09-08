
import { useRecoilState } from 'recoil';
import { loginUserState } from '../atoms';



const IsLogin = () => {
    const loginUserInfo = useRecoilValue(loginUserState);
    return loginUserInfo==null?false:true;
}

const IsAdmin = () => {
    const loginUserInfo = useRecoilValue(loginUserState);
    return loginUserInfo!=null&&loginUserInfo.userLevel=='Z'?true:false;
}

export {IsAdmin, IsLogin};