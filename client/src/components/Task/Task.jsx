import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Grid,
    Box,
    Heading,
    Text
  } from "@chakra-ui/react";
  


const Task = () => {
  const inputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [userData, setUserData] = useState({
    title: "",
    description: "",
  });

  return (
    <>
      <Box>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={userData.title}
            onChange={inputHandler}
          />
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={userData.description}
            onChange={inputHandler}
          />
          <Button
            type="submit"
            bgColor="black"
            color="white"
            variant="solid"
            padding={"1rem 2rem"}
          >
            Add Task
          </Button>
        </FormControl>
      </Box>

      <Box>
        <Box padding="2rem" bgColor="yellow">
          <Heading size="1rem">water is falling from the sky</Heading>
          <Text size="0.5rem">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
            totam officia ipsa similique consectetur, incidunt sapiente optio
            deleniti aut illum.
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Task;
