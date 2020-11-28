import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import styled from "styled-components";
import { fetchPostOverview } from "../discussion/api-adapter";
import { PostData } from "../discussion/mock-data";
import ErrorBoundary from "../ErrorBoundary";
import ActionIcon from '../icons/action.svg';
import AnalyticsIcon from '../icons/analytics.svg';
import CommentsIcon from '../icons/comments.svg';
import LocationIcon from '../icons/location.svg';
import MapIcon from '../icons/map.svg';
import NotificationIcon from '../icons/notification.svg';
import TimeIcon from '../icons/time.svg';
import WarningIcon from '../icons/warning.svg';
import './LandingPage.css';
import SignalNewCrimeButton from './SignalNewCrime';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
`;

interface EducationType {
  id: number;
  text: string;
  time: string;
}

const Card = ({ id, title, created, comments, location, creatorType }: PostData) => {
  return (
    <div className="card">
      <div className="card__notification">
        <img alt="x" src={WarningIcon} />
        <span>{title}</span>
      </div>
      <div className="card__info">
        <div className="pill">
          <img alt="" src={LocationIcon} />
          {location.street}, {location.city}
        </div>
        <div className="pill">
          <img alt="" src={TimeIcon} />
          <span>{created}</span>
        </div>
      </div>
      <div className="card__actions">
        <div className="card__buttons">
          {creatorType === 'sensor' && (
            <Link to={`/posts/${id}/data`} className="card__button card__button0">
              <img src={AnalyticsIcon} alt="" />
              Sensor Analytics
            </Link>
          )}
          <Link to={`/posts/${id}/discuss`} className="card__button card__button1">
            <img src={CommentsIcon} alt="" />
            {comments.length} comments
          </Link>
          <div className="card__button card__button2" onClick={() => window.prompt('What seems to be the problem?')}>
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

const Posts = (props: any) => {
  const [items, setItems] = useState<PostData[]>([])
  const [eductionItems, setEducationItems] = useState<EducationType[]>([])
  const history = useHistory();

  const [error, setError] = useState<Error>();
  useEffect(() => {
    fetchPostOverview()
    .then(setItems)
    .catch(setError);
  }, []);

  useEffect(() => {
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
      {items.length ? items.map(item => (
        <ErrorBoundary key={item.id}><Card {...item} /></ErrorBoundary>
      ))
        : error
          ? <pre>Something went wrong :( <br /> {error.toString() || { unknown: true }}</pre>
          : <p>Loading...</p>
      }
    </div>
  </Wrapper>)
};

export default Posts;