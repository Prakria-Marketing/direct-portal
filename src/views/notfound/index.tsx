import { Box, Button, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Redirect to the home page or any other route
  };

  return (
    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   justifyContent="center"
    //   alignItems="center"
    //   textAlign="center"

    //   bg="gray.100"

    // >
    //   <Image
    //     src="/images/404.png"
    //     alt="404 Not Found"
    //     w="600px"
    //     mb={5}
    //   />
    //   <Heading as="h1" size="2xl" mb={3}>
    //     404 - Page Not Found
    //   </Heading>
    //   <Text fontSize="xl" mb={6}>
    //     Oops! The page you're looking for doesn't exist.
    //   </Text>
    //   <Button mb={6} onClick={handleGoBack} colorScheme="teal" size="lg">
    //     Go Back to Home
    //   </Button>
    // </Box>

    <Flex
      direction={["column", "row"]}
      justify="center"
      align="center"
      height="90vh"
      bg="gray.100"
    >
      {/* Left side: Image */}
      <Box
      bg="#fff"
        flex="1"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src="/images/404.png"
          alt="404 Not Found"
          w="600px"
        />
      </Box>

      {/* Right side: Text */}
      <Box
        flex="1"
        p={[6, 10]}
        textAlign={["center"]}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading as="h1" fontSize="100px" mb={3}>
          404
        </Heading>
        <Heading as="h1" size="2xl" mb={3}>
         Page Not Found
        </Heading>
        <Text fontSize="xl" mb={6}>
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Button
          onClick={handleGoBack}
          colorScheme="teal"
          size="md"
          alignSelf={["center"]}
        >
          Go Back to Home
        </Button>
      </Box>
    </Flex>
  );
};

export default NotFoundPage;
