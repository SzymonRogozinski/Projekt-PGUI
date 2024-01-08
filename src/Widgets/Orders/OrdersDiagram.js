import CanvasJSReact from "@canvasjs/react-charts";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {Themes} from "../../ProjectEnums";
import dictionary from "../../Data-Containers/Dictionary.json"

export default function OrdersDiagram({ ordersData }) {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  const nav = useNavigate();
  let selTheme = appState.selectedTheme;
  const options = {
    theme: selTheme === Themes.Light ? "light1" : "dark1",
    backgroundColor: null,
    height: "190",
    data: [
      {
        type: "pie",
        startAngle: 0,
        toolTipContent: "<b>{label}</b>: {y}%",
        indexLabelFontSize: 14,
        indexLabel: "{label} - {y}",
        dataPoints: [
          {
            y: ordersData.notsent,
            label: dictionary[lang].Orders.notsent,
            click: () => {
              nav("/orders?type=notsent");
            },
          },
          {
            y: ordersData.unpaid,
            label: dictionary[lang].Orders.unpaid,
            click: () => {
              nav("/orders?type=unpaid");
            },
          },
          {
            y: ordersData.returned,
            label: dictionary[lang].Orders.returned,
            click: () => {
              nav("/orders?type=returned");
            },
          },
        ],
      },
    ],
  };

  return <CanvasJSReact.CanvasJSChart options={options} />;
}
