import { BellIcon } from "@chakra-ui/icons";
import {
  Flex,
  Avatar,
  Icon,
  Text,
  IconButton,
  MenuDivider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import useUserAction from "../actions/userActions";
import { authAtom } from "../state/auth";
import { useRecoilState } from "recoil";

function AvatarIcon() {
  const user = useRecoilState(authAtom);

  return (
    <>
      <Avatar name={user[0]?.name || "John Doe"} size={"sm"} />
    </>
  );
}

function RightContent() {
  const userAction = useUserAction();
  const navigate = useNavigate();

  return (
    <>
      <Flex align={"center"} gap={"15pt"}>
        <Link to={"/add"}>
          <Text
            textDecoration={"underline"}
            fontSize={"10pt"}
            display={{ base: "none", md: "block" }}
          >
            {" "}
            Add a listing
          </Text>
        </Link>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<AvatarIcon />}
            variant="outline"
          />
          <MenuList fontSize={"10pt"} px={"2pt"}>
            <MenuItem command="⌘T">
              <Text>John Doe</Text>
              <Text fontWeight="bold">name@email.com</Text>
            </MenuItem>
            <MenuDivider />
            <Link to="/dashboard">
              <MenuItem command="⌘D">Dashboard</MenuItem>
            </Link>
            <MenuItem command="⌘⇧S">Switch to seller</MenuItem>
            <Link to={"/add"}>
              <MenuItem command="⌘⇧A" display={{ md: "none" }}>
                Add Listing
              </MenuItem>
            </Link>
            <MenuItem command="⌘S" onClick={() => userAction.logout(navigate)}>
              Sign Out
            </MenuItem>
            <Button w={"100%"} my={"5pt"}>
              <Link to="/message">Leave a message</Link>
            </Button>
          </MenuList>
        </Menu>
        {/* <BellIcon boxSize={8} /> */}
      </Flex>
    </>
  );
}

export default RightContent;
