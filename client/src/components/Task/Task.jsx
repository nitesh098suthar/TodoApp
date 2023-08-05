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
  Spinner,
  Flex,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTask, deleteTask, getTask } from "../../redux/action/taskAction";
import { FaTrash, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

const Task = () => {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [message, error]);

  const inputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const { loading: taskLoading, tasks } = useSelector((state) => state.task);
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

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createTask(userData.title, userData.description));
    dispatch(getTask());
    setUserData({ title: "", description: "" });
  };

  useEffect(() => {
    dispatch(getTask());
  }, []);

  const deleteHandler = async (id) => {
    await dispatch(deleteTask(id));
    dispatch(getTask());
  };

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
        {taskLoading ? (
          <Spinner />
        ) : (
          tasks?.map((task) => (
            <Flex
              padding="2rem"
              m="2rem"
              borderRadius=".5rem"
              bgColor="purple.100"
              key={task._id}
            >
              <Box>
                <Heading size="1rem">{task.title}</Heading>
                <Text size="0.5rem">{task.description}</Text>
              </Box>
              <Spacer />
              <HStack>
                <Link to={"/task/edit/" + task._id}>
                  <FaEdit />
                </Link>
                <Button onClick={() => deleteHandler(task._id)}>
                  <FaTrash />
                </Button>
              </HStack>
            </Flex>
          ))
        )}
      </Box>
    </>
  );
};

export default Task;
