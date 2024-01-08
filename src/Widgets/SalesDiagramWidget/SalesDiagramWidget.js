import { useState } from "react";
import {
  ChartTimeType,
  ChartType,
  MeasurementElement,
} from "../../ProjectEnums";
import Chart from "./Chart";
import AppState from "../../Data-Containers/AppState/AppState";
import {useSelector} from "react-redux";
import dictionary from "../../Data-Containers/Dictionary.json"

export default function SalesDiagramWidget({ salesData }) {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  let [chartMeasurementElement, setChartMeasurementElement] = useState(
    MeasurementElement.Turnover
  );
  let [chartTimeRange, setChartTimeRange] = useState(ChartTimeType.Today);
  let [chartType, setChartType] = useState(ChartType.LineChart);
  let [secondSeriesEnabled, setSecondSeriesEnabled] = useState(false);

  const secondSeriesEnableChangeCallback = () => {
    setSecondSeriesEnabled(!secondSeriesEnabled);
  };

  let dpSet;
  let isActive = salesData != null && salesData.length > 0;
  if (isActive) {
    let dp,
      sdp,
      xp,
      yp,
      lastActive = false;
    let dp2,
      sdp2,
      xp2,
      yp2,
      lastActive2 = false;
    switch (chartTimeRange) {
      case ChartTimeType.Today:
        sdp = genSdp(0, 0, 0, new Date().getHours(), salesData);
        xp = genHourXLabels(sdp);
        lastActive = true;
        break;
      case ChartTimeType.ThisWeek:
        sdp = genSdp(6, 0, 0, new Date().getHours(), salesData);
        sdp = sumDays(sdp);
        xp = genDayXLabels(sdp);
        lastActive = true;
        break;
      case ChartTimeType.PrevWeek:
        sdp = genSdp(6 + 7, 0, 7, 23, salesData);
        sdp = sumDays(sdp);
        xp = genDayXLabels(sdp);
        break;
    }

    if (secondSeriesEnabled) {
      switch (chartTimeRange) {
        case ChartTimeType.Today:
          sdp2 = genSdp(1, 0, 1, 23, salesData);
          break;
        case ChartTimeType.ThisWeek:
          sdp2 = genSdp(6 + 7, 0, 7, 23, salesData);
          sdp2 = sumDays(sdp2);
          break;
        case ChartTimeType.PrevWeek:
          sdp2 = genSdp(6 + 7 * 2, 0, 14, 23, salesData);
          sdp2 = sumDays(sdp2);
          break;
      }
      dp2 = prepareDatapoints(
        lang,
        sdp2,
        lastActive2,
        chartMeasurementElement,
        chartTimeRange,
        secondSeriesEnabled && chartTimeRange === ChartTimeType.Today,
        true
      );
    }

    dp = prepareDatapoints(
      lang,
      sdp,
      lastActive,
      chartMeasurementElement,
      chartTimeRange,
      secondSeriesEnabled && chartTimeRange === ChartTimeType.Today
    );

    dpSet = [dp];
    if (dp2 != null) {
      dpSet.push(dp2);
    }
  }
  return (
    <div className="widget" id="salesDiagramWidget">
      <span className="widget-header">Wykres sprzedaży</span>
      {isActive ? (
        <div className="widget-content">
          <div className="buttons-grid">
            <div className="chart-buttons-wrapper">
              <TimeRangeChangeButton
                callback={setChartTimeRange}
                value={chartTimeRange}
              />
              <SecondSeriesChangeButton
                callback={secondSeriesEnableChangeCallback}
                value={secondSeriesEnabled}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "7px",
              }}
            >
              <ChartTypeChangeButton
                callback={setChartType}
                value={chartType}
              />
              <MeasureTypeChangeButton
                callback={setChartMeasurementElement}
                value={chartMeasurementElement}
              />
            </div>
          </div>
          <Chart
            chartType={chartType}
            dps={dpSet}
            measurementElement={chartMeasurementElement}
          />
        </div>
      ) : (
        <div className="widget-content inactive-widget-content">
          <span className="text-hdg">{dictionary[lang].SalesDiagram.noData}</span>
          <span>{dictionary[lang].SalesDiagram.thereWillBe}</span>
        </div>
      )}
    </div>
  );
}

function TimeRangeChangeButton({ callback, value }) {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  return (
    <div className="chart-selectors-wrapper">
      <span className="material-icons">event_note</span>
      <button
        className={
          "btn-tertiary b-pos " +
          (value === ChartTimeType.Today ? "selected" : "")
        }
        onClick={() => callback(ChartTimeType.Today)}
      >
        {dictionary[lang].SalesDiagram.today}
      </button>
      <button
        className={
          "btn-tertiary b-pos " +
          (value === ChartTimeType.ThisWeek ? "selected" : "")
        }
        onClick={() => callback(ChartTimeType.ThisWeek)}
      >
        {dictionary[lang].SalesDiagram.thisWeek}
      </button>
      <button
        className={
          "btn-tertiary b-pos " +
          (value === ChartTimeType.PrevWeek ? "selected" : "")
        }
        onClick={() => callback(ChartTimeType.PrevWeek)}
      >
        {dictionary[lang].SalesDiagram.prevWeek}
      </button>
    </div>
  );
}

function ChartTypeChangeButton({ callback, value }) {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  return (
    <div className="chart-selectors-wrapper">
      <span className="material-icons">bar_chart</span>
      <button
        className={
          "btn-tertiary b-pos " +
          (value === ChartType.BarChart ? "selected" : "")
        }
        onClick={() => callback(ChartType.BarChart)}
      >
        {dictionary[lang].SalesDiagram.barDiag}
      </button>
      <button
        className={
          "btn-tertiary b-pos " +
          (value === ChartType.LineChart ? "selected" : "")
        }
        onClick={() => callback(ChartType.LineChart)}
      >
        {dictionary[lang].SalesDiagram.lineDiag}
      </button>
    </div>
  );
}

function SecondSeriesChangeButton({ callback, value }) {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  return (
    <div className="chart-selectors-wrapper">
      <span className="material-icons">looks_two</span>
      <button
        className={"btn-tertiary b-pos " + (value === true ? "selected" : "")}
        onClick={callback}
      >
        {dictionary[lang].SalesDiagram.prevTime}
      </button>
    </div>
  );
}

function MeasureTypeChangeButton({ callback, value }) {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  return (
    <div className="chart-selectors-wrapper">
      <span className="material-icons">format_list_numbered</span>
      <button
        className={
          "btn-tertiary b-pos " +
          (value === MeasurementElement.Turnover ? "selected" : "")
        }
        onClick={() => callback(MeasurementElement.Turnover)}
      >
        {dictionary[lang].SalesDiagram.turnOver}
      </button>
      <button
        className={
          "btn-tertiary b-pos " +
          (value === MeasurementElement.SoldUnits ? "selected" : "")
        }
        onClick={() => callback(MeasurementElement.SoldUnits)}
      >
        {dictionary[lang].SalesDiagram.countSold}
      </button>
    </div>
  );
}

function genHourXLabels(sdp) {
  let hours = [];
  sdp.forEach((el) => {
    let h = el.hour + ":00";
    hours.push(h.length < 5 ? "0" + h : h);
  });

  return hours;
}

function genDayXLabels(sdp) {
  return sdp.map((sd) => deriveDate(sd.day));
}

function deriveDate(day) {
  let date = new Date(Date.now() - 1000 * 60 * 60 * 24 * day);
  return (
    String(date.getDate()).padStart(2, "0") +
    "." +
    String(date.getMonth() + 1).padStart(2, "0")
  );
}

function sumDays(sdp) {
  let sdps = [];
  sdps = [...new Set(sdp.map((e) => e.day))].map((eday) => {
    return sdp
      .filter((sd) => sd.day === eday)
      .reduce(
        (o1, o2) => {
          o1.soldUnits += o2.soldUnits;
          o1.turnover += o2.turnover;
          return o1;
        },
        { day: eday, turnover: 0.0, soldUnits: 0 }
      );
  });
  return sdps;
}

/**
 * Filters SDPs
 * @param dayStart start date (more in future)
 * @param hourStart start hour
 * @param dayEnd end hour (more in past)
 * @param hourEnd end hour
 * @param salesData
 * @returns {*[]}
 */
function genSdp(dayStart, hourStart, dayEnd, hourEnd, salesData) {
  let yp = [];
  for (let d = dayStart; d >= dayEnd; d--) {
    for (let h = hourStart; h <= (d === dayEnd ? hourEnd : 23); h++) {
      yp.push(salesData.filter((sd) => sd.hour === h && sd.day === d)[0]);
    }
  }
  yp.sort((o1, o2) =>
    o1.day === o2.day ? o1.hour - o2.hour : o2.day - o1.day
  );
  return yp;
}

function genYTurnover(sdp) {
  let yLabels = sdp.map((el) => el.turnover.toFixed(2));
  let yVals = sdp.map((el) => el.turnover);
  return [yVals, yLabels];
}

function genYSoldUnits(sdp) {
  let yVals = sdp.map((el) => el.soldUnits);
  return [yVals, yVals];
}

function prepareDatapoints(
  lang,
  sdp,
  lastActive,
  measurementElement,
  timeRange,
  showDates,
  isThis2nd = false
) {
  let [yVals, yLabels] =
    measurementElement === MeasurementElement.Turnover
      ? genYTurnover(sdp)
      : genYSoldUnits(sdp);
  let xp =
    timeRange === ChartTimeType.Today
      ? genHourXLabels(sdp)
      : genDayXLabels(sdp);
  let legend =
    measurementElement === MeasurementElement.Turnover
      ? dictionary[lang].SalesDiagram.turnOverFrom
      : dictionary[lang].SalesDiagram.soldFrom;
  if (timeRange === ChartTimeType.Today) {
    legend += isThis2nd ? dictionary[lang].SalesDiagram.yesterday : dictionary[lang].SalesDiagram.today;
  }
  legend += `${xp[0]} - ${xp[xp.length - 1]}`;

  let dp = xp.map((xel, i) => {
    let elem = { y: yVals[i], label: xel };
    elem.toolTipContent =
      (showDates ? `(${deriveDate(sdp[i].day)}) ` : "") +
      `<b>${elem.label}</b>: ${yLabels[i]} `;
    return elem;
  });

  if (lastActive) {
    if (dp.length > 1) dp[dp.length - 2].lineDashType = "dash";
    dp[dp.length - 1].color = "#c5ccd6";
    dp[dp.length - 1].toolTipContent =
    dictionary[lang].SalesDiagram.working + dp[dp.length - 1].toolTipContent;
  }
  return { data: dp, legend: legend };
}
