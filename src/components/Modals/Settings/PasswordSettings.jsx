import React,{useState} from 'react'
import { Button, Flex, FormLabel, Input, Text } from '@chakra-ui/react'
import axios from 'axios'
import { authAtom } from '../../../state/auth'
import { useRecoilValue,useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { settingsModalAtom } from '../../../state/settingsModal'
import useUserAction from '../../../actions/userActions'


const PasswordSettings = () => { 
    const _user = useRecoilValue(authAtom)
    const [loading,setLoading] = useState(false)
    const  [_password,setPassword] = useState({
        old_password: "",
        new_password: ""
    })
    const navigate = useNavigate()
    const setSettingsModal = useSetRecoilState(settingsModalAtom)
    const userAction = useUserAction()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
           const response = await axios.post("/api/users.php",{
                endpoint:"change-password", 
                old_password: _password.old_password,
                password: _password.new_password,
                id: _user?.id
                })
            if(!response.data.error){
                setLoading(false)
                setSettingsModal(prev => ({...prev, isOpen: false}))
                userAction.logout(navigate)
            }else{
                throw new Error(response.data.data.msg)
            }
        } catch (error) {
           setLoading(false)
            alert(error) 
        }
    }
    const handleChange = (e) => {
        setPassword(prev => ({...prev, [e.target.name]: e.target.value}))
    }


  return (
<form onSubmit={handleSubmit}>
            <Flex direction={"column"} pb={"10pt"} color={"gray.700"}>
              <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
              Old password
              </FormLabel>
              <Input
                name="old_password"
                type="text"
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
              />
            </Flex>
            <Flex direction={"column"} pb={"10pt"} color={"gray.700"}>
              <FormLabel fontSize={"10pt"} fontWeight={"medium"}>
                New password
              </FormLabel>
              <Input
                name="new_password"
                type="text"
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
              />
              <Text fontSize={"8pt"} color={"gray.500"}>Your old password must match with your recent password</Text>
            </Flex>
            <Button variant={"solid"} mr={3} type='submit' isLoading={loading}>
              Save
            </Button>
    </form>
  )
}

export default PasswordSettings