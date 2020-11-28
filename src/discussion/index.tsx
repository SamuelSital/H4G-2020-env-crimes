import React from "react";
import { Box, Card, Flex } from "rebass";
import styled from "styled-components";
import mockData, { CommentWithCreator } from "./mock-data";

const ThreadHeader = styled(Card)``;

const ProfilePhoto = styled.img`
  width: 40px;
`;

const Tag = styled(Box) <{ $color: string }>`
  padding: 12px;
  margin: 8px;
  background-color: ${(x) => x.$color};
`;

const photoSrc = ({ name, picture }: { name: string; picture?: string }) => picture || `https://eu.ui-avatars.com/api/?name=${name}&background=random&rounded=true`


const CommentThread = ({ comment }: { comment: CommentWithCreator }) => (
  <Flex width={1} flexDirection="column">
    <Flex width={1} flexDirection="row">
      <Box width={1 / 5}>
        <ProfilePhoto
          src={photoSrc(comment.creator)}
          alt={comment.creator.name}
        />
      </Box>
      <Box width={4 / 5}>{comment.message}</Box>
    </Flex>

    {comment.comments &&
      comment.comments.map((c) => (
        <Box width={1} ml="1em">
          <CommentThread comment={c} />
        </Box>
      ))}
  </Flex>
);

const Discussion = () => {
  return (
    <div>
      {mockData.map((post) => (
        <Flex flexDirection="column">
          <ThreadHeader>
            <Flex>
              <Box width={1 / 5}>
                <ProfilePhoto
                  src={photoSrc(post.creator)}
                  alt={post.creator.name}
                />
              </Box>
              <Box width={4 / 5}>{post.title}</Box>
            </Flex>
            <Flex justifyContent="space-between">
              <Tag $color="red">{post.anomalyType}</Tag>
              <Tag $color="yellow">{post.location.street}</Tag>
              <Tag $color="blue">{post.created.toISOString().split('T')[0]}</Tag>
            </Flex>
          </ThreadHeader>

          {post.comments.map((c) => (
            <CommentThread comment={c} />
          ))}
          {!post.comments && <p>No comments left as of yet</p>}

        </Flex>
      ))}
    </div>
  );
};

export default Discussion;
