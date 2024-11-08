import { Box, Heading, Text } from "@chakra-ui/react";

function MembershipRequired({ status }: { status: string }) {
  return (
    <Box>
      <Heading>No Membership found</Heading>
      <Text>Status is {status}. Your have no membership </Text>
    </Box>
  );
}

export default MembershipRequired;
