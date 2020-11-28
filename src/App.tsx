import React from "react";
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";

import { Box, Card, Image, Heading, Text } from "rebass";

const DemoComponent = ({ image, title, description }: any) => (
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

const App = (props: any) => (
  <ThemeProvider theme={theme}>
    {/* {props.children} */}
    <DemoComponent title="Hello world" description=":D" />
  </ThemeProvider>
);

export default App;
