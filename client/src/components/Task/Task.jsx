import React, { useState, useEffect } from "react";
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
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getTask } from "../../redux/action/taskAction";

const Task = () => {
  const inputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
const {isAuthenticated, loading} = useSelector(state=>state.auth);
const dispatch = useDispatch();
const {loading:taskLoading, tasks} = useSelector(state=> state.task)
const [userData, setUserData] = useState({
    title: "",
    description: "",
  });
// navigate
  const nav = useNavigate();

  useEffect(() => {
    if (loading !== undefined && !isAuthenticated) {
      return nav("/login");
    }
  }, [isAuthenticated, nav]);

  const submitHandler =async (e) => {
    e.preventDefault();
    await dispatch(createTask(userData.title, userData.description));
    dispatch(getTask());
  };

  useEffect(()=>{
    dispatch(getTask());
  },[])

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
            onClick={submitHandler}
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
