import React, {useState, useEffect } from "react";
import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  Heading,
  Button,
} from "@chakra-ui/react";
import Empty from "../components/Empty";
import SavedHomes from "../components/SavedHomes/SavedHomes";
import ManageInvestments from "../components/ManageInvestments/ManageInvestments";
import ManageLisitings from "../components/ManageListings/ManageLisitings";
import AccountSettings from "../components/AccountSettings/AccountSettings";
import RecentlyViewed from "../components/RecentlyViewed/RecentlyViewed";
import { Link } from "react-router-dom";
import { useListingsAction } from "../actions/listingsActions";
import { useRecoilValue } from "recoil";
import { authAtom } from "../state/auth";

function Dashboard() {
  const listingAction = useListingsAction();
  const [savedListings, setSavedListings] = useState([]);
  const data = null
  const {id} = useRecoilValue(authAtom);


  useEffect(() => {
    const fetchListings = async (id) => {
      try {
        const res = await listingAction.loadSavedListings({userId:id});
        setSavedListings(prev => [...prev,res]);
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
        >
          Welcome John
        </Heading>
        <Flex p="10pt" justify={"center"}>
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
                {savedListings ? <SavedHomes data={savedListings} /> : <Empty />}
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
