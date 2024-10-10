import {
  createOrgnization,
  IOrgnization,
  updateOrgnization,
} from "@/api/orgnization";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  // Radio,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const required = { required: { value: true, message: "required" } };
type BusinessFormType = {
  type?: "create" | "update";
  defaultValues?: IOrgnization;
};
function CreateBusinessForm({
  type = "create",
  defaultValues,
}: BusinessFormType) {
  const isUpdate = type === "update";

  const queryClient = useQueryClient();
  console.log(defaultValues);
  const { mutate, isPending } = useMutation({
    mutationFn: createOrgnization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orgnization"] });
    },
  });
  const { mutate: updateOrgnizationMutation, isPending: isUpdating } =
    useMutation({
      mutationFn: updateOrgnization,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orgnization"] });
      },
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrgnization>({
    defaultValues: type === "update" ? defaultValues : undefined,
  });
  // console.log(errors)
  const onSubmit = async (data: IOrgnization) => {
    if (type === "update") {
      delete (data as any).owner;
      updateOrgnizationMutation({
        orgId: (defaultValues as any)?._id,
        body: data,
      });
    } else {
      mutate(data);
    }
  };

  return (
    <Box border="1px solid #e8e8e8" rounded="lg" m="auto" p={5} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Flex mb={4} gap={5}>
        <FormControl isInvalid={!!errors.companyName}>
          <FormLabel fontSize={"sm"}>Company Name</FormLabel>
          <Input
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            type="text"
            {...register("companyName", required)}
          />
          <FormErrorMessage>{errors?.companyName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.companyType}>
          <FormLabel fontSize={"sm"}>Company Type</FormLabel>
          <Select
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            placeholder="Company Type"
            {...register("companyType", required)}
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
          <FormErrorMessage>{errors?.companyType?.message}</FormErrorMessage>
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
          {...register("companyAddress")}
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
          {...register("companyHeadquaters")}
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
          {...register("GST")}
        />
      </FormControl>
      <Flex gap={3}>
        <FormControl mb={4} isInvalid={!!errors.industry}>
          <FormLabel fontSize={"sm"}>Industry Type</FormLabel>
          <Select
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            placeholder="---Select---"
            {...register("industry", required)}
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
          <FormErrorMessage>{errors.industry?.message}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap={5} mt={2} mb={4}>
        <FormControl isInvalid={!!errors.contactPerson}>
          <FormLabel fontSize={"sm"}>Contact Person</FormLabel>
          <Input
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            type="text"
            {...register("contactPerson", required)}
          />
          <FormErrorMessage>{errors.contactPerson?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.contactEmail}>
          <FormLabel fontSize={"sm"}>Contact Email</FormLabel>
          <Input
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            type="email"
            {...register("contactEmail", required)}
          />
          <FormErrorMessage>{errors.contactEmail?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.contactMobile}>
          <FormLabel fontSize={"sm"}>Contact Mobile</FormLabel>
          <Input
            focusBorderColor="black"
            border={"1px"}
            borderColor={"darkgrey"}
            fontSize={"sm"}
            type="tel"
            {...register("contactMobile", required)}
          />
          <FormErrorMessage>{errors.contactMobile?.message}</FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl display={isUpdate ? "none" : "block"}>
        <FormLabel fontSize={"xs"} fontWeight={300} my={10}>
          <Checkbox
            type="checkbox"
            me={3}
            {...register("check", { required: !isUpdate })}
          />
          I consent and understand that my information will be handled in
          accordance with Designzo and that i have rights to access and correct
          my data anytime.
        </FormLabel>
      </FormControl>
      <Flex textAlign="end" align="center" justifyContent="end">
        <Button
          mb={15}
          colorScheme="teal"
          variant="solid"
          type="submit"
          gap={2}
          isLoading={isPending || isUpdating}
        >
          <EditIcon />
          {isUpdate ? "Update" : "Submit"}
          {/* Submit */}
        </Button>
      </Flex>
    </Box>
  );
}

export default CreateBusinessForm;
