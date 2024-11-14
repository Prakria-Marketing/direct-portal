import Account from "@/components/settings/Account";
import Details from "@/components/settings/Details";
import EditOrganization from "@/components/settings/EditOrganization";
import Security from "@/components/settings/Security";
import { useAuth } from "@/hooks/auth";
import WrapperLayout from "@/layouts/wrapperLayout";
import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

function Settings() {
  const { provider } = useAuth();
  console.log("user ", provider)
  const isCredentialLogin = provider === "password"
  return (
    <WrapperLayout>
      <Flex my={10}>
        <Box w="30%">
          <Heading as="h5" size="md">
            Settings
          </Heading>
        </Box>

        <Box w="100%" bg="#fff" rounded="lg" p={5}>
          <Tabs>
            <TabList>
              <Tab>Details</Tab>
              <Tab>Account</Tab>
              {isCredentialLogin &&
                <Tab>Security</Tab>
              }
              <Tab>Edit Organization</Tab>
            </TabList>

            <TabPanels py={5}>
              <TabPanel>
                <Details />
              </TabPanel>
              <TabPanel>
                <Account />
              </TabPanel>
              {
                isCredentialLogin &&
                <TabPanel>
                  <Security />
                </TabPanel>
              }
              <TabPanel>
                <EditOrganization />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </WrapperLayout>
  );
}

export default Settings;
