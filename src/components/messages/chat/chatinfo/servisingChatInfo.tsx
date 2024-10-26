import {
  getCustomerProjects,
  getProjectById,
  getRequirement,
} from "@/api/project";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { useChannelStateContext } from "stream-chat-react";
import { ServiceCard, ReqCard } from "../../ServiceCard";
import { Heading } from "@chakra-ui/react";

function ServicingChatInfo() {
  const { user } = useAuth();
  const { channel } = useChannelStateContext();
  const data = channel?.data;
  const state = channel?.state;
  const members = Object.values(state?.members);
  const customer: any = members?.find(
    (member) => member.user_id !== user?.userId
  ) as string;
  const clientProjectList = useQuery({
    queryKey: ["projects", customer.user_id],
    queryFn: async () => await getCustomerProjects(customer.user_id as string),
    enabled: !!customer,
    retry: 1, // Will retry failed requests 10 times before displaying an error
  });
  const clientRequirement = useQuery({
    queryKey: ["req", customer.user_id],
    queryFn: async () => await getRequirement(customer.user_id as string),
    enabled: !!customer && data?.room_type !== "group",
    retry: 2,
  });
  const ProjectInfo = useQuery({
    queryKey: [channel.id],
    queryFn: async () => await getProjectById(data?.project_id as string),
    enabled: !!data?.project_id,
  });

  return (
    <>
      {data?.room_type === "group" ? (
        <div>
          {!!ProjectInfo?.data?.data ? (
            <ServiceCard data={ProjectInfo?.data?.data} />
          ) : (
            "No Project Found"
          )}
        </div>
      ) : (
        <div>
          {clientProjectList.data?.data?.length === 0
            ? "No Project Found"
            : clientProjectList.data?.data?.map(
                (project: any, index: number) => {
                  return <ServiceCard data={project} key={index} />;
                }
              )}
          {clientRequirement.data?.data?.length > 0 && (
            <Heading size={"sm"}>Requirements</Heading>
          )}
          {clientRequirement.data?.data?.map((req: any, index: number) => {
            return <ServiceCard data={req} key={index} />;
          })}
        </div>
      )}
    </>
  );
}

export default ServicingChatInfo;
