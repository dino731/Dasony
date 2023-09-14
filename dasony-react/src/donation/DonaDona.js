import { useState, useEffect} from 'react';
import './DonaDona.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DonaDona = () => {

    const {donaNo} = useParams();

    const navigate = useNavigate();

    const [isAllDonation, setIsAllDonation] = useState(false); // 모두 기부하기
    const [donationAmount, setDonationAmount] = useState([]); // input 입력 값
    const [userPoint, setUserPoint] = useState(0); // 사용자의 보유 포인트 가져옴
    
    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);

    useEffect(() => { // 사용자 다손 가져오기
        axios.post(`/dasony/api/userInfo`, {userNo : loginUserNo})
        .then((response) => {
            const userData = response.data;
            if(userData.user){
                const {totalPoint} = userData.user;
                setUserPoint(totalPoint);
            }else{
                console.error("사용자 정보를 찾을 수 없습니다");
            }
        })
          .catch((error) => {
            console.log(error);
          })  
        }, []);

    const handleAllDonationChange = () => {
        setIsAllDonation((prevIsAllDonation) => !prevIsAllDonation);
        
        if (!isAllDonation) {
            setDonationAmount(userPoint.toString()); // 모두 기부하기 체크 시 초기값으로 기부 금액 설정
        } else {
            setDonationAmount(''); // 체크 해제 시 기부 금액 비움
        }
    };

    const handleDonationAmountChange = (event) => {
        const rawValue = event.target.value;
        const numericValue = parseInt(rawValue.replace(/[^0-9]/g, ''));

        if (isNaN(numericValue)) { // 숫자 변환이 제대로 되지 않은 경우
            setDonationAmount(''); // 기부 금액 비움
        } else if (numericValue > userPoint) { // 보유 금액보다 큰 액수 입력 시
            setDonationAmount(userPoint.toString());
        } else {
            setDonationAmount(numericValue.toString());
        }
    };

    const formatWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handlebackmogh = (donaNo) => {
       navigate(`/donadetail/${donaNo}`);
    }

    const handeldonation = () => {
        if(isAllDonation || (donationAmount !== '' && parseInt(donationAmount) > 0)){ // check버튼을 눌렀거나, 기부 금액 값을 입력했을 때
            alert("기부가 완료되었습니다" );
            
            const donationAmountInt = parseInt(donationAmount);

            setDonationAmount(donationAmountInt); // donationAmount 업데이트

            const newDasonPoint = userPoint - donationAmountInt; // 보유 다손에서 차감
            setUserPoint(newDasonPoint); 

            axios.post(`/dasony/api/updateUserPoint`, {userNo : loginUserNo, newDasonPoint})
                .then((response) => {
                    const updatDasonPoint = response.data.userPoint;
                    setUserPoint(updatDasonPoint);
                })
                .catch((error) => {
                    console.log(error);
                });

            // let idList = localStorage.getItem('id').split(",");
            // console.log("donation part ID : " + idList);
            // localStorage.setItem('id', localStorage.getItem('id') + ", " + donaNo);
            // console.log(localStorage.getItem("id"));
            
            navigate('/mypage/Mydonation');
        }else{
            alert("기부 금액을 입력해주세요");
            return;
        }
    }

    return(
        <div id="donahamcontent">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div id="donaham">
                <p id="donamogh">기부 모금함</p><br/>
                <hr/><br/>
                <form id="donationForm">
                    <span>
                        보유 다손 <b> {userPoint}</b>다손
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <label style={{fontSize : '15px'}}>
                        <input 
                            type="checkbox" 
                            value="all" 
                            name="dason" 
                            checked={isAllDonation} 
                            onChange={handleAllDonationChange}
                        />
                        모두 기부하기
                    </label>
                    <br/><br/>
                    <label>기부 다손 
                        <input 
                            type="text" 
                            dir="rtl" 
                            name="dona_dason" 
                            id="dona_dason" 
                            value={formatWithCommas(donationAmount)} 
                            readOnly={isAllDonation} 
                            onChange={handleDonationAmountChange}
                        />
                        다손 / <b>{userPoint}</b>다손
                    </label>
                </form>
                <br/>
                <span id="gibutxt">* 기부하신 금액은 단체로 100% 기부됩니다</span>
                <br/><br/>
            </div>
                <button id="dona" onClick={handeldonation}>기부하기</button>
                <button id="back_dona" onClick={() => handlebackmogh(donaNo)}>모금함으로 돌아가기</button>
        </div>
    );
}
export default DonaDona;
