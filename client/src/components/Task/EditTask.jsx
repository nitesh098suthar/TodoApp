import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; //for use dispatch functions
import { getUser, login } from "../../redux/action/userAction";

import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Grid,
  Box,
  VStack,
  Heading,
  HStack,
} from "@chakra-ui/react";
import Spinner from "../layout/Spinner";
import {
  getSingleTask,
  getTask,
  updateTask,
} from "../../redux/action/taskAction";
import toast from "react-hot-toast";

const EditTask = ({ isAuth }) => {
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

  const { id } = useParams();
  const nav = useNavigate();
  const { task, loading } = useSelector((state) => state.task);

  const [userData, setUserData] = useState({
    title: task?.title,
    description: task?.description,
  });

  const inputHandler = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateTask(id, userData.title, userData.description));
    dispatch(getTask());
  };

  useEffect(() => {
    if (!isAuth) {
      return nav("/me");
    }
  }, [nav, isAuth]);

  useEffect(() => {
    dispatch(getSingleTask(id));
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Grid className="auth-parent">
        <VStack className="form-container" width={{ md: "90vw", lg: "50vw" }}>
          <Box>
            <Heading children="Edit Task" />
          </Box>
          <FormControl className="form-itself">
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              type="text"
              name="title"
              id="title"
              value={userData.title}
              onChange={inputHandler}
            />
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              type="text"
              name="description"
              id="description"
              value={userData.description}
              onChange={inputHandler}
            />
            <HStack>
              <Button
                className="auth-btn"
                type="submit"
                variant="solid"
                colorScheme="purple"
                children="Edit"
                onClick={submitHandler}
              />
              <Link to={"/task"}>
                <Button
                  className="auth-btn"
                  type="submit"
                  variant="outline"
                  colorScheme="purple"
                  children="Cancel"
                />
              </Link>
            </HStack>
          </FormControl>
        </VStack>
      </Grid>
    </>
  );
};

export default EditTask;
