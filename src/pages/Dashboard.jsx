import {
  Flex,
  Heading,
  Icon,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import { GrFormView } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { useRecoilValue } from "recoil";
import AccountSettings from "../components/AccountSettings/AccountSettings";
import Empty from "../components/Empty";
import ManageInvestments from "../components/ManageInvestments/ManageInvestments";
import ManageLisitings from "../components/ManageListings/ManageLisitings";
import RecentlyViewed from "../components/RecentlyViewed/RecentlyViewed";
import SavedHomes from "../components/SavedHomes/SavedHomes";
import { authAtom } from "../state/auth";
import capitalize from "../utils/capitalize";

function Dashboard() {
  const data = null;
  const { name } = useRecoilValue(authAtom);

  // display only first name
  const displayName = name?.split(" ")[0] + " " + (name.split(" ")[1] || "");

  return (
    <>
      <Flex py={"10pt"} direction={"column"} w={"90vw"} mx={"auto"}>
        <Heading
          as={"h1"}
          fontFamily={"heading"}
          fontSize={"25pt"}
          p={"10pt"}
          textAlign={{ base: "center", sm: "left" }}
          fontWeight={"extrabold"}
          bgGradient="linear(to-br, #7928CA, #FF0080)"
          bgClip="text"
        >
          Welcome {capitalize(displayName)} 🎉
        </Heading>
        <Flex p="10pt" justify={"left"}>
          <Tabs position="relative" variant="unstyled" py={"5pt"}>
            <TabList overflowX={{ base: "scroll", sm: "unset" }}>
              <Tab>
                <Icon as={IoSettingsOutline} fontSize={"14pt"} mr={"5pt"} />
                Account Settings
              </Tab>
              <Tab>
                <Icon
                  as={MdOutlineManageAccounts}
                  fontSize={"14pt"}
                  mr={"5pt"}
                />
                Manage Listings
              </Tab>
              <Tab>
                <Icon
                  as={MdOutlineAccountBalanceWallet}
                  fontSize={"14pt"}
                  mr={"5pt"}
                />
                Manage Investments
              </Tab>
              <Tab>
                <Icon as={BiHomeAlt} fontSize={"14pt"} mr={"5pt"} />
                Saved Homes
              </Tab>
              <Tab>
                <Icon as={GrFormView} fontSize={"14pt"} mr={"5pt"} />
                Recently Viewed
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
            <TabPanels py={"10pt"} height={"50vh"}>
              <TabPanel>
                <AccountSettings data={data} />
              </TabPanel>
              <TabPanel>
                <ManageLisitings data={data} />
              </TabPanel>
              <TabPanel>
                {data ? (
                  <ManageInvestments data={data} />
                ) : (
                  <Empty text={"No Investments made"} />
                )}
              </TabPanel>
              <TabPanel>
                <SavedHomes />
              </TabPanel>
              <TabPanel>
                <RecentlyViewed />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
}

export default Dashboard;
