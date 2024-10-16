import PricingList from "@/components/pricing/PricingList";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box } from "@chakra-ui/react";

function Pricing() {
  return (
    <WrapperLayout>
      <Box my={10}>
        <PricingList />
      </Box>
    </WrapperLayout>
  );
}

export default Pricing;
