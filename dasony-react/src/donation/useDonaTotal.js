import {useEffect, useState} from 'react';
import axios from 'axios';

function useDonaTotal(donaNo) {
    const [totalDonaAmount, setTotalDonaAmount] = useState(0); // 총 기부 금액
    const [donaHistory, setDonaHistory] = useState([]); // 기부 이력 관련
    const [donationCount, setDonationCount] = useState(0); // 기부 건수 저장

    // const getUserName = async(userNo) => {
    //   try{
    //     const response = await axios.post('/api/getUserName', {userNo});
    //     return response.data;
    //   }catch (error){
    //     console.error(error);
    //     return {};
    //   }
    // }
  
    const getDonaTotal = () => {
      axios.post(`/dasony/detailTotalDona/${donaNo}`)
        .then((response) => {
          const donaHistoryData = response.data.donaHistory;
          setDonaHistory(donaHistoryData);
          
          const totalDonaAmount = response.data.totalDonaAmount;
          setTotalDonaAmount(totalDonaAmount);
          
          const donationCount = donaHistoryData.length;
          setDonationCount(donationCount);
          
          // console.log(JSON.stringify(donaHistoryData));
          
        })
        .catch((error) => console.log(error));
      };
      
      useEffect(() => {
        getDonaTotal();
        // getUserName();
      }, [donaNo]);
 
  
    return {
      totalDonaAmount,
      donaHistory,
      donationCount
    };
  }
  
  export default useDonaTotal;