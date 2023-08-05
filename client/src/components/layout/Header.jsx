import React from "react"
import {HStack, Box} from "@chakra-ui/react"
import {Link} from "react-router-dom"
const Header = () => {

    return (
        <>
            <HStack bgColor={"black"} height={'5rem'}>
                    <Box>
                        Logo
                    </Box>
                    <Box>
                        <ul>
                            <li>
                                <Link className="links" to="/">HOME</Link>
                                <Link className="links" to="/aboutus">ABOUT US</Link>
                                <Link className="links" to="/contactus">CONTACT US</Link>
                                <Link className="links" to="/signup">SIGN UP</Link>
                            </li>
                        </ul>
                    </Box>
                    
            </HStack>        
        </>
    )

}

export default Header;