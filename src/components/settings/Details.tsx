import {
  Box,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

function Details() {
  return (
    <>
      <Box mb={10}>
        <Heading as="h3" mb={1} size="xs">
          Profile details
        </Heading>
        <Text>You can change your profile details here seamlessly.</Text>
      </Box>
      <hr></hr>
      <Flex my={10} gap={5}>
        <Box width="30%">
          <Heading as="h3" mb={1} size="xs">
            Profile Picture
          </Heading>
          <Text>This is where people will see your actual face.</Text>
        </Box>
        <Image src="/images/user.png" w="70px" h="70px" rounded="100" />
        <Box width="100%">
          <FormControl
            textAlign="left"
            rounded="lg"
            bg="gray.50"
            p={10}
            border="1px solid"
            borderColor="#e2e8f0"
          >
            <Input
              textAlign="center"
              type="file"
              rounded="lg"
              p={1}
              border="0"
            />
            {/* <Text>Click here to upload your file</Text> */}
          </FormControl>
        </Box>
      </Flex>
      <hr></hr>
      <Flex my={10}>
        <Box width="30%">
          <Heading as="h3" mb={1} size="xs">
            Bio Description
          </Heading>
          <Text>This will be your main story. Keep it very, very long.</Text>
        </Box>
        <Box width="100%">
          <FormControl>
            <Textarea bg="gray.50" rounded="lg" rows={4}></Textarea>
          </FormControl>
        </Box>
      </Flex>
    </>
  );
}

export default Details;
