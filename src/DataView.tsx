import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fetchDiscussionData } from "./discussion/api-adapter";
import { PostData } from "./discussion/mock-data";
import GraphCard, { TimeSerieEntry } from './GraphCard';
import BackButtonIcon from './icons/backbutton.svg';
// import ShareIcon from './icons/share.svg';
import ExpandIcon from './icons/expand.svg';
import './discussion/header.css';
import styled from "styled-components";
import './DataView.css';

const info = {
  causes: 'A rise in PM2.5 can cause respiratory problems and cancer',
  questions: [
    {
      text: 'What is particulate matter ?',
      answer: 'Yes',
    },
    {
      text: 'How is PM2.5 created',
      answer: 'Yes',
    }
  ],
  suspicious: [
    'Factory degassing',
    'Waste dumping'
  ]
}

const Header = (props: { title: string }) => {
  const history = useHistory();

  return (
    <div className="header">
      <img onClick={() => history.goBack()} src={BackButtonIcon} alt="" />
      <span className="header__title2">{props.title}</span>
      <div />
    </div>
  );
};

const Loading = styled.div`
  background-color: hsl(220, 50%, 100%);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 9px rgba(181, 198, 214, 0.25);
  height: 150px;
`

const InfoCard = (props: any) => {
  return (
    <div className="info-card">
      <div className="cause">{info.causes}</div>
      <div className="questions">
        {info.questions.map(q => (
          <div className="question">
            <span>{q.text}</span>
            <div className="expand-button">
              <img src={ExpandIcon} alt="" className="expand-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const DataView = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PostData>();
  const [error, setError] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<TimeSerieEntry[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    fetchDiscussionData(id)
      .then((data: PostData) => {
        if (!data || !data.data) {
          setError("Could not fetch data");
        }
        setData(data);
        const components = data.data?.components;
        const componentsKeys = Object.keys(data.data?.components || {})
        if (componentsKeys.length === 0) {
          setError("No components found");
          return
        }
        if (!components) {
          return;
        }
        const key = componentsKeys.find(k => components[k].alert)
        if (!key) {
          setError("No key found");
          return;
        }
        setTitle(key);
        console.log(`alert ${components[key].alert}`)
        const rawData = components[key].data;
        if (rawData) {
          setGraphData(rawData);
        }
      })
      // .then(setData)
      .then(console.log)
      .catch(err => alert('Something went wrong :(\n' + err.toString()));
    // eslint-disable-next-line
  }, []);


  return (
    <div>
      <Header title={data?.title || "Anomaly detected"} />
      <div className="title">{title}</div>
      { graphData.length > 0 ? <GraphCard data={graphData} /> : <Loading />}
      { error && (<div>{error}</div>)}
      <InfoCard />
    </div >
  )
}

export default DataView;
