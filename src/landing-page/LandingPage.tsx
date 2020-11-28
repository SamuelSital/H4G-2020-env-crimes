import React, { useEffect, useState } from "react";
import './LandingPage.css';
import WarningIcon from '../icons/warning.svg';
import LocationIcon from '../icons/location.svg';
import TimeIcon from '../icons/time.svg';
import MapIcon from '../icons/map.svg';
import CommentsIcon from '../icons/comments.svg';
import ActionIcon from '../icons/action.svg';
import NotificationIcon from '../icons/notification.svg';
import { useHistory } from 'react-router-dom';

import SignalNewCrimeButton from './SignalNewCrime';

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
`;

interface Notification {
  id: number;
  text: string;
  time: string;
  comments: number;
  location: string;
}

interface EducationType {
  id: number;
  text: string;
  time: string;
}


const Card = ({ text, time, comments, location }: Notification) => {
  const history = useHistory();

  return (
    <div onClick={() => history.push('/anomaly/test')} className="card">
      <div className="card__notification">
        <img alt="x" src={WarningIcon} />
        <span>{text}</span>
      </div>
      <div className="card__info">
        <div className="pill">
          <img alt="" src={LocationIcon} />
          {location}
        </div>
        <div className="pill">
          <img alt="" src={TimeIcon} />
          <span>{time}</span>
        </div>
      </div>
      <div className="card__actions">
        <div className="card__buttons">
          <div className="card__button card__button1">
            <img src={CommentsIcon} alt="" />
            {comments} comments
        </div>
          <div className="card__button card__button2">
            <img src={ActionIcon} alt="" />
          Take action
        </div>
        </div>
      </div>
    </div>
  )
};

const Education = ({ text, time }: EducationType) => (
  <div className="h-card">
    <div className="h-card__text">{text}</div>
    <div className="h-card__time">{time}</div>
  </div>
);

const App = (props: any) => {
  const [items, setItems] = useState<Notification[]>([])
  const [eductionItems, setEducationItems] = useState<EducationType[]>([])

  useEffect(() => {
    setItems([
      { id: 1, text: "Increase in air polution detected", time: "10 min ago", location: 'Rotterdam Nord 10KM', comments: 10, },
      { id: 2, text: "Nuclear explosion detected in your backyard", time: "18:34", location: 'Rotterdam 2KM', comments: 3, },
      { id: 3, text: "Nuclear explosion detected in your backyard", time: "18:34", location: 'Rotterdam 2KM', comments: 3, },
      { id: 4, text: "Nuclear explosion detected in your backyard", time: "18:34", location: 'Rotterdam 2KM', comments: 3, },
      { id: 5, text: "Nuclear explosion detected in your backyard", time: "18:34", location: 'Rotterdam 2KM', comments: 3, },
      { id: 6, text: "Nuclear explosion detected in your backyard", time: "18:34", location: 'Rotterdam 2KM', comments: 3, },
    ]);

    setEducationItems([
      { id: 1, text: "5 tips to become a nija in investigation", time: "4 hours ago", },
      { id: 2, text: "3 biggest pollutors and their consequences", time: "5 hours ago", },
      { id: 3, text: "3 biggest pollutors and their consequences", time: "5 hours ago", },
      { id: 4, text: "3 biggest pollutors and their consequences", time: "5 hours ago", },
      { id: 5, text: "3 biggest pollutors and their consequences", time: "5 hours ago", },
      { id: 6, text: "3 biggest pollutors and their consequences", time: "5 hours ago", },
    ])
  }, []);

  return (<Wrapper>
    <SignalNewCrimeButton />
    <div className="gradient-overlay" />
    <div className="header header1">
      <span className="title">You are brilliant!</span>
    </div>

    <div>
      <div className="scrolling-wrapper">
        {eductionItems.map(educationItem => (
          <Education key={educationItem.id} id={educationItem.id} text={educationItem.text} time={educationItem.time} />
        ))}
      </div>
    </div>

    <div className="header">
      <span className="title">Last alerts</span>
      <div className="map-button">
        <img src={MapIcon} alt="" />
        <span>Map</span>
      </div>
      <div className="map-button">
        <img src={NotificationIcon} alt="" />
        <span>Get notified</span>
      </div>
    </div>

    <div className="notifications-wrapper">
      {items.map(item => (
        <Card key={item.id} id={item.id} text={item.text} time={item.time} location={item.location} comments={item.comments} />
      ))}
    </div>
  </Wrapper>)
};

export default App;