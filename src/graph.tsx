import React, { useEffect, useState } from 'react';
// import BackButtonIcon from '../icons/backbutton.svg';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';


const options = {
  layout: {
    padding: {
      top: 7
    }
  },
  scales: {
    xAxes: [{
      type: 'time',
      gridLines: {
        display: false,
      },
      ticks: {
        fontColor: "hsl(217deg, 20%, 70%)",
        autoSkip: true,
        maxTicksLimit: 4,
        maxRotation: 0,
        minRotation: 0
      },
      time: {
        displayFormats: {
          minute: 'HH:MM',
          hour: 'HH:MM'
        }
      }
    }],
    yAxes: [{
      display: false,
      gridLines: {
        display: false,
      },
      ticks: {
        fontColor: "hsl(217deg, 30%, 80%)",
      },
    }]
  },
  responsive: true,
  maintainAspectRatio: false,
  hover: {
    mode: 'nearest',
    intersect: true
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  legend: {
    display: false,
    labels: {
      fontColor: 'rgb(255, 99, 132)'
    }
  }
}

const graphData = [
  { "timestamp": "2020-11-29 05:00:00.000000", "value": 450 },
  { "timestamp": "2020-11-29 06:00:00.000000", "value": 480 },
  { "timestamp": "2020-11-29 07:00:00.000000", "value": 499 },
  { "timestamp": "2020-11-29 08:00:00.000000", "value": 520 },
  { "timestamp": "2020-11-29 09:00:00.000000", "value": 535 },
  { "timestamp": "2020-11-29 10:00:00.000000", "value": 540 },
  { "timestamp": "2020-11-29 11:00:00.000000", "value": 540 },
  { "timestamp": "2020-11-29 12:00:00.000000", "value": 540 },
  { "timestamp": "2020-11-29 13:00:00.000000", "value": 480 },
  { "timestamp": "2020-11-29 14:00:00.000000", "value": 420 },
  { "timestamp": "2020-11-29 15:00:00.000000", "value": 460 }
];

interface TimeSerieEntry {
  timestamp: string;
  value: number;
}

const mapToTimeseries = (graphData: TimeSerieEntry[]) => graphData.map(({ timestamp, value }) => ({
  x: new Date(timestamp),
  y: value,
}));


const customData = (data: any) => (canvas: HTMLCanvasElement) => {
  const hue = 340;
  if (!canvas) {
    return data;
  }
  console.log(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return data;
  }
  const canvasHeight = canvas.getBoundingClientRect().width;
  const gradientStroke = ctx.createLinearGradient(0, canvasHeight, 0, 0);
  gradientStroke.addColorStop(0, `hsl(${hue}, 70%, 90%)`);
  gradientStroke.addColorStop(0.8, `hsl(${hue}, 70%, 85%)`);
  gradientStroke.addColorStop(1, `hsl(${hue}, 70%, 60%)`);

  return {
    datasets: data.datasets.map((dataset: any) => ({
      ...dataset,
      borderColor: gradientStroke,
    }))
  };
}

const Container = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 9px rgba(181, 198, 214, 0.25);
`;

const GraphView = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<object | null>(null);

  useEffect(() => {
    // setTimeout(() => {
    //   setChartData(customData);
    //   setLoading(false);
    // }, 3000);
    const fetchData = async () => {
      try {
        const res = await fetch('/posts');
        // const dada = await res.json();
        const data1 = graphData; //dada.data[0].data.components.EC.data;
        const v = mapToTimeseries(data1);
        const data = {
          datasets: [
            {
              label: 'EC µs/cm',
              data: v,
              fill: false,
              borderColor: 'hsl(340deg, 60%, 60%)',
              pointBackgroundColor: 'hsl(340deg, 60%, 60%)',
              pointRadius: 0,
            },
          ],
        }
        setChartData(customData(data));
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, []);

  return (
    <Container>
      {!loading ?
        <Line data={chartData} options={options} /> :
        <div>Loading...</div>}
    </Container>
  );
};

export default GraphView;