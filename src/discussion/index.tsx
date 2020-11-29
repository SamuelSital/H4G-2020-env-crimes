// import React from "react";
// import { Box, Card, Flex } from "rebass";
// import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from "styled-components";
import AttachmentIcon from '../icons/attachment.svg';
import BackButtonIcon from '../icons/backbutton.svg';
import DownloadIcon from '../icons/download.svg';
import PictureIcon from '../icons/picture.svg';
import SendIcon from '../icons/send.svg';
import ShareIcon from '../icons/share.svg';
import UserIcon from '../icons/user.svg';
import WarningIcon from '../icons/warning.svg';
import './anomaly.css';
import { fetchDiscussionData } from "./api-adapter";
import './header.css';
import './input.css';
import { CommentWithCreator, IPost, PostData } from "./mock-data";
import './thread.css';
import { Flex, Box } from 'rebass';



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

const Comment = ({ comment }: { comment: CommentWithCreator }) => {
  return (<>
    <div className="thread-grid">
      <div className="post-icon">
        <img src={comment.creator.icon || UserIcon} alt="" width={36} />
      </div>
      {!comment.attachments ? (
        <div className="post-message">
          <Flex>
            <Box className="post-username" width={1/2}>{comment.creator.name}</Box>
            <Box className="post-date" width={1/2}>{comment.created}</Box>
          </Flex>
          <Box width={1} mt={2}>{comment.text}</Box>
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
    {comment.comments?.map(subComment => (
      <div className="subcomments" key={subComment.text + subComment.creatorId}>
        <Comment comment={subComment} />
      </div>
    ))}
  </>)
}

const Thread = ({ comments }: { comments: CommentWithCreator[] }) => {
  return (
    <div className="thread">
      {comments.map((comment, i) => (
        <Comment key={`comment-${i}`} comment={comment} />
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
        <Thread comments={data.comments} />
      </>
        : error
          ? <pre>Something went wrong :( <br /> {error.toString() || { unknown: true }}</pre>
          : <p>Loading...</p>}
      <Input />
    </Container >
  );
};

export default CommunityThread;
