import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "@rebass/preset";
import './App.css';
import WarningIcon from './icons/warning.svg';
import LocationIcon from './icons/location.svg';
import TimeIcon from './icons/time.svg';

import { Box, Image, Heading, Text, Flex } from "rebass";
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


const Card = ({ text, time }: { text: string; time: string; }) => (
  <div className="card">
    <div className="card__location">
      <img src={LocationIcon} />
      Rotterdam
    </div>
    <div className="card__notification">
      <img src={WarningIcon} />
      <span>{text}</span>
    </div>
    <div className="card__actions">
      <div className="card__time">
        <img src={TimeIcon} />
        <span>{time}</span>
      </div>
      <div className="card__buttons">
        <div className="card__button card__button1">
          3 comments
        </div>
        <div className="card__button card__button2">
          Take action
        </div>
      </div>
    </div>
  </div>
)

const DemoPage = (props: { children: React.ReactNode }) => (
  <Wrapper>
    <Flex>
      <Box>{props.children}</Box>
    </Flex>
  </Wrapper>
);

const App = (props: any) => (
  <Wrapper>
    <div className="header">

    </div>
    <Card text="Nuclear expliosion detected in your backyard" time="18:34" />
  </Wrapper>
);

export default App;
