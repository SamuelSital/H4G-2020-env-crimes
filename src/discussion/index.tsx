// import React from "react";
// import { Box, Card, Flex } from "rebass";
// import styled from "styled-components";
import mockData, { IComment, IPost } from "./mock-data";
import './header.css';
import './anomaly.css';
import './thread.css';
import './input.css';

import React from 'react';

import SendIcon from '../icons/send.svg';
import AttachmentIcon from '../icons/attachment.svg';
import PictureIcon from '../icons/picture.svg';
import DownloadIcon from '../icons/download.svg';
import BackButtonIcon from '../icons/backbutton.svg';
import ShareIcon from '../icons/share.svg';
import UserIcon from '../icons/user.svg';
import WarningIcon from '../icons/warning.svg';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

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

const Anomaly = ({ post }: { post: IPost }) => {
  return (
    <div className="anomaly">
      <div className="anom-icon">
        <img src={WarningIcon} alt="" />
      </div>
      <div className="anom-right">
        <div className="anom-description">
          {post.title}
        </div>
        <div className="anom-tags">
          {post.tags.map(tag =>
            <div key={tag} className="anom-tag">{tag}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const Thread = ({ comments }: { comments: IComment[] }) => {
  return (
    <div className="thread">
      {comments.map(comment => (
        <div>
          <div className="thread-grid">
            <div className="post-icon">
              <img src={UserIcon} alt="" />
            </div>
            {!comment.attachments ? (
              <div className="post-message">
                {comment.message}
              </div>
            ) :
              (
                <div className="post-attachment">
                  <img src={PictureIcon} alt="" />
                  {comment.attachments[0]}
                  <img className="download-icon" src={DownloadIcon} alt="" />
                </div>
              )}
          </div>

          {comment.comments && comment.comments.map(subComment => (
            <div className="thread-grid-comments">
              <div />
              <div className="post-icon">
                <img src={UserIcon} alt="" />
              </div>
              <div className="post-message">
                {subComment.message}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Input = () => {
  return (
    <div className="input-wrapper">
      <img src={AttachmentIcon} alt="" />
      <input className="input" />
      <img src={SendIcon} alt="" />
    </div>
  )
}

const Container = styled.div`
   box-sizing: border-box;
`;

const CommunityThread = () => {
  return (
    <Container>
      <Header />
      <Anomaly post={mockData[0]} />
      <Thread comments={mockData[0].comments as IComment[]} />
      <Input />
    </Container >
  );
};

export default CommunityThread;
