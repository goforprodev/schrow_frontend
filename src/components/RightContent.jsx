import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import useUserAction from "../actions/userActions";
import { authAtom } from "../state/auth";
import { userAtom } from "../state/user";

function AvatarIcon() {
  const authUser = useRecoilState(authAtom);
  const userAction = useUserAction();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const loadUserById = async (authUser, userAction) => {
      try {
        await userAction.getUserById({ id: authUser[0]?.id });
      } catch (error) {
        console.log(error.message);
      }
    };
    loadUserById(authUser, userAction);
  }, []);

  return (
    <>
      <Avatar
        name={user?.names || "John Doe"}
        size={"sm"}
        fontWeight={"bold"}
      />
    </>
  );
}

function RightContent({ setOpen }) {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const userAction = useUserAction();

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
            bg={"transparent"}
            _hover={{
              bg: "gray.100",
            }}
            // variant="outline"
          />
          <MenuList fontSize={"10pt"} px={"2pt"}>
            <MenuItem command="⌘T">
              <Text>{user?.names || "John Doe"}</Text>
              <Text fontWeight="bold">{user?.email || "name@email.com"}</Text>
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
            <Button
              w={"100%"}
              my={"5pt"}
              display={{ base: "block", sm: "none" }}
              onClick={() => setOpen(true)}
            >
              {/* <Link to="/message">Leave a message</Link> */}
              Leave a message
            </Button>
          </MenuList>
        </Menu>
        {/* <BellIcon boxSize={8} /> */}
      </Flex>
    </>
  );
}

export default RightContent;
