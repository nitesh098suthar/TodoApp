import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Input,
  Button,
  Grid,
  Box,
} from "@chakra-ui/react";
import { changePassword } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({isAuth}) => {

  const dispatch = useDispatch();
  const nav = useNavigate();


  const [userData, setUserData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const inputHandler = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };

  const submitHandler= (e) => { 
    e.preventDefault();
    dispatch(changePassword(userData.currentPassword, userData.newPassword))
  }
useEffect(()=>{
  if(!isAuth)
  {
    return nav("/")
  }
}, [isAuth, nav])
  return (
    <>
      <Grid className="auth-parent">
        <VStack className="form-container" width={{ md: "90vw", lg: "50vw" }}>
          <Box>
            <Heading children="Change Password" />
          </Box>
          <FormControl className="form-itself">
            <FormLabel>Current Password</FormLabel>
            <Input
              name="currentPassword"
              onChange={inputHandler}
              value={userData.currentPassword}
              placeholder="currentPassword"
              type="password"
            />
            <br />
            <FormLabel>New Password</FormLabel>
            <Input
              name="newPassword"
              onChange={inputHandler}
              value={userData.newPassword}
              type="password"
            />
            <br />
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              onChange={inputHandler}
              value={userData.confirmPassword}
            />
            <Button
              className="auth-btn"
              type="submit"
              variant="solid"
              colorScheme="purple"
              children="Change Password"
              onClick={submitHandler}
            />
          </FormControl>
        </VStack>
      </Grid>
    </>
  );
};

export default ChangePassword;
