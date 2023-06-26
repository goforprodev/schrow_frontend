import React,{useRef} from 'react'
import { settingsModalAtom } from '../../../state/settingsModal'
import { useRecoilState } from 'recoil'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import ProfileSettings from './ProfileSettings'

const UserSettingsModal = () => {
    const [settingsModal, setSettingsModal] = useRecoilState(settingsModalAtom)
    const handleClose = () => {
        setSettingsModal(prev => ({...prev, isOpen:false}))
    }
    const initialRef = useRef()
    const finalRef = useRef()

  return (
    <>
    <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={settingsModal.isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{
            settingsModal.type === "profile" ? "Update your profile" : "Account Settings"
            }</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {settingsModal.type === "profile" ? <ProfileSettings /> : null}
          </ModalBody> 
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserSettingsModal