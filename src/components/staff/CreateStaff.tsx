import { addStaff, IStaffData } from "@/api/staffs";
import { addInternalUser, fetchInternalUsers, UserInfo } from "@/api/users";
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
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
type OptionType = {
  readonly value: string | number; // The actual value that will be sent to the form or used in your logic
  readonly label: string; // The display label for the option
};

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

function CreateStaff({ isOpen, onClose }: ModalProps) {
  const { data: users, isLoading: isUserLoading } = useQuery({
    queryKey: ["internalusers"],
    queryFn: fetchInternalUsers,
  });
  const userList = users?.data;

  const toast = useToast();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<IStaffData>();

  const queryClient = useQueryClient();
  const createStaffMutation: UseMutationResult<void, Error, IStaffData> =
    useMutation({
      mutationFn: addStaff,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["stafflist"] });
      },
    });

  const CreateStaffFunc = async (data: IStaffData) => {
    try {
      await createStaffMutation.mutateAsync(data);
      toast({
        title: "Staff created successfully",
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
      <ModalContent as="form" onSubmit={handleSubmit(CreateStaffFunc)}>
        <ModalHeader bg="gray.200">Create a Staff</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!errors.userId} my="3">
            <FormLabel my={1}>User</FormLabel>
            <Select
              placeholder="Select a user"
              isDisabled={createStaffMutation.isPending}
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
            <FormErrorMessage>{errors.userId?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.experience} my="3">
            <FormLabel my={1}>Designation</FormLabel>
            <Input
              placeholder="Sr. UI Designer"
              isDisabled={createStaffMutation.isPending}
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
              isDisabled={createStaffMutation.isPending}
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
                isDisabled={createStaffMutation.isPending}
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
                isDisabled={createStaffMutation.isPending}
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
            isDisabled={createStaffMutation.isPending}
          >
            Reset
          </Button>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={createStaffMutation.isPending}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateStaff;
