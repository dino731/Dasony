import { useRef, useEffect, useState, useLayoutEffect } from "react";
import $ from 'jquery';

const ChartTable = ({data}) => {
    const tableRef = useRef(null);

    // 시간 변환
    const convertDate = (milliSecond) => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const data = new Date(milliSecond);  //Date객체 생성
      
        const year = data.getFullYear();    //0000년 가져오기
        const month = data.getMonth() + 1;  //월은 0부터 시작하니 +1하기
        const date = data.getDate();        //일자 가져오기
        const day = days[data.getDay()];    //요일 가져오기
      
        return `${year}.${month}.${date}. (${day})`;
    }

    // 테이블 속성
    const initialTable = () =>{
        if(tableRef.current){
            const table = $(tableRef.current).DataTable({
                // destroy: true,
                "bDestroy": true,
                responsive: {
                    details: {
                    display: $.fn.dataTable.Responsive.display.childRowImmediate,
                    },
                },
                paging: false,
                select: false
            });
        }
    };

    // const table = $(tableRef.current).DataTable({
    //     // destroy: true,
    //     retrieve: true,
    //     responsive: {
    //         details: {
    //         display: $.fn.dataTable.Responsive.display.childRowImmediate,
    //         },
    //     },
    //     paging: false,
    //     select: false
    //     // "bDestroy": true
    // });

    // useEffect(()=>{
    //     console.log(tableRef.current);
    //     $(tableRef.current).DataTable();
    //     initialTable();
    // },[]);

    return(
        <table id="chartTable" ref={tableRef} summary="이 테이블은 그래프 데이터를 나타내는 인터랙티브 테이블입니다."
            style={{tableLayout: "fixed"}}>
            <thead>
                <tr>
                    <th/>
                    <th colSpan={2}>라인1</th>
                    <th colSpan={2}>라인2</th>
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
                            <td scope="row">{dt.value1}%</td>
                            <td scope="row">{dt.value2}</td>
                            <td scope="row">{dt.value2}%</td>
                        </tr>
                    );
                })}
                
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="5" className="text-center">Data retrieved frominfoplease and.</td>
                </tr>
            </tfoot>
        </table>
    );
};

export default ChartTable;