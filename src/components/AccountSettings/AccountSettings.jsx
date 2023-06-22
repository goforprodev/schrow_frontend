import React from "react";
import {
  Stack,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
} from "@chakra-ui/react";

function AccountSettings() {
  const settings = [
    {
      name: "Profile",
      desc: "Personalize your account & update your sign in preferences.",
    },
    {
      name: "Documentation",
      desc: "View your legal documents, status and provide documents for verification.",
    },
    {
      name: "Projects",
      desc: "View your projects, homes, and investments with their progress.",
    },
  ];

  return (
    <>
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
