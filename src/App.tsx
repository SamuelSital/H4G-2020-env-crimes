import React, { useEffect, useState } from "react";
import './App.css';
import WarningIcon from './icons/warning.svg';
import LocationIcon from './icons/location.svg';
import TimeIcon from './icons/time.svg';
import MapIcon from './icons/map.svg';
import CommentsIcon from './icons/comments.svg';
import ActionIcon from './icons/action.svg';

import styled from "styled-components";

const Wrapper = styled.div`
`;

// const DemoComponent = ({
//   image,
//   title,
//   description,
// }: {
//   image?: string;
//   title: string;
//   description: string;
// }) => (
//   <Box width={256}>
//     <Card
//       sx={{
//         p: 1,
//         borderRadius: 2,
//         boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
//       }}
//     >
//       <Image src={image} />
//       <Box px={2}>
//         <Heading as="h3">{title}</Heading>
//         <Text fontSize={0}>{description}</Text>
//       </Box>
//     </Card>
//   </Box>
// );

interface Notification {
  text: string;
  time: string;
  comments: number;
  location: string;
}


const Card = ({ text, time, comments, location }: Notification) => (
  <div className="card">
    <div className="card__notification">
      <img alt="x" src={WarningIcon} />
      <span>{text}</span>
    </div>
    <div className="card__info">
      <div className="pill">
        <img alt="x" src={LocationIcon} />
        Rotterdam - 10 KM
      </div>
      <div className="pill">
        <img alt="x" src={TimeIcon} />
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

// const DemoPage = (props: { children: React.ReactNode }) => (
//   <Wrapper>
//     <Flex>
//       <Box>{props.children}</Box>
//     </Flex>
//   </Wrapper>
// );

interface Education {
  text: string;
  time: string;
}



const Education = ({ text, time }: Education) => (
  <div className="h-card">
    <div className="scw-overlay" />
    <div className="h-card__text">{text}</div>
    <div className="h-card__time">{time}</div>
  </div>
);

const App = (props: any) => {
  const [items, setItems] = useState<Notification[]>([])
  const [eductionItems, setEducationItems] = useState<Education[]>([])

  useEffect(() => {
    setItems([
      {
        text: "Increase in air polution detected",
        time: "10 min ago",
        location: 'Rotterdam Nord 10KM',
        comments: 10,
      },
      {
        text: "Nuclear explosion detected in your backyard",
        time: "18:34",
        location: 'Rotterdam 2KM',
        comments: 3,
      },
    ]);

    setEducationItems([
      {
        text: "5 tips to become a nija in investigation",
        time: "4 hours ago",
      },
      {
        text: "3 biggest pollutors and their consequences",
        time: "5 hours ago",
      },
      {
        text: "3 biggest pollutors and their consequences",
        time: "5 hours ago",
      },
      {
        text: "3 biggest pollutors and their consequences",
        time: "5 hours ago",
      },
      {
        text: "3 biggest pollutors and their consequences",
        time: "5 hours ago",
      },
      {
        text: "3 biggest pollutors and their consequences",
        time: "5 hours ago",
      },
    ])
  }, []);

  return (<Wrapper>
    <div className="header">
      <span className="title">You are brilliant!</span>
    </div>

    <div className="scrolling-wrapper">
      {eductionItems.map(educationItem => (
        <Education text={educationItem.text} time={educationItem.time} />
      ))}
    </div>
    {/* ik kan niet pushen naar main :( */}

    <div className="header">
      <span className="title">Last alerts</span>
      <div className="map-button">
        <img src={MapIcon} alt="" />
        <span>Go on the map</span>
      </div>
    </div>

    {items.map(item => (
      <Card text={item.text} time={item.time} location={item.location} comments={item.comments} />
    ))}
  </Wrapper>)
};

export default App;
