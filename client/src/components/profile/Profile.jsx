import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import toast from 'react-hot-toast'

const Profile = ({ isAuth }) => {
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

  const {loading, user} = useSelector((state) => state.auth);
  
  const nav = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      return nav("/");
    }
  }, [isAuth, nav]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Box>
          <VStack>
            <Heading>Name : {user?.name}</Heading>
            <Heading>Email : {user && user.email}</Heading>
            <Text>created at : {user?.createdAt}</Text>
          </VStack>

          <Box>
            <Button variant="solid" colorScheme="purple">
              <Link to={"/me/edit"}>Edit Profile</Link>
            </Button>

            <Link to="/delete">
              <Button variant="outline" colorScheme="purple">
                Delete Profile
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
