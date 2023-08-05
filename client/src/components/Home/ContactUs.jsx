import React, {useState} from 'react'

const ContactUs = () => {

  const inputHandler = (e) => {

    setUserData({...userData, [e.target.name] : e.target.value});

  }

  const [userData , setUserData] = useState({
    email: "",
    subject: "",
    feedback: ""
  })

  return (

    <Box>
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input type="email" name="email" onChange={inputHandler} value={userData.email}/>

      <FormLabel>Subject</FormLabel>
      <Input type="text" name="subject" onChange={inputHandler} value={userData.subject}/>

      <FormLabel>Feedback</FormLabel>
      <Textarea type="text" name="feedback" onChange={inputHandler} value={userData.feedback}></Textarea>
      <br />

      <Button
        type="submit"
        bgColor="black"
        color="white"
        variant="solid"
        padding={"1rem 2rem"}
      >
        Send Mail
      </Button>
    </FormControl>
  </Box>
  
  )
}

export default ContactUs
