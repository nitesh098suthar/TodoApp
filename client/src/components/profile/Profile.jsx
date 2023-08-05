import { Box, Heading, Text, Button, Spacer, VStack, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Profile = ({isAuth}) => {

  const {user, loading} = useSelector(state=>state.auth)

  const nav = useNavigate();

  useEffect(()=>{
    if(!isAuth){
          return nav("/")
    }
  }, [isAuth, nav])

  return (
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
            <Button variant="outline" colorScheme="purple">
              Delete Profile
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
