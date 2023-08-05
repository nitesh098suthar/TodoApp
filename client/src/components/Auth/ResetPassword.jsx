import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { resetPassword } from "../../redux/action/userAction";
import toast from "react-hot-toast";

const ResetPassword = ({ isAuth }) => {
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

  const { token } = useParams();
  console.log(token);
  const nav = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return alert("Both passwords must match");
    }

    dispatch(resetPassword(token, newPassword));
  };

  useEffect(() => {
    if (isAuth) return nav("/me");
  }, [isAuth, nav]);

  return (
    <>
      <Grid className="auth-parent">
        <VStack className="form-container" width={{ md: "90vw", lg: "50vw" }}>
          <Box>
            <Heading children="Reset Password" />
          </Box>
          <FormControl className="form-itself">
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />

            <FormLabel>Confirm new password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />

            <Button
              className="auth-btn"
              type="submit"
              variant="solid"
              bgColor="black"
              color="white"
              children="Reset Password"
              onClick={submitHandler}
            />
          </FormControl>
        </VStack>
      </Grid>
    </>
  );
};

export default ResetPassword;
