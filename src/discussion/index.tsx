// import React from "react";
// import { Box, Card, Flex } from "rebass";
// import styled from "styled-components";
import { IComment, IPost, PostData } from "./mock-data";
import './header.css';
import './anomaly.css';
import './thread.css';
import './input.css';

import React, { useEffect, useState } from 'react';

import SendIcon from '../icons/send.svg';
import AttachmentIcon from '../icons/attachment.svg';
import PictureIcon from '../icons/picture.svg';
import DownloadIcon from '../icons/download.svg';
import BackButtonIcon from '../icons/backbutton.svg';
import ShareIcon from '../icons/share.svg';
import UserIcon from '../icons/user.svg';
import WarningIcon from '../icons/warning.svg';
import { useHistory, useParams } from 'react-router-dom';
import styled from "styled-components";
import { fetchDiscussionData } from "./api-adapter";

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
          {post.tags?.map(tag =>
            <div key={tag} className="anom-tag">{tag}</div>
          )}
        </div>
        {post.imageUrl && <a href={post.imageUrl} target="_blank" rel="noopener noreferrer">
          <img src={post.imageUrl} alt={post.title} height="100" />
        </a>}
      </div>
    </div>
  );
};

const Thread = ({ comments }: { comments: IComment[] }) => {
  return (
    <div className="thread">
      {comments.map((comment, i) => (
        <div key={`comment-${i}`}>
          <div className="thread-grid">
            <div className="post-icon">
              <img src={UserIcon} alt="" />
            </div>
            {!comment.attachments ? (
              <div className="post-message">
                {comment.text}
              </div>
            ) :
              (
                <div className="post-attachment">
                  {comment.attachments.map(url =>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {['jpg', 'jpeg', 'png'].some(ext => url.endsWith(ext)) ?
                        <img src={url} alt={url} height="100" />
                        : <><img src={PictureIcon} alt="" />
                          {url}
                          <img className="download-icon" src={DownloadIcon} alt="" />
                        </>
                      }
                    </a>
                  )}
                </div>
              )
            }
          </div>

          {/* TODO: Nested comments.. I had that working at some poing?! */}
          {comment.comments && comment.comments.map(subComment => (
            <div className="thread-grid-comments" key={subComment.text}>
              <div />
              <div className="post-icon">
                <img src={UserIcon} alt="" />
              </div>
              <div className="post-message">
                {subComment.text}
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
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<PostData>();
  const [error, setError] = useState<Error>();
  useEffect(() => {
    fetchDiscussionData(id)
      .then(setData)
      .catch(setError);
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Header />
      {data ? <>
        <Anomaly post={data} />
        <Thread comments={data.comments as IComment[]} />
      </>
        : error
          ? <pre>Something went wrong :( <br /> {error.toString() || { unknown: true }}</pre>
          : <p>Loading...</p>}
      <Input />
    </Container >
  );
};

export default CommunityThread;
