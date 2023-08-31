import { useEffect, useState } from 'react';
import './DonaDetail.css';
import { useParams } from 'react-router-dom';
import { useDonaData } from './DonaDataContext';


const DonaDetail = () => {
    const {id} = useParams();
    const {donalist} = useDonaData();

    const donationAmount = localStorage.getItem(`donationAmount_${id}`);
    // const countDona = localStorage.getItem(`countDona_${id}`);


    const donaInfo = donalist.find(dona => dona.id === parseInt(id));

    const formatWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const [remainingDays, setRemainingDays] = useState('');

    // const donaInfo = localStorage.getItem('donaInfo');
    // const parseDonaInfo = JSON.parse(donaInfo);

    const handlemogh = (id) => {
        window.location.href = `/donadona/${id}`;
    }

    const data = new Date(donaInfo.createdate);
    data.setMonth(data.getMonth() + 7);
    data.setDate(data.getDate() - 1);

    const dataFormat = (date) => { 
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month >= 10 ? month : '0' + month;
      var day = date.getDate();
      day = day >= 10 ? day : '0' + day;
      return [year, month, day].join('-');
    };
    
    useEffect(() => {
    
        const calculateDaysRemaining = (endDate) => {
          const now = new Date();
          const differenceInTime = endDate.getTime() - now.getTime();
          const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
          return differenceInDays;
        };
    
        const daysRemaining = calculateDaysRemaining(data);
        setRemainingDays(daysRemaining);
      }, []);



    return(
        <div id="donadetailcontent">
        <div id="dona_tbl">
            <table className="donation_detail">
                <tr>
                    <th width="70">제목</th>
                    <td colSpan="3">{donaInfo.title}</td>
                </tr>
                <tr>
                    <th width="70">모금단체</th>
                    <td width="250" style={{borderRight : '1px solid black'}}>{donaInfo.dona}</td>
                    <th width="70">작성일</th>
                    <td width="250">{donaInfo.createdate}</td>
                </tr>
                <tr>
                    <th width="70">내용</th>
                    <td colSpan="3"style={{height : '400px', textAlign : 'left'}}> 
                        <div id="scrollable">
                            평양에서 태어나 군인으로 퇴직 후, 중국을 통해 우여곡절 끝에 2005년 남쪽으로 오셨다는 박창오(가명) 어르신은 흔히 말하는 새터민입니다. 새로운 터전에서 새로운 삶을 꿈꾸며 탈북을 결심하셨다는 어르신에게 유일한 가족은 함께 탈북한 어버님이었습니다. 하지만, 3년 전 치매를 앓던 어머니를 코로나로 잃으며 진짜 혼자가 되셨습니다. 탈북민이었지만, 명절이어도 혼자가 아닌 둘이었기에 든든했었다는 어르신은 이제 홀로 세 번째 추석을 맞이합니다.
                            “어머니와 함께 만들던 명절 음식이 그립다는 어르신.”
                            박창호(가명) 어르신은 10년 전 폐암 2기 판정을 받고 수술을 하셨습니다. 병간호를 해주던 어머니께 미안한 마음을 갖기도 전, 어머니마저 치매 판정을 받고 몸을 추스를 겨를도 없이 이번에는 어르신이 어머니의 병간호를 하셨다고 합니다. 주변에서 요양원으로 보내라는 조언에도 ‘유일하게 남은 가족’을 버릴 수 없어 직접 아픈 몸으로 병간호를 하셨지만, 코로나로 유일한 가족인 어머니를 속수무책으로 잃으셨다고 합니다. 한평생 고생만 하다 먼저 가신 어머니를 생각하면 늘 눈물만 난다는 어르신은 추석이 되면 어머니와 함께 소소하지만 따뜻했던 명절 음식을 만들었던 그때가 그립다고 하십니다.
                            “송편.. 불고기.. 부침개.. 이제는 맛볼 수 없는 음식입니다.”
                            북한에서도 추석은 민속명절이라고 불리며 우리처럼 생활환경에 따라 풍성하거나 간소한 차이가 있지만, 집집마다 온 가족들이 모여 송편을 빚고 전이나 여러 가지 나물을 함께 준비한다고 합니다. 탈북 후 춘천에서 터를 잡으시고 나서는 추석마다 어머니와 둘이서 송편이나 불고기, 각종 부침개를 만드셨다는 어르신. “넉넉하지 않은 살림이지만 음식을 함께 만들며 지나간 추억을 회상하고, 갓 만든 따끈따끈한 음식을 어머니 몰래 집어먹으면.. 그게 어찌나 꿀맛이던지.. 아직도 그 맛이 생생하게 기억나서 그리워요..”라며 눈물을 훔치셨습니다.
                            “홀로 추석을 보내시는 어르신들에게 ‘명절 한상 차림’을 대접하겠습니다”
                            어머니가 돌아가신 후 명절다운 음식을 드시지 못했다는 어르신. 그리고, 홀로 명절을 보내셔야 할 홀몸 어르신들을 위해 저희가 정성을 다한 음식을 준비하겠습니다.
                            찾아오는 이 하나 없이, 명절 연휴 기간 내내 홀로 집에만 계실 홀몸 어르신들을 위해 올해도 어김없이 두 손 가득 “명절 한상 차림”을 준비하겠습니다. 그리고, 어르신들이 용기를 잃지 않도록 손을 꼭 잡아드리겠습니다. 맞잡은 두 손의 온기가 가시지 않도록 함께 마음을 모아주세요.
                        </div>
                    </td>
                </tr>
                <tr>
                    <th width="70">참여내역</th>
                    <td colSpan="3" style={{height : '200px', textAlign : 'left'}}>
                        <div id="scrollable-td">
                        <p>2023-03-20</p>
                        <span>날개 없는 천사</span>
                        <span>5,000다손 기부</span>
                        <hr/>
                        <p>2023-03-20</p>
                        <span>날개 없는 천사</span>
                        <span>5,000다손 기부</span>
                        <hr/>
                        <p>2023-03-20</p>
                        <span>날개 없는 천사</span>
                        <span>5,000다손 기부</span>
                        <hr/>
                        <p>2023-03-20</p>
                        <span>날개 없는 천사</span>
                        <span>5,000다손 기부</span>
                        <hr/>
                        <p>2023-03-20</p>
                        <span>날개 없는 천사</span>
                        <span>5,000다손 기부</span>
                        <hr/>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div>
            <div id="db" style={{textAlign : 'center'}}>
                <br/><br/><br/><br/>
                <span id="donatxt" style={{fontSize : '20px'}}>총 <b>57건</b>이<br/>
                    기부되었습니다<br/><br/>
                    {donaInfo.createdate} ~ <br/>
                    {dataFormat(data)}<br/><br/>
                    <div id="dday"><b>D - {remainingDays}</b></div>
                    <br/>
                    모인 금액<br/>
                    <b style={{fontSize : '25px'}}>{donationAmount ? formatWithCommas(donationAmount) : "0"}</b><span style={{fontSize : '17px'}}>다손</span><br/><br/>
                    달성률<br/>
                    <b style={{fontSize : '25px'}}>6%</b>
                </span>
                <br/><br/>
                <button id="mogh" onClick={() => handlemogh(id)}>모금함 기부하기</button>
            </div>
        </div>
    </div>
    )
}
export default DonaDetail;