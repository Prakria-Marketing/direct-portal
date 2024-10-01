import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

function EditOrganization() {
  return (
    <>
      <Stack spacing={4}>
        <Flex gap={4}>
          <FormControl width="50%">
            <FormLabel fontSize="14px">Company Type</FormLabel>
            <Input placeholder="Dheeraj Singh" type="email" />
          </FormControl>

          <FormControl width="50%">
            <FormLabel fontSize="14px">Company Address</FormLabel>
            <Input placeholder="info@prakria.com" type="email" />
          </FormControl>
          <FormControl width="50%">
            <FormLabel fontSize="14px">Company Headquarter</FormLabel>
            <Input placeholder="Front-end Developer" type="email" />
          </FormControl>
        </Flex>

        <Flex gap={4}>
          <FormControl width="50%">
            <FormLabel fontSize="14px">GST/ VAT</FormLabel>
            <Input placeholder="+91 8368100458" type="email" />
          </FormControl>
          <FormControl width="50%">
            <FormLabel fontSize="14px">Industry Type</FormLabel>
            <Input placeholder="Delhi" type="email" />
          </FormControl>

          <FormControl width="50%">
            <FormLabel fontSize="14px">Website</FormLabel>
            <Input placeholder="India" type="email" />
          </FormControl>
        </Flex>

        <Flex gap={4}>
          <FormControl width="50%">
            <FormLabel fontSize="14px">Contact Person</FormLabel>
            <Input placeholder="Delhi" type="email" />
          </FormControl>

          <FormControl width="50%">
            <FormLabel fontSize="14px">Contact Email</FormLabel>
            <Input placeholder="India" type="email" />
          </FormControl>
          <FormControl width="50%">
            <FormLabel fontSize="14px">Contact Mobile</FormLabel>
            <Input placeholder="India" type="email" />
          </FormControl>
        </Flex>
        <Box textAlign="end">
          <Button>
            <EditIcon /> Update
          </Button>
        </Box>
      </Stack>
    </>
  );
}

export default EditOrganization;
