import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

function Security() {
  return (
    <Box w="50%" border="1px solid #e8e8e8" rounded="lg" m="auto" p={5}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel fontSize="14px">Old Password</FormLabel>
          <Input placeholder="**********" type="email" />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="14px">Enter New Pasword</FormLabel>
          <Input placeholder="**********" type="email" />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="14px">Re-enter New Password</FormLabel>
          <Input placeholder="**********" type="email" />
        </FormControl>

        <Flex textAlign="end" align="center" justifyContent="space-between">
          <Text color="blue">Forgot Password</Text>
          <Button>
            <EditIcon /> Update
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}

export default Security;
