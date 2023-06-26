import React from 'react'
import {Button, Alert, AlertIcon, AlertTitle, AlertDescription, Modal, ModalOverlay, ModalCloseButton,ModalContent,ModalBody, useDisclosure, Icon } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'

const AlertModal = ({isOpen,status,content}) => {
  const [open,setOpen] = React.useState(true)
  return (
    <>
    <Modal isOpen={isOpen && open}  size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Alert
        status={status}
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'  
        height='200px'
      >
  <AlertIcon boxSize='40px' mr={0} />
  <AlertTitle mt={4} mb={1} fontSize='lg'>
    {status === 'success' ? 'Success' : 'Error'}
  </AlertTitle>
    <ModalCloseButton onClick={() => setOpen(false)} />
  <AlertDescription maxWidth='sm'>
  {content}
  </AlertDescription>
</Alert>
</ModalBody>
</ModalContent>
</Modal>
    </>
  )
}

export default AlertModal