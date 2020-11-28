// import React from "react";
// import { Box, Card, Flex } from "rebass";
// import styled from "styled-components";
// import mockData, { CommentWithCreator } from "./mock-data";
import './header.css';
import './anomaly.css';
import BackButtonIcon from '../icons/backbutton.svg';
import ShareIcon from '../icons/share.svg';
import WarningIcon from '../icons/warning.svg';
import { useHistory } from 'react-router-dom';
import React from 'react';

// const photoSrc = ({ name, picture }: { name: string; picture?: string }) => picture || `https://eu.ui-avatars.com/api/?name=${name}&background=random`

const Header = () => {
  const history = useHistory();

  return (
    <div className="header">
      <img onClick={() => history.goBack()} src={BackButtonIcon} alt="" />
      <span className="header__title">Community Thread</span>
      <div className="c-share-button">
        <img src={ShareIcon} alt="" />
      </div>
    </div>
  );
};

const Anomaly = () => {
  return (
    <div className="anomaly">
      <div className="anom-icon">
        <img src={WarningIcon} alt="" />
      </div>
      <div className="anom-right">
        <div className="anom-description">
          Anomaly in Rijksweg
        </div>
        <div className="anom-tags">
          <div className="anom-tag">tag1</div>
          <div className="anom-tag">tag2</div>
        </div>
      </div>
    </div>
  );
};

const Thread = () => {
  return (
    <div className="thread">
      <div className="thread-grid">
        <div className="post-icon">

        </div>
        <div className="post-message">

        </div>
      </div>
    </div>
  );
};

const CommunityThread = () => {
  return (
    <div className="container">
      <Header />
      <Anomaly />
      <Thread />
    </div>
  );
};

export default CommunityThread;
