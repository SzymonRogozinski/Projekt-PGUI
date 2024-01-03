import CanvasJSReact from "@canvasjs/react-charts";
import {ChartType, MeasurementElement, Themes} from "../../ProjectEnums";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export default function Chart({chartType, dps, measurementElement}) {
    
    let selTheme = useSelector((state) => state.appState.selectedTheme);
    
    
    const options = {
        theme: selTheme === Themes.Light ? "light1" : "dark1",
        backgroundColor: null,
        height: "350",
        data: [
            {
                type: chartType,
                color: "red",
                startAngle: 0,
                toolTipContent: "<b>{label}</b>: {y} " + (measurementElement === MeasurementElement.Turnover ? "PLN" : "szt."),
                indexLabelFontSize: 14,
                dataPoints: dps[1]?.data??[],
                showInLegend: dps[1]!=null,
                legendText: dps[1]?.legend
            },
            {
                type: chartType,
                color: "#4f81bc",
                startAngle: 0,
                toolTipContent: "<b>{label}</b>: {y} " + (measurementElement === MeasurementElement.Turnover ? "PLN" : "szt."),
                indexLabelFontSize: 14,
                dataPoints: dps[0].data,
                showInLegend: true,
                legendText: dps[0].legend
            },
        ],
        axisY: {
            title: measurementElement === MeasurementElement.Turnover ? "Obrót [PLN]" : "Sprzedane szt.",
            includeZero: true
        }
    };

    return <div><CanvasJSReact.CanvasJSChart options={options}/></div>;
}
