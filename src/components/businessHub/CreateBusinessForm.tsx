import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  Select,
  Textarea,
} from "@chakra-ui/react";

function CreateBusinessForm() {
  return (
    <>
      <Flex mb={4}>
        <FormControl me={5}>
          <FormLabel fontSize={"sm"}>Company Name</FormLabel>
          <Input
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"sm"}>Company Type</FormLabel>
          <Select
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            placeholder="Company Type"
          >
            <option>Public Company</option>
            <option>Self Employed</option>
            <option>Government Agencies</option>
            <option>Self Employed</option>
            <option>Nonprofit</option>
            <option>Sole proprietorship</option>
            <option>Privately Held</option>
            <option>Partnership</option>
          </Select>
        </FormControl>
      </Flex>
      <FormControl mb={4}>
        <FormLabel fontSize={"sm"}>Company Address</FormLabel>
        <Textarea
          focusBorderColor="black"
          border={"1px"}
          borderColor={"darkgrey"}
          fontSize={"sm"}
          rows={2}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel fontSize={"sm"}>Company Headquarter</FormLabel>
        <Textarea
          focusBorderColor="black"
          border={"1px"}
          borderColor={"darkgrey"}
          fontSize={"sm"}
          rows={2}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel fontSize={"sm"}>GST/ VAT</FormLabel>
        <Input
          focusBorderColor="black"
          border={"1px"}
          borderColor={"darkgrey"}
          fontSize={"sm"}
          type="text"
        />
      </FormControl>
      <Flex gap={3}>
        <FormControl mb={4}>
          <FormLabel fontSize={"sm"}>Industry Type</FormLabel>
          <Select
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            placeholder="Company Type"
          >
            <option>Public Company</option>
            <option>Self Employed</option>
            <option>Government Agencies</option>
            <option>Self Employed</option>
            <option>Nonprofit</option>
            <option>Sole proprietorship</option>
            <option>Privately Held</option>
            <option>Partnership</option>
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel fontSize={"sm"}>Website (If you have)</FormLabel>
          <Input
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            type="text"
          />
        </FormControl>
      </Flex>
      <Flex gap={3} mt={2} mb={4}>
        <FormControl>
          <FormLabel fontSize={"sm"}>Contact Person</FormLabel>
          <Input
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"sm"}>Contact Email</FormLabel>
          <Input
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            type="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"sm"}>Contact Mobile</FormLabel>
          <Input
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            type="tel"
          />
        </FormControl>
      </Flex>
      <FormControl>
        <FormLabel fontSize={"xs"} fontWeight={300} my={10}>
          <Checkbox type="checkbox" me={3} />I consent and understand that my
          information will be handled in accordance with Designzo and that i
          have rights to access and correct my data anytime.
        </FormLabel>
      </FormControl>
      <Button mb={15} w="100%" colorScheme="green" variant="solid">
        Submit
      </Button>
    </>
  );
}

export default CreateBusinessForm;
