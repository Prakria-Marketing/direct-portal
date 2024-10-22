import { IStaffData, updateStaff } from "@/api/staffs";
import { fetchInternalUsers } from "@/api/users";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import LoadingWrapper from "../global/loadingWrapper";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IStaffData | null;
}

type OptionType = {
  readonly value: string | number; // The actual value that will be sent to the form or used in your logic
  readonly label: string; // The display label for the option
};

function UpdateStaff({ isOpen, onClose, data }: ModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: users, isLoading: isUserLoading } = useQuery({
    queryKey: ["internalusers"],
    queryFn: fetchInternalUsers,
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<IStaffData>({
    defaultValues: {
      _id: data?._id || "",
      userId: data?.userId._id! as any,
      specialization: data?.specialization || [],
      designation: data?.designation || "",
      experience: data?.experience || 0,
      minTaskCapacity: data?.minTaskCapacity || 0,
      maxTaskCapacity: data?.maxTaskCapacity || 0,
    },
  });

  const userList = users?.data;
  const specializations: OptionType[] = [
    { value: "softwareDevelopment", label: "Software Development" },
    { value: "frontendDevelopment", label: "Frontend Development" },
    { value: "backendDevelopment", label: "Backend Development" },
    { value: "mobileAppDevelopment", label: "Mobile App Development" },
    { value: "uxResearch", label: "UX Research" },
    { value: "uxUiDesign", label: "UX/UI Design" },
    { value: "graphicDesign", label: "Graphic Design" },
    { value: "motionGraphics", label: "Motion Graphics" },
    { value: "brandingIdentityDesign", label: "Branding and Identity Design" },
    { value: "digitalMarketing", label: "Digital Marketing Strategy" },
    { value: "socialMediaManagement", label: "Social Media Management" },
    { value: "contentCreation", label: "Content Creation" },
    { value: "seoSpecialist", label: "SEO Specialist" },
    { value: "dataScience", label: "Data Science" },
    { value: "businessIntelligence", label: "Business Intelligence" },
    { value: "analyticsReporting", label: "Analytics and Reporting" },
    { value: "projectManagement", label: "Project Management" },
    { value: "agileScrum", label: "Agile/Scrum Methodologies" },
    { value: "videoProduction", label: "Video Production" },
    { value: "videoEditing", label: "Video Editing" },
    { value: "animation", label: "Animation" },
    { value: "3DCGI", label: "3D CGI" },
    { value: "characterAnimation", label: "Character Animation" },
    { value: "visualEffects", label: "Visual Effects" },
    { value: "webDevelopment", label: "Web Development" },
    { value: "eCommerceSolutions", label: "E-commerce Solutions" },
    { value: "cybersecurityAnalysis", label: "Cybersecurity Analysis" },
    { value: "riskAssessment", label: "Risk Assessment" },
    { value: "itSupport", label: "IT Support" },
    { value: "systemsAdministration", label: "Systems Administration" },
    { value: "cloudSolutionsArchitect", label: "Cloud Solutions Architect" },
    { value: "qualityAssuranceTesting", label: "Quality Assurance Testing" },
    { value: "creativeCopywriting", label: "Creative Copywriting" },
    { value: "customerSupport", label: "Customer Support Specialist" },
    { value: "technicalSupport", label: "Technical Support Agent" },
    { value: "customerExperience", label: "Customer Experience Manager" },
    { value: "clientRelations", label: "Client Relations Coordinator" },
    { value: "complaintResolution", label: "Complaint Resolution Specialist" },
    { value: "customerFeedback", label: "Customer Feedback Analyst" },
    { value: "accountManagement", label: "Account Management" },
    { value: "serviceDesign", label: "Service Design" },
    { value: "helpDeskSupport", label: "Help Desk Support" },
    { value: "artDirection", label: "Art Direction" },
    { value: "copywriting", label: "Copywriting" },
    { value: "socialMediaStrategy", label: "Social Media Strategy" },
    { value: "publicRelations", label: "Public Relations" },
    { value: "eventManagement", label: "Event Management" },
    { value: "photography", label: "Photography" },
    { value: "audioProduction", label: "Audio Production" },
    { value: "marketResearch", label: "Market Research" },
    { value: "userInterfaceDesign", label: "User Interface Design" },
    { value: "contentStrategy", label: "Content Strategy" },
    { value: "illustration", label: "Illustration" },
    { value: "digitalAdvertising", label: "Digital Advertising" },
    { value: "campaignManagement", label: "Campaign Management" },
    { value: "brandingStrategy", label: "Branding Strategy" },
  ];

  const updateStaffMutation = useMutation({
    mutationFn: updateStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stafflist"] });
    },
  });

  const updateFunc = async (data: IStaffData) => {
    try {
      await updateStaffMutation.mutateAsync(data);
      toast({
        title: "User updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      reset();
    } catch (err) {
      toast({
        title: (err as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } finally {
      reset({});
      onClose?.();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(updateFunc)}>
        <ModalHeader bg="gray.200">Update Staff</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!errors.userId} my="3">
            <FormLabel my={1}>User</FormLabel>
            <LoadingWrapper isLoading={isUserLoading}>
              <Select
                placeholder="Select a user"
                defaultValue={data?.userId?._id} // Set the default user ID
                isDisabled={updateStaffMutation.isPending}
                {...register("userId", {
                  required: { value: true, message: "Required" },
                })}
              >
                {userList?.map(
                  (
                    user: {
                      _id: string;
                      name: string;
                      email: string;
                      role: string;
                    },
                    index: any
                  ) => {
                    return (
                      <option key={index?.toString()} value={user?._id}>
                        {user?.name} - {user?.email} - {user?.role}
                      </option>
                    );
                  }
                )}
              </Select>
            </LoadingWrapper>
            <FormErrorMessage>{errors.userId?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.experience} my="3">
            <FormLabel my={1}>Designation</FormLabel>
            <Input
              placeholder="Sr. UI Designer"
              isDisabled={updateStaffMutation.isPending}
              {...register("designation", {
                required: { value: true, message: "Required" },
                min: "0",
                max: "100",
              })}
            />
            <FormErrorMessage>{errors.designation?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.experience} my="3">
            <FormLabel my={1}>Experience (in Years)</FormLabel>
            <Input
              placeholder="1 Year"
              type="number"
              isDisabled={updateStaffMutation.isPending}
              {...register("experience", {
                required: { value: true, message: "Required" },
                min: "0",
                max: "100",
              })}
            />
            <FormErrorMessage>{errors.experience?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.specialization} my="3">
            <FormLabel my={1}>Specialization</FormLabel>

            <Controller
              name="specialization"
              control={control}
              rules={{ required: "Please select at least one specialization" }}
              render={({ field }) => {
                return (
                  <ReactSelect
                    {...field}
                    options={specializations as any}
                    isMulti
                    isSearchable={true}
                    value={field.value}
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                    }}
                    placeholder="Select Specialization"
                  />
                );
              }}
            />

            <FormErrorMessage>
              {errors.specialization?.message}
            </FormErrorMessage>
          </FormControl>
          <HStack my={0}>
            <FormControl isInvalid={!!errors.minTaskCapacity} my="3">
              <FormLabel my={1}>Min. Task</FormLabel>
              <Input
                placeholder="1"
                type="number"
                isDisabled={updateStaffMutation.isPending}
                {...register("minTaskCapacity", {
                  required: { value: true, message: "Required" },
                  min: "0",
                  max: "100",
                })}
              />
              <FormErrorMessage>
                {errors.minTaskCapacity?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.maxTaskCapacity} my="3">
              <FormLabel my={1}>Max. Task</FormLabel>
              <Input
                placeholder="10"
                type="number"
                isDisabled={updateStaffMutation.isPending}
                {...register("maxTaskCapacity", {
                  required: { value: true, message: "Required" },
                  min: "0",
                  max: "100",
                })}
              />
              <FormErrorMessage>
                {errors.maxTaskCapacity?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="gray"
            onClick={() => {
              reset();
            }}
            mr="3"
            isDisabled={updateStaffMutation.isPending}
          >
            Reset
          </Button>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={updateStaffMutation.isPending}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateStaff;
