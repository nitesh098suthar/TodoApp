import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser, getUser } from "../../redux/action/userAction";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  Box,
  VStack,
  Heading,
  HStack,
} from "@chakra-ui/react";

const EditProfile = ({ isAuth }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    email: user?.email,
    name: user?.name,
  });

  const inputHandler = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };

  const dispatch = useDispatch();
  const nav = useNavigate();

  const submitHandler =async (e) => {
    e.preventDefault();
    await dispatch(editUser(userData.name, userData.email));
    dispatch(getUser())

    nav("/me")
  };


  useEffect(() => {
    if (!isAuth) {
      return nav("/login");
    }
  }, [isAuth, nav]);

  return (
    <>
      <Grid className="auth-parent">
        <VStack className="form-container" width={{ md: "90vw", lg: "50vw" }}>
          <Box>
            <Heading children="Edit Your Profile" />
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
            <FormLabel htmlFor="name">name</FormLabel>
            <Input
              type="name"
              name="name"
              id="name"
              value={userData.name}
              onChange={inputHandler}
            />
            <HStack>
              <Button
                className="auth-btn"
                type="submit"
                variant="solid"
                colorScheme="purple"
                children="Edit"
                isLoading={loading}
                onClick={submitHandler}
              />
              <Link to="/me">
                <Button
                  variant={"outline"}
                  children="Cancel"
                  colorScheme="purple"
                />
              </Link>
            </HStack>
          </FormControl>
        </VStack>
      </Grid>
    </>
  );
};

export default EditProfile;
