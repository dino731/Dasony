import { useEffect, useState} from 'react';
import './DonaDona.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { error } from 'jquery';

const DonaDona = () => {

    const {donaNo} = useParams();

    
    // const donaAmount = localStorage.getItem('donationAmount');

    const [isAllDonation, setIsAllDonation] = useState(false);
    const [donationAmount, setDonationAmount] = useState([]); // 초기값을 빈 배열로
    const initialAmount = 5000; // 보유 다손 초기 값
    const [currentDason, setCurrentDason] = useState(0);
    // const [countDona, setCountDona] = useState(1); // 기부버튼 클릭 시 해당 기부 글 건수 카운트

    const handleAllDonationChange = () => {
        setIsAllDonation((prevIsAllDonation) => !prevIsAllDonation);
        
        if (!isAllDonation) {
            setDonationAmount(initialAmount.toString()); // 모두 기부하기 체크 시 초기값으로 기부 금액 설정
        } else {
            setDonationAmount(''); // 체크 해제 시 기부 금액 비움
        }
    };

    // useEffect(() => {

    //     const userNo = 23090753;

    //     axios.post(`/dasony/donadona/${userNo}`)
    //     .then((response) => {
    //         const userData = response.data;
    //         setCurrentDason(userData)
    //     })
    //     .catch((error) => {
    //         console.log('다손 정보 가져오는 중 오류발생;', error);
    //     });
    // }, []);


    const handleDonationAmountChange = (event) => {
        const rawValue = event.target.value;
        const numericValue = parseInt(rawValue.replace(/[^0-9]/g, ''));

        if (isNaN(numericValue)) { // 숫자 변환이 제대로 되지 않은 경우
            setDonationAmount(''); // 기부 금액 비움
        } else if (numericValue > initialAmount) { // 보유 금액보다 큰 액수 입력 시
            setDonationAmount(initialAmount.toString());
        } else {
            setDonationAmount(numericValue.toString());
        }
    };

    const formatWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handlebackmogh = (donaNo) => {
        window.location.href = `/donadetail/${donaNo}`;
    }

    const handeldonation = () => {
        if(isAllDonation || donationAmount !== ''){ // check버튼을 눌렀거나, 기부 금액 값을 입력했을 때
            alert("기부가 완료되었습니다");
            
            const donationAmountInt = parseInt(donationAmount);
            console.log(donationAmountInt);

            setDonationAmount(donationAmountInt); // donationAmount 업데이트
            setCurrentDason(currentDason - donationAmountInt); // 남은 다손 업데이트
            // setCountDona(countDona + 1);

            // 기부 금액을 localStorage에 저장
            localStorage.setItem(`donationAmount_${donaNo}`, donationAmountInt);
            // localStorage.setItem(`countDona_${id}`, countDona);
            // console.log("count : " + countDona);

            let idList = localStorage.getItem('id').split(", ");
            console.log("donation part ID : " + idList);
            localStorage.setItem('id', localStorage.getItem('id') + ", " + donaNo);
            console.log(localStorage.getItem("id"));
            
            window.location.href = '/mypage/Mydonation';
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
                        보유 다손 <b>{currentDason.toLocaleString()}</b>다손
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
                        다손 / <b>{currentDason.toLocaleString()}</b>다손
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
