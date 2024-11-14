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
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
            <option value="agriculture">Agriculture</option>
            <option value="construction">Construction</option>
            <option value="education">Education</option>
            <option value="finance_insurance">Finance and Insurance</option>
            <option value="healthcare">Healthcare</option>
            <option value="hospitality_tourism">Hospitality and Tourism</option>
            <option value="information_technology">
              Information Technology
            </option>
            <option value="manufacturing">Manufacturing</option>
            <option value="retail">Retail</option>
            <option value="real_estate">Real Estate</option>
            <option value="transportation_logistics">
              Transportation and Logistics
            </option>
            <option value="arts_entertainment">Arts and Entertainment</option>
            <option value="professional_services">Professional Services</option>
            <option value="nonprofit">Nonprofit</option>
            <option value="telecommunications">Telecommunications</option>
            <option value="energy_utilities">Energy and Utilities</option>
            <option value="food_beverage">Food and Beverage</option>
            <option value="automotive">Automotive</option>
            <option value="aerospace_defense">Aerospace and Defense</option>
            <option value="pharmaceuticals">Pharmaceuticals</option>
            <option value="chemicals">Chemicals</option>
            <option value="ecommerce">E-commerce</option>
            <option value="media_publishing">Media and Publishing</option>
            <option value="sports_recreation">Sports and Recreation</option>
            <option value="personal_services">Personal Services</option>
            <option value="consulting">Consulting</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="environmental_services">
              Environmental Services
            </option>
            <option value="biotechnology">Biotechnology</option>
            <option value="fashion_apparel">Fashion and Apparel</option>
            <option value="logistics">Logistics</option>
            <option value="social_media">Social Media</option>
            <option value="travel">Travel</option>
            <option value="gaming">Gaming</option>
            <option value="mining">Mining</option>
            <option value="construction_materials">
              Construction Materials
            </option>
            <option value="marine">Marine</option>
            <option value="public_sector">Public Sector</option>
            <option value="philanthropy">Philanthropy</option>
            <option value="internet_services">Internet Services</option>
            <option value="home_improvement">Home Improvement</option>
            <option value="health_and_wellness">Health and Wellness</option>
            <option value="data_analysis">Data Analysis</option>
            <option value="artificial_intelligence">
              Artificial Intelligence
            </option>
            <option value="apparel_manufacturing">Apparel Manufacturing</option>
            <option value="craft_beverages">Craft Beverages</option>
            <option value="smart_home">Smart Home</option>
            <option value="real_estate_investment">
              Real Estate Investment
            </option>
            <option value="digital_marketing">Digital Marketing</option>
            <option value="telehealth">Telehealth</option>
            <option value="supply_chain">Supply Chain Management</option>
            <option value="other">Other</option>
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
