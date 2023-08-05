import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <Box display="grid" placeItems="center center" height="100vh">
      <Heading size={["lg", "2xl", "4xl"]}>Welcome to the TODO App</Heading>
    </Box>
  );
};

export default Home;
