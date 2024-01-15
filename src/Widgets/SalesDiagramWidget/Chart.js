import CanvasJSReact from "@canvasjs/react-charts";
import {ChartType, MeasurementElement, Themes} from "../../ProjectEnums";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import dictionary from "../../Data-Containers/Dictionary.json"

export default function Chart({chartType, dps, measurementElement}) {
    let appState = useSelector((state) => state.appState);
    let lang =appState.selectedLanguage;
    
    let selTheme = appState.selectedTheme;
    
    const options = {
        theme: selTheme === Themes.Light ? "light1" : "dark1",
        height: 519,
        backgroundColor: null,
        data: [
            {
                type: chartType,
                color: "red",
                startAngle: 0,
                toolTipContent: "<b>{label}</b>: {y} " + (measurementElement === MeasurementElement.Turnover ? "PLN" : dictionary[lang].SalesDiagram.count),
                indexLabelFontSize: 14,
                dataPoints: dps[1]?.data??[],
                showInLegend: dps[1]!=null,
                legendText: dps[1]?.legend
            },
            {
                type: chartType,
                color: "#4f81bc",
                startAngle: 0,
                toolTipContent: "<b>{label}</b>: {y} " + (measurementElement === MeasurementElement.Turnover ? "PLN" : dictionary[lang].SalesDiagram.count),
                indexLabelFontSize: 14,
                dataPoints: dps[0].data,
                showInLegend: true,
                legendText: dps[0].legend
            },
        ],
        axisY: {
            title: measurementElement === MeasurementElement.Turnover ? dictionary[lang].SalesDiagram.titleInc : dictionary[lang].SalesDiagram.titleCount,
            includeZero: true
        }
    };

    return <CanvasJSReact.CanvasJSChart options={options}/>;
}
