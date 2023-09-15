import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect, useRef } from "react";

const LineChart = ({paddingRight, data, kind}) => {
    console.log("line : ", data);
    const chartRef = useRef(null);

    const name1 = kind[0];
    const name2 = kind[1];

    useLayoutEffect(() => {
    
        let root = am5.Root.new("chartdiv");

        // logo delete
        root._logo.dispose();
    
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
    
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX:true,
            paddingRight: 0,
            paddingLeft: 0
        }));
        
        chart.get("colors").set("step", 3);
        
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);
        
        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0.3,
            baseInterval: {
                timeUnit: "day",
                count: 1
            },
            // x axis postion
            startLocation: 0.1,
            endLocation: 0.6,
            // gridIntervals: [{timeUnit : "day", count: 1}],
            renderer: am5xy.AxisRendererX.new(root, {}),
            // x axis에 따른 툴팁 off 위해 주석처리
            // tooltip: am5.Tooltip.new(root, {})
        }));
        xAxis.get("dateFormats")["day"] = "MM월 dd일";
        
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        const newTooltip = (root) => {
            const tooltip = am5.Tooltip.new(root, {
            keepTargetHover: true,
            labelText: "{name}\n [bold]{valueY}",
            });
          
            tooltip.states.create("hidden", {visible:true});
            return tooltip;
        };
        
        const createSeries = (name, valueYField, valueXField) => {
            let series = chart.series.push(am5xy.LineSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: valueYField,
                valueXField: valueXField,
                tooltip: newTooltip(root)
            }));
            series.strokes.template.setAll({
                strokeWidth: 2,
                strokeDasharray: [3, 3]
            });
            
            series.bullets.push(function(root, series, dataItem) {  
                if (dataItem.dataContext.bullet) {    
                    let container = am5.Container.new(root, {});
                    let circle0 = container.children.push(am5.Circle.new(root, {
                        radius: 5,
                        fill: am5.color(0xff0000)
                    }));
                    let circle1 = container.children.push(am5.Circle.new(root, {
                        radius: 5,
                        fill: am5.color(0xff0000)
                    }));
                
                    circle1.animate({
                        key: "radius",
                        to: 20,
                        duration: 1000,
                        easing: am5.ease.out(am5.ease.cubic),
                        loops: Infinity
                    });
                    circle1.animate({
                        key: "opacity",
                        to: 0,
                        from: 1,
                        duration: 1000,
                        easing: am5.ease.out(am5.ease.cubic),
                        loops: Infinity
                    });
                
                    return am5.Bullet.new(root, {
                        sprite: container
                    })
                }else{
                    let lastFocus;
                    let circle = am5.Circle.new(root, {
                        focusable: true,
                        hoverOnFocus: true,
                        tooltipText: " ",
                        tooltip: newTooltip(root),
                        radius: 5,
                        fill: series.get("fill"),
                        stroke: root.interfaceColors.get("background"),
                        strokeWidth: 2,
                        showTooltipOn: "hover",
                    })
                    circle.events.on('focus', (ev) => {
                        lastFocus = ev.target
                    })
                    circle.events.on('pointerover', (ev) => {
                        if (lastFocus && lastFocus !== ev.target) {
                        lastFocus.hideTooltip()
                        }
                    })
                    return am5.Bullet.new(root, {
                        sprite: circle
                    });
                }
            })
            
            series.data.setAll(data);

            return series;
        };

        let series1 = createSeries(name1, "rate1", "date");
        let series2 = createSeries(name2, "rate2", "date");

        let legend = chart.children.push( am5.Legend.new(root, {
                centerX: am5.percent(100), // am5.p50
                x: am5.percent(100),
                y: am5.percent(0),
                centerY: am5.percent(0),
            })
        );
        legend.data.setAll(chart.series.values);
        
        series1.appear(1000);
        series2.appear(1000);
        chart.appear(1000, 100);
    
        chartRef.current = chart;

        return () => {
            root.dispose();
        };
    }, [data]);

    useLayoutEffect(() => {
        chartRef.current.set("paddingRight", paddingRight);
    }, [paddingRight]);
  
    return (
        <div id="chartdiv" style={{ width: "100%", height: "40vh", marginBottom: "6%" }}></div>
    );
};

export default LineChart;