import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "@rebass/preset";

import { Box, Card, Image, Heading, Text, Flex } from "rebass";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 8px;
`;

const DemoComponent = ({
  image,
  title,
  description,
}: {
  image?: string;
  title: string;
  description: string;
}) => (
  <Box width={256}>
    <Card
      sx={{
        p: 1,
        borderRadius: 2,
        boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
      }}
    >
      <Image src={image} />
      <Box px={2}>
        <Heading as="h3">{title}</Heading>
        <Text fontSize={0}>{description}</Text>
      </Box>
    </Card>
  </Box>
);

const DemoPage = (props: { children: React.ReactNode }) => (
  <Wrapper>
    <Flex>
      <Box>{props.children}</Box>
    </Flex>
  </Wrapper>
);

const App = (props: any) => (
  <ThemeProvider theme={theme}>
    {/* {props.children} */}
    <DemoPage>
      <DemoComponent title="Hello world" description=":D" />
    </DemoPage>
  </ThemeProvider>
);

export default App;
