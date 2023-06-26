import { useToast } from '@chakra-ui/react'

const AlertModal = ({title,msg,stats,duration=3000}) => {
  const toast = useToast()
  
      toast({
                title: {title},
                description: {msg},
                duration: {duration},
                status: {stats},
                isClosable: true,
                })
  

    return null
}

export default AlertModal