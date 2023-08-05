import React, { useEffect, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { getUser, signup } from "../../redux/action/userAction";
import toast from "react-hot-toast";

const SignUP = ({ isAuth }) => {
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

  const [nameData, setNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(signup(nameData, emailData, passwordData));
    dispatch(getUser());
  };
  const nav = useNavigate();
  useEffect(() => {
    if (isAuth) {
      return nav("/me");
    }
  }, [nav, isAuth]);
  return (
    <Grid className="auth-parent">
      <VStack className="form-container" width={{ md: "90vw", lg: "50vw" }}>
        <Box>
          <Heading children="Register Yourself" />
        </Box>
        <FormControl className="form-itself">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={nameData}
            onChange={(e) => setNameData(e.target.value)}
          />
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={emailData}
            onChange={(e) => setEmailData(e.target.value)}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={passwordData}
            onChange={(e) => setPasswordData(e.target.value)}
          />
          <Button
            className="auth-btn"
            type="submit"
            variant="solid"
            colorScheme="purple"
            children="Register"
            onClick={submitHandler}
          />
          <FormHelperText>
            Already Have an Account? <Link to="/login">Login</Link>
          </FormHelperText>
        </FormControl>
      </VStack>
    </Grid>
  );
};

export default SignUP;
