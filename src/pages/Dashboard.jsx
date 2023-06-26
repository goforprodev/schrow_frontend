import {
  Button,
  Flex,
  Heading,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useListingsAction } from "../actions/listingsActions";
import AccountSettings from "../components/AccountSettings/AccountSettings";
import Empty from "../components/Empty";
import ManageInvestments from "../components/ManageInvestments/ManageInvestments";
import ManageLisitings from "../components/ManageListings/ManageLisitings";
import RecentlyViewed from "../components/RecentlyViewed/RecentlyViewed";
import SavedHomes from "../components/SavedHomes/SavedHomes";
import { authAtom } from "../state/auth";
import { userAtom } from "../state/user";
import capitalize from "../utils/capitalize";

function Dashboard() {
  const listingAction = useListingsAction();
  const [savedListings, setSavedListings] = useState([]);
  const data = null;
  const { name, id } = useRecoilValue(authAtom);
  const user = useRecoilValue(userAtom)

  useEffect(() => {
    const fetchListings = async (id) => {
      try {
        const res = await listingAction.loadSavedListings({ userId: id });
        setSavedListings(() => res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings(id);
  }, []);

 
  return (
    <>
      <Flex py={"10pt"} direction={"column"} w={"80vw"} mx={"auto"}>
        <Heading
          as={"h1"}
          fontFamily={"heading"}
          fontSize={"25pt"}
          py={"10pt"}
          textAlign={{ base: "center", sm: "left" }}
          fontWeight={"extrabold"}
        >
          Welcome {capitalize(user?.names)}
        </Heading>
        <Flex p="10pt" justify={"left"}>
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab>Saved Homes</Tab>
              <Tab>Manage Listings</Tab>
              <Tab>Manage Investments</Tab>
              <Tab>Account Settings</Tab>
              <Tab>Recently Viewed</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                {savedListings?.length ? (
                  <SavedHomes data={savedListings} setSavedListings={setSavedListings} />
                ) : (
                  <Empty />
                )}
              </TabPanel>
              <TabPanel>
                {data ? (
                  <ManageLisitings data={data} />
                ) : (
                  <Flex direction={"column"}>
                    <Empty />
                    <Button alignSelf={"center"} variant={"outline"}>
                      <Link to={"/add"}>Add new listing </Link>
                    </Button>
                  </Flex>
                )}
              </TabPanel>
              <TabPanel>
                {data ? <ManageInvestments data={data} /> : <Empty />}
              </TabPanel>
              <TabPanel>
                <AccountSettings data={data} />
              </TabPanel>
              <TabPanel>
                {data ? <RecentlyViewed data={data} /> : <Empty />}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
}

export default Dashboard;
