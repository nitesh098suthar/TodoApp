import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; //for use dispatch functions
import { deleteProfile, getUser, login } from "../../redux/action/userAction";

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
} from "@chakra-ui/react";

const DeleteUser = ({ isAuth }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(userData.email, userData.password);
    await dispatch(deleteProfile(userData.email, userData.password));
    nav('/')
  };

  // useEffect(() => {
  //   if (!isAuth) {
  //     return nav("/");
  //   }
  // }, [nav, isAuth]);

  return (
    <>
      <Grid className="auth-parent">
        <VStack className="form-container" width={{ md: "90vw", lg: "50vw" }}>
          <Box>
            <Heading children="Delete Profile" />
          </Box>
          <FormControl className="form-itself">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              onChange={inputHandler}
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              value={userData.password}
              onChange={inputHandler}
            />
            <FormHelperText>
              Forgotten Password ? <Link to="/password/forget">Reset</Link>
            </FormHelperText>
            <Button
              className="auth-btn"
              type="submit"
              variant="solid"
              colorScheme="purple"
              children="Delete"
              onClick={submitHandler}
            />
          </FormControl>
        </VStack>
      </Grid>
    </>
  );
};

export default DeleteUser;
