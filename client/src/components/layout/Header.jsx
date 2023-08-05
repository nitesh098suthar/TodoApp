import React from "react";
import { HStack, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/action/userAction";
const Header = ({ isAuth }) => {
  const dispatch = useDispatch();
  const submitHandler = () => {
    dispatch(logOut());
  };
  return (
    <>
      <HStack bgColor={"black"} height={"5rem"}>
        <Box>Logo</Box>
        <Box>
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
                <>
                  <Button onClick={submitHandler}>SIGN OUT</Button>
                  <Link className="links" to="/me" display={"inline-block"}>
                    <CgProfile display={"inline-block"} />
                  </Link>
                </>
              ) : (
                <Link className="links" to="/signup">
                  SIGN UP
                </Link>
              )}
            </li>
          </ul>
        </Box>
      </HStack>
    </>
  );
};

export default Header;
