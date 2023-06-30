import React from "react";
import {
  Stack,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { settingsModalAtom } from "../../state/settingsModal";
import UserSettingsModal from "../Modals/Settings/UserSettingsModal";

function AccountSettings() {
  const setSettingsModal = useSetRecoilState(settingsModalAtom);
  const settings = [
    {
      name: "Profile",
      desc: "Personalize your account & update your sign in preferences.",
      onClick: () => {
        setSettingsModal({ isOpen: true, type: "profile" });
      },
    },
    {
      name: "Projects",
      desc: "View your projects, homes, and investments with their progress.",
      onClick: () => {},
    },
  ];

  return (
    <>
      <UserSettingsModal />
      <Stack spacing="4">
        {[...settings].map((setting) => (
          <Card
            key={setting.name}
            variant={"outline"}
            size="xs"
            cursor="pointer"
            p="10pt"
            _hover={{
              transition: "all .5s ease",
              boxShadow: "2px 2px 5px rgba(0,0,0,.2)",
            }}
            as={"button"}
            textAlign={"left"}
            onClick={setting.onClick}
          >
            <CardHeader>
              <Heading size="sm" py="3pt">
                {setting.name}
              </Heading>
            </CardHeader>
            <CardBody fontSize={"10pt"}>
              <Text>{setting.desc}</Text>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </>
  );
}

export default AccountSettings;
