import {useEffect, useState} from 'react';
import axios from 'axios';

function useDonaTotal(donaNo) {
    const [totalDonaAmount, setTotalDonaAmount] = useState(0); // 총 기부 금액
    const [donaHistory, setDonaHistory] = useState([]); // 기부 이력 관련
    const [donationCount, setDonationCount] = useState(0); // 기부 건수 저장

    const getDonaTotal = () => {
      axios.post(`/dasony/detailTotalDona/${donaNo}`)
        .then((response) => {
          const donaHistoryData = response.data.donaHistory;
          setDonaHistory(donaHistoryData);
          
          const totalDonaAmount = response.data.totalDonaAmount;
          setTotalDonaAmount(totalDonaAmount);
          
          const donationCount = donaHistoryData.length;
          setDonationCount(donationCount);
          
        })
        .catch((error) => console.log(error));
      };

      // const updateDonaList = () => {
      //   axios.post(`/dasony/adminAmountUpdate`, {donaNo, totalDonaAmount})
      //   .then((response) => console.log("뭐있어",response.data))
      //   .catch((error) => console.log(error));
      // }
      
      useEffect(() => {
        getDonaTotal();
      }, [donaNo]);

      // useEffect(() => {
      //   updateDonaList();
      // }, [totalDonaAmount]);
 
  
    return {
      totalDonaAmount,
      donaHistory,
      donationCount
    };
  }
  
  export default useDonaTotal;