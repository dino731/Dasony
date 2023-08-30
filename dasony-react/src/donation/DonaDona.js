// import { expr } from 'jquery';
import { useState, useEffect } from 'react';
import './DonaDona.css';
// import { event } from 'jquery';
import { useParams } from 'react-router-dom';

const DonaDona = () => {

    const {id} = useParams();
    // const donaAmount = localStorage.getItem('donationAmount');
    

    const [isAllDonation, setIsAllDonation] = useState(false);
    const [donationAmount, setDonationAmount] = useState(''); // 초기값을 빈 문자열로
    const initialAmount = 5000; // 보유 다손 초기 값
    const [currentDason, setCurrentDason] = useState(initialAmount);

    const handleAllDonationChange = () => {
        setIsAllDonation((prevIsAllDonation) => !prevIsAllDonation);
        
        if (!isAllDonation) {
            setDonationAmount(initialAmount.toString()); // 모두 기부하기 체크 시 초기값으로 기부 금액 설정
        } else {
            setDonationAmount(''); // 체크 해제 시 기부 금액 비움
        }
    };

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

    const handlebackmogh = (id) => {
        window.location.href = `/donadetail/${id}`;
    }

    const handeldonation = () => {
        if(isAllDonation || donationAmount !== ''){ // check버튼을 눌렀거나, 기부 금액 값을 입력했을 때
            alert("기부가 완료되었습니다");
            
            window.location.href = '/donatotal';
            setCurrentDason(initialAmount - donationAmount); // 보유하고 있는 다손 - 기부한 다손 = 남은 다손

            localStorage.setItem('donationAmount', donationAmount);
            localStorage.setItem('id', id);

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
                <button id="back_dona" onClick={() => handlebackmogh(id)}>모금함으로 돌아가기</button>
        </div>
    );
}
export default DonaDona;
