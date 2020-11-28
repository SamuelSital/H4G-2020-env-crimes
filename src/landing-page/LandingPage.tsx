import React, { useEffect, useState } from "react";
import './LandingPage.css';
import UserNotificationIcon from '../icons/user-notification.svg';
import WarningIcon from '../icons/warning.svg';
import LocationIcon from '../icons/location.svg';
import TimeIcon from '../icons/time.svg';
import MapIcon from '../icons/map.svg';
import CommentsIcon from '../icons/comments.svg';
import NotificationIcon from '../icons/notification.svg';
import AnalyticsIcon from '../icons/analytics.svg';

import { useHistory, Link } from 'react-router-dom';

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
  creatorType: 'sensor' | 'user';
}

interface EducationType {
  id: number;
  text: string;
  time: string;
}


const Card = ({ id, text, time, comments, location, creatorType }: Notification) => {
  return (
    <div className="card">
      <div className="card__notification">
        {creatorType === "sensor" ? <img alt="x" src={WarningIcon} /> : <img alt="" src={UserNotificationIcon} />}
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
          {creatorType === 'sensor' && (
            <Link to={`/posts/${id}/data`} className="card__button card__button0">
              <img src={AnalyticsIcon} alt="" />
              Details
            </Link>
          )}
          <Link to={`/posts/${id}/discuss`} className="card__button card__button1">
            <img src={CommentsIcon} alt="" />
            {comments} comments
          </Link>
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
  const history = useHistory();

  useEffect(() => {
    setItems([
      { id: 1, text: "Increase in air polution detected", time: "10 min ago", location: 'Rotterdam Nord 10KM', comments: 10, creatorType: 'sensor' },
      { id: 7, text: "Saw something suspicious", time: "15:00", location: "Rotterdam", comments: 14, creatorType: "user" },
      { id: 3, text: "Increase in air polution detected", time: "18:34", location: 'Rotterdam 2KM', comments: 3, creatorType: 'sensor' },
      { id: 4, text: "Increase in air polution detected", time: "14:29", location: 'Rotterdam 1KM', comments: 3, creatorType: 'sensor' },
      { id: 5, text: "Nuclear explosion detected in your backyard", time: "18:34", location: 'Rotterdam 2KM', comments: 3, creatorType: 'user' },
      { id: 6, text: "Nuclear explosion detected in your backyard", time: "18:34", location: 'Rotterdam 2KM', comments: 3, creatorType: 'user' },
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
      <div className="map-button" onClick={() => history.push('/map')}>
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
        <Card key={item.id} {...item} />
      ))}
    </div>
  </Wrapper>)
};

export default App;