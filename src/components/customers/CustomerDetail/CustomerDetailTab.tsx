import { Tabs, TabList, TabPanel, TabPanels, Tab } from "@chakra-ui/react";
import CustomerPlan from "./CustomerPlan";
import CustomerProjects from "./CustomerProjects";
import CustomerRequirements from "./CustomerRequirements";
import CustomerInfo from "./CustomerInfo";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomerPlanFunc } from "@/api/customer";
import { useParams } from "react-router-dom";
import CustomerInvoice from "./CustomerInvoice";

function CustomerDetailTab() {
  const { customerId } = useParams<{ customerId: string }>();
  const {
    data: plan,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["customer-plan", customerId],
    queryFn: async (keys) => fetchCustomerPlanFunc({ _id: keys.queryKey[1] }),
    enabled: !!customerId,
  });

  const subscription = plan?.data?.subscription;
  const currentSubscription = plan?.data?.currentSubscription;
  const invoices = plan?.data?.invoice;
  const currentPlan = plan?.data?.currentPlan;

  return (
    <Tabs>
      <TabList>
        <Tab>Details</Tab>
        <Tab>Customer Plan</Tab>
        <Tab>Invoices</Tab>
        <Tab>Requirements</Tab>
        <Tab>Projects</Tab>
      </TabList>

      <TabPanels py={5}>
        <TabPanel>
          <CustomerInfo />
        </TabPanel>
        <TabPanel>
          <CustomerPlan
            subscription={subscription}
            currentSubscription={currentSubscription}
            currentPlan={currentPlan}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </TabPanel>
        <TabPanel>
          <CustomerInvoice
            invoices={invoices}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </TabPanel>
        <TabPanel>
          <CustomerRequirements customerId={customerId as string} />
        </TabPanel>
        <TabPanel>
          <CustomerProjects />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default CustomerDetailTab;
