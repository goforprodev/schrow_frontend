import { Button, Flex, FormLabel, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useUserAction from '../../../actions/userActions';
import { authAtom } from '../../../state/auth';
import { settingsModalAtom } from '../../../state/settingsModal';
import { userAtom } from '../../../state/user';


const ProfileSettings = () => {
    const _user = useRecoilValue(userAtom)
    const _authUser = useRecoilValue(authAtom)
    const [user,setUser] = useState({
        names: _user?.names,
        email: _user?.email
    }) 
    const [loading,setLoading] = useState(false)
    const userAction = useUserAction();
    const navigate = useNavigate();
    const setSettingsModal = useSetRecoilState(settingsModalAtom)

    const handleSubmit = async (e) => {
      e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post("/api/users.php",{
                endpoint:"update-profile",
                email: user.email,
                name: user.names,
                id: _user?.id
                })
           if(!response.data.error){
              if(user.email !== _authUser?.email){
                setLoading(false)
                userAction.logout(navigate)
              }     
           }
            setLoading(false)
           setSettingsModal(prev => ({...prev, isOpen: false}))
        } catch (error) {
           setLoading(false)
              console.log(error) 
        }
    };
    const handleChange = (e) => {
        setUser(prev => ({...prev, [e.target.name]: e.target.value}))
    };

    
 return (
    <>
    <form onSubmit={handleSubmit}>
            <Flex direction={"column"} pb={"10pt"} color={"gray.700"}>
              <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                Full name
              </FormLabel>
              <Input
                name="names"
                type="text"
                placeholder="John Doe"
                mb={2}
                required
                onChange={handleChange}
                fontSize={"10pt"}
                borderColor="#888"
                _placeholder={{
                  color: "gray.500",
                }}
                _hover={{
                  bg: "white",
                  border: "1px solid",
                  borderColor: "#000",
                }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "#000",
                }}
                bg={"gray.50"}
                value={user?.names}
              />
            </Flex>
            <Flex direction={"column"} pb={"10pt"} color={"gray.700"}>
              <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                Email
              </FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="name@email.com"
                mb={2}
                required
                onChange={handleChange}
                fontSize={"10pt"}
                borderColor="#888"
                _placeholder={{
                  color: "gray.500",
                }}
                _hover={{
                  bg: "white",
                  border: "1px solid",
                  borderColor: "#000",
                }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "#000",
                }}
                bg={"gray.50"}
                value={user?.email}
              />
              <Text fontSize={"8pt"} color={"gray.500"}>If you change your email you would have to sign in again</Text>
            </Flex>
         <Button variant={"solid"} mr={3} type='submit' isLoading={loading}>
              Save
            </Button>
            </form>
    </>
  )
}

export default ProfileSettings