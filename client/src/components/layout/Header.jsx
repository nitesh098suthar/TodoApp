import React, { useEffect } from "react";
import { HStack, Box, Button, Spacer, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GrTask } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/action/userAction";
import toast from "react-hot-toast";
const Header = ({ isAuth }) => {
  const dispatch = useDispatch();
  const submitHandler = () => {
    dispatch(logOut());
  };
  const { message, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) toast.error(error);
  }, [message, error, toast]);
  return (
    <>
      <HStack bgColor={"black"} height={"5rem"}>
        <Box>Logo</Box>
        <Flex>
          <ul>
            <li>
              <Link className="links" to="/">
                HOME
              </Link>
              <Link className="links" to="/aboutus">
                ABOUT US
              </Link>
              <Link className="links" to="/contactus">
                CONTACT US
              </Link>

              {isAuth ? (
                <Button onClick={submitHandler}>SIGN OUT</Button>
              ) : (
                <Link className="links" to="/signup">
                  SIGN UP
                </Link>
              )}
            </li>
          </ul>
          <Spacer />
          {isAuth && (
            <Link className="links" to="/me" display={"inline-block"}>
              <CgProfile size={30} display={"inline-block"} />
            </Link>
          )}
          {isAuth && (
            <Link className="links" to="/task" display={"inline-block"}>
              <HStack>
                <GrTask size={30} />
                <Heading size={10}>Task</Heading>
              </HStack>
            </Link>
          )}
        </Flex>
      </HStack>
    </>
  );
};

export default Header;
