import React, { useState } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Textarea,
  Select,
  Badge,
  Wrap,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrgnizationByUserId } from "@/api/orgnization";
import { useChannelStateContext } from "stream-chat-react";
import { createProject } from "@/api/project";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Form1 = () => {
  const { isLoading } = useProjectType();
  const [assignments, setAssignments] = useState<string[]>([]);
  const availableUsers = ["User 1", "User 2", "User 3", "User 4"]; // Replace with actual user list

  if (isLoading) return <>Loading...</>;

  const toggleAssignment = (user: string) => {
    setAssignments((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    );
  };

  return (
    <>
      <Flex gap={5}>
        <FormControl>
          <FormLabel htmlFor="projectName" fontWeight={"normal"}>
            Project Name
          </FormLabel>
          <Input
            type="text"
            id="projectName"
            focusBorderColor="brand.400"
            shadow="sm"
            w="full"
            rounded="md"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="taskTitle" fontWeight={"normal"}>
            Task Title
          </FormLabel>
          <Input
            type="text"
            id="taskTitle"
            focusBorderColor="brand.400"
            shadow="sm"
            w="full"
            rounded="md"
          />
        </FormControl>
      </Flex>
      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="description"
          fontWeight="md"
          color="gray.700"
          mt="2%"
        >
          Task Description
        </FormLabel>
        <Textarea
          id="description"
          focusBorderColor="brand.400"
          shadow="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
      <Flex gap={5} mt="2%">
        <FormControl>
          <FormLabel htmlFor="assignmentTo" fontWeight={"normal"}>
            Assignment To
          </FormLabel>
          <Menu>
            <MenuButton bg="transparent" fontWeight={400} fontSize="sm" border="1px solid #e2e8f0" w="100%" textAlign="start" as={Button} rightIcon={<ChevronDownIcon />}>
              {assignments.length > 0
                ? assignments.join(", ")
                : "Choose options"}
            </MenuButton>
            <MenuList>
              {availableUsers.map((user) => (
                <MenuItem
                  key={user}
                  onClick={() => toggleAssignment(user)}
                  bg={assignments.includes(user) ? "teal.100" : undefined}
                >
                  {user}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Wrap mt={2}>
            {assignments.map((assignment) => (
              <Badge key={assignment} colorScheme="teal" borderRadius="full">
                {assignment}
              </Badge>
            ))}
          </Wrap>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="priority" fontWeight={"normal"}>
            Priority
          </FormLabel>
          <Select fontSize="sm" placeholder="Choose option">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormControl>
      </Flex>
      <Flex mt="2%" gap={5}>
        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            htmlFor="start"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
          >
            Deadline
          </FormLabel>
          <Input
            type="datetime-local"
            id="start"
            focusBorderColor="brand.400"
            shadow="sm"
            // size="sm"
            w="full"
            rounded="md"
          />
        </FormControl>
      </Flex>
      
    </>
  );
};

export default function CreateTaskForm({ onClose }: { onClose: () => void }) {
  return (
    <>
      <Box rounded="lg" maxWidth={800} py={4} as="form">
        <Form1 />

        <ButtonGroup mt="4%" w="100%">
          <Flex w="100%" justifyContent="end">
            <Button w="7rem" colorScheme="teal" variant="solid" type="submit">
              Submit
            </Button>
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}

function useProjectType() {
  const { channel } = useChannelStateContext();
  const organizationQuery = useQuery({
    queryKey: [channel.id],
    queryFn: async () => await getOrgnizationByUserId(channel.id!),
    enabled: !!channel?.id,
  });

  return {
    userId: channel.id,
    orgId: organizationQuery?.data?.data?._id,
    isLoading: organizationQuery.isLoading,
  };
}
