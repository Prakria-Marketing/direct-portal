import React from "react";
import WrapperLayout from "@/layouts/wrapperLayout";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  GridItem,
} from "@chakra-ui/react";

function Account() {
  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" bg="#fff">
        <GridItem w="100%" py="4" pe="4">
          <Image src="/images/team.png" w="2xl" />
        </GridItem>
        <GridItem w="100%" bg="blackAlpha.50">
          <WrapperLayout>
            <Box my={10}>
              <Heading as="h5" size="md">
                My Account
              </Heading>
            </Box>
            <Box mt={10} bg="#fff" p={10}>
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
            </Box>
          </WrapperLayout>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Account;
