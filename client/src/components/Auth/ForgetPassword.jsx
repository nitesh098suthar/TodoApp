import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {FaPaperPlane} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../redux/action/userAction";
import {useDispatch, useSelector} from 'react-redux'
import toast from 'react-hot-toast'

const ForgetPassword = ({isAuth}) => {
  const dispatch = useDispatch();
  const {message , error} = useSelector(state=> state.auth)
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

  const nav = useNavigate();

  const [email, setEmail] = useState("");

  const submitHandler = (e) =>{
    e.preventDefault();

    dispatch(forgetPassword(email))
  }

  useEffect(()=>
  {

    if(isAuth)
    {
      return nav("/me")
    }

  }, [isAuth, nav])


  return (
    <>
      <Grid className="auth-parent">
        <VStack className="form-container" width={{ md: "90vw", lg: "50vw" }}>
          <Box>
            <Heading children="Forget Password" />
          </Box>
          <FormControl className="form-itself">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <FormHelperText>
              A Reset Link will be Sent to Your E-mail Address
            </FormHelperText>
            <Button
              className="auth-btn"
              type="submit"
              variant="solid"
              colorScheme={"purple"}
              children="Send Mail"
              onClick={submitHandler}
              rightIcon={<FaPaperPlane />}
            />
          </FormControl>
        </VStack>
      </Grid>
    </>
  );
};

export default ForgetPassword;
