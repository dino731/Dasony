import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useLayoutEffect, useRef } from "react";

const BarChart = ({paddingRight, data, kind}) => {
    console.log("Bar : ", data);
    const chartRef = useRef(null);

    const name1 = kind[0];
    const name2 = kind[1];

    useLayoutEffect(() => {
      const chartdiv = document.querySelector("#chartdiv");
      am4core.useTheme(am4themes_animated);
    
      let chart = am4core.create("chartdiv", am4charts.XYChart3D);
      if(chart.logo) {
        chart.logo.disabled = true;
      }
    
      // data 지정
      chart.data = data;

      let xAxis = chart.xAxes.push(new am4charts.DateAxis());
      xAxis.dataFields.date = "date"; 
      xAxis.baseInterval = {
        "timeUnit": "day",
        "count": 1
      };
      xAxis.renderer.labels.template.rotation = 330;
      xAxis.renderer.labels.template.hideOversized = false;
      xAxis.renderer.minGridDistance = 20;
      xAxis.renderer.labels.template.horizontalCenter = "right";
      xAxis.renderer.labels.template.verticalCenter = "middle";
      xAxis.renderer.cellStartLocation = 0.2;
      xAxis.renderer.cellEndLocation = 0.8;
      xAxis.dateFormats.setKey("day", "MM월 dd일");
      
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      let colorList = [];
      const createSeries = (name, valueX, valueY) => {
        let series = chart.series.push(new am4charts.ColumnSeries3D());
        series.dataFields.valueY = valueY;
        series.dataFields.dateX = valueX;
        series.name = name;
        series.columns.template.width = am4core.percent(80);
        series.columns.template.tooltipText = "{dateX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;
        
        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
        columnTemplate.stroke = am4core.color("#FFFFFF");

        let colorNum = valueY.substr(-1); // name.substr(-1)
        columnTemplate.fill = chart.colors.getIndex(colorNum+1);
        columnTemplate.stroke = chart.colors.getIndex(colorNum+1);

        colorList[colorNum] = chart.colors.getIndex(colorNum+1);
        console.log(chart.colors.getIndex(colorNum+1)._value);
        // columnTemplate.adapter.add("fill", function(fill, target) {
        //   return chart.colors.getIndex(target.dataItem.index);
        // })
        
        // columnTemplate.adapter.add("stroke", function(stroke, target) {
        //   return chart.colors.getIndex(target.dataItem.index);
        // })
        series.dummyData = {color: chart.colors.getIndex(colorNum+1)._value};
        return series;
      };

      chart.legend = new am4charts.Legend();
      // chart.legend.useDefaultMarker = true;
      // let marker = chart.legend.markers.template.children.getIndex(0);
      // marker.cornerRadius(12, 12, 12, 12);
      // marker.strokeWidth = 2;
      // marker.strokeOpacity = 1;
      // marker.stroke = chart.colors.getIndex(1);
      // chart.legend.labels.template.propertyFields.fill = "stroke";

      chart.colors.step = 2;
      
      createSeries(name1, "date", "value1");
      createSeries(name2, "date", "value2");
    
      chartRef.current = chart;
      chartdiv.style.opacity = 1;
      return () => {
          chart.dispose();
      };
    }, [data]);

    return (
      <div id="chartdiv" style={{ width: "100%", height: "40vh", marginBottom: "6%" , opacity:"0"}}></div>
    );
};

export default BarChart;