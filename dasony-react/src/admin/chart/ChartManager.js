import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import axios from 'axios';
import Loading from '../../common/Loading';
// import ChartTable from "./ChartTable";

// import 'datatables.net-dt';
// import 'datatables.net-responsive-dt';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
// import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import './chart.css';

const ChartManager = () => {
    const item = useRef([]);
    
    const navigate = useNavigate();
    // 차트 선택 효과 부여를 위한 state
    const [chartKind, setChartKind] = useState([true, false]);
    // 차트 데이터
    const [data, setData] = useState([]);
    // 차트 구분을 위한 state
    const [cate, setCate] = useState([]);

    // data loading
    const [loadStatus, setLoadStatus] = useState(false);

    // 차트 종류 선택시 컴포넌트 바꾸는 로직 + data 변경하는 추가 필요 (setState를 사용해서)
    const selectChart = (e, target, index) => {
        const eventTarget = e.target;
        let chartKindCopy = [...chartKind];

        if(target==='li'){
            if(!eventTarget.classList.contains("selected-chart")){
                eventTarget.classList.add("selected-chart");
                chartKindCopy[index] = true;
                e.stopPropagation();

                const siblings = Array.from(eventTarget.parentNode.children).filter(sibling => sibling !== eventTarget);
                siblings.forEach(sibling => {
                    sibling.classList.remove("selected-chart");
                    chartKindCopy[index -1] = false;
                });

                setChartKind([...chartKindCopy]);
            }
        }else{
            let parent = eventTarget.parentNode.parentNode;
            // console.log(parent);
            e.stopPropagation(); // 이벤트 전파 방지
            
            if(!parent.classList.contains("selected-chart")){
                parent.classList.add("selected-chart");
                chartKindCopy[index] = true;

                const siblings = Array.from(parent.parentNode.children).filter(sibling => sibling != parent);
                siblings.forEach(sibling => {
                    sibling.classList.remove("selected-chart");
                    chartKindCopy[index-1] = false;
                });

                setChartKind(chartKindCopy);
            }
        }
    };

    // 시간 변환
    const convertDate = (milliSecond) => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const data = new Date(milliSecond);  //Date객체 생성
      
        const year = data.getFullYear();    //0000년 가져오기
        const month = data.getMonth() + 1;  //월은 0부터 시작하니 +1하기
        const date = data.getDate();        //일자 가져오기
        const day = days[data.getDay()];    //요일 가져오기
      
        return `${year}.${month}.${date}. (${day})`;
    };

    // const selectLiHandler = (e) => selectChart(e, "li", 1);
    // const selectspanHandler = (e) => selectChart(e, "span", 1);

    // 데이터 로드 후 해당 파트 컴포넌트로 전달
    const loadData = () => {
        setLoadStatus(true);

        const selectedPart = document.querySelector(".selected-chart span").innerText;
        axios.get(`http://localhost:3000/dasony/chart/makeChart?category=${selectedPart}`)
            .then((res)=>{
                if(selectedPart.includes("User")){
                    for(let i=0;i<res.data.length;i++){
                        // console.log("개별 data : ", res.data[i]);
                        if(res.data[i])
                        res.data[i].date = new Date(res.data[i].date).getTime();
                        if(i==res.data.length-1) res.data[i].bullet = true;
                    }

                    setCate(["신규", "탈퇴"]);
                }else{
                    setCate(["게시글", "기부"]);
                }
                
                setData(res.data);
            })
    };

    useLayoutEffect(()=>{
        loadData();

        return loadData();
    }, [chartKind]);

    useEffect(()=>{
        /** 차트 유형 선택 효과 부여 및 제거 */
        item.current.forEach((element, index) => {
            
            element.addEventListener('click',(e) => selectChart(e, "li", index));
            
            element.querySelector(".chart-item span").addEventListener('click', (e) => selectChart(e, "span", index));
        });

        /** 데이터 가져오는 로직 추가 필요 */
        // 데이터 정의
        // data = 
        // initialTable();
        // $(tableRef.current).DataTable();

        return(()=>{
            // console.log(item.current)
            if(item.current[0]!=null){
                item.current.forEach((element, index) => {
                    element.removeEventListener('click', (e) => selectChart(e, "li", index));
                    
                    element.querySelector(".chart-item span").removeEventListener('click', (e) => selectChart(e, "span", index));
                });
            }
            // if(tableRef.current!=null) table.destroy();
        });
    },[chartKind, data]);


    // const tableRef = useRef(null);


    // // 테이블 속성
    // const initialTable = () =>{
    //     if(tableRef.current){
    //         const table = $(tableRef.current).DataTable({
    //             destroy: true,
    //             // "bDestroy": true,
    //             responsive: {
    //                 details: {
    //                 display: $.fn.dataTable.Responsive.display.childRowImmediate,
    //                 },
    //             },
    //             paging: false,
    //             select: false
    //         });
    //     }
    // };

    return(
        <>
            {loadStatus ? <div className="loadingContainer">
                            <Loading />
                        </div> : null}
            
            <div className="chart-container dragging">
                <div className="chart-menu ">
                    <ul className="chart-list">
                        <li className="selected-chart" ref={(el) => item.current[0] = el}> 
                            <div className="chart-item">
                                <span>User Chart</span>
                            </div>
                        </li>
                        <li  ref={(el) => item.current[1] = el}>
                            <div className="chart-item">
                                <span>Activity Chart</span>
                            </div>
                        </li>
                    </ul>
                </div>
                {chartKind[0] ==true? <LineChart paddingRight={10} data={data} kind={cate} loading={{loadStatus, setLoadStatus}}/> 
                    : <BarChart paddingRight={10} data={data} kind={cate} loading={{loadStatus, setLoadStatus}}/>}

                {/* 테이블 추가 */}
                {/* <ChartTable data={data}/> */}
                <table id="chartTable" summary="이 테이블은 그래프 데이터를 나타내는 인터랙티브 테이블입니다."
                    style={{tableLayout: "fixed"}}>
                    <thead>
                        <tr>
                            <th/>
                            <th colSpan={2}>{cate[0]}</th>
                            <th colSpan={2}>{cate[1]}</th>
                        </tr>
                        <tr>
                            <th scope="col" width={"15%"}>Date</th>
                            <th scope="col" width={"6%"}>Count</th>
                            <th scope="col" width={"6%"}>Rate</th>
                            <th scope="col" width={"6%"}>Count</th>
                            <th scope="col" width={"6%"}>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dt, index)=>{
                            return(
                                <tr key={index}>
                                    <td scope="row">{convertDate(dt.date)}</td>
                                    <td scope="row">{dt.value1}</td>
                                    <td scope="row">{dt.rate1}%</td>
                                    <td scope="row">{dt.value2}</td>
                                    <td scope="row">{dt.rate2}%</td>
                                </tr>
                            );
                        })}
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5" className="text-right">* 현재 기준으로 2주간의 데이터를 수집하여 나타낸 통계입니다.</td>
                        </tr>
                    </tfoot>
                </table> 
            </div>
        </>
        
    );
};

export default ChartManager;