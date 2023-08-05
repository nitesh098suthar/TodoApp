import React from 'react'
import {Box, Grid, Spinner} from '@chakra-ui/react'
const NotFound = () => {
  return (
    <>
     <Grid placeItems="center" height="100vh" width={'100%'}>
        <Box>
            <Spinner/>
        </Box>
    </Grid> 
    </>
  )
}

export default NotFound
