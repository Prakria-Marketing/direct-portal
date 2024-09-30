import {Flex, FormControl, FormLabel, Input, Stack, } from "@chakra-ui/react"

function Account() {
  return (
    <>
      <Stack spacing={4}>
        <Flex gap={4}>
          <FormControl width="50%">
            <FormLabel fontSize="14px">Name</FormLabel>
            <Input placeholder="Dheeraj Singh" type="email" />
          </FormControl>

          <FormControl width="50%">
            <FormLabel fontSize="14px">Email</FormLabel>
            <Input placeholder="info@prakria.com" type="email" />
          </FormControl>
        </Flex>

        <Flex gap={4}>
          <FormControl width="50%">
            <FormLabel fontSize="14px">Role</FormLabel>
            <Input placeholder="Front-end Developer" type="email" />
          </FormControl>

          <FormControl width="50%">
            <FormLabel fontSize="14px">Contact</FormLabel>
            <Input placeholder="+91 8368100458" type="email" />
          </FormControl>
        </Flex>

        <Flex gap={4}>
          <FormControl width="50%">
            <FormLabel fontSize="14px">State</FormLabel>
            <Input placeholder="Delhi" type="email" />
          </FormControl>

          <FormControl width="50%">
            <FormLabel fontSize="14px">Country</FormLabel>
            <Input placeholder="India" type="email" />
          </FormControl>
        </Flex>
      </Stack>
    </>
  );
}

export default Account;
