import { Flex, Heading, Switch, Text } from "@chakra-ui/react";

function AutoRenewal() {
  return (
    <>
      <Flex mt={10} justifyContent="space-between">
        <Heading as="h3" size="sm">
          Enable auto renew
        </Heading>
        <Switch size="lg" />
      </Flex>
      <Text mt={3}>
        With our auto-renewal subscription feature, you can enjoy uninterrupted
        access to our premium services without the need to manually renew each
        time. It’s simple, secure, and seamless.
      </Text>
    </>
  );
}

export default AutoRenewal;
