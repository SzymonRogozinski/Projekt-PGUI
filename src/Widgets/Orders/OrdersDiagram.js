import CanvasJSReact from "@canvasjs/react-charts";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {Themes} from "../../ProjectEnums";

export default function OrdersDiagram({ ordersData }) {
  const nav = useNavigate();
  let selTheme = useSelector((state) => state.appState.selectedTheme);
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
            label: "Niewysłane",
            click: () => {
              nav("/orders?type=notsent");
            },
          },
          {
            y: ordersData.unpaid,
            label: "Nieopłacone",
            click: () => {
              nav("/orders?type=unpaid");
            },
          },
          {
            y: ordersData.returned,
            label: "Zwroty",
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
