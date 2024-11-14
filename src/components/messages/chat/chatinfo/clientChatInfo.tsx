import { geMytRequirement, getMyProjects, getProjectById } from "@/api/project";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard, ReqCard } from "../../ServiceCard";
import { Heading } from "@chakra-ui/react";
import { useChannelStateContext } from "stream-chat-react";
function ClientChatInfo() {
  const { channel } = useChannelStateContext();
  const data = channel.data;

  const clientProjectList = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await getMyProjects(),
  });
  const clientRequirement = useQuery({
    queryKey: ["req"],
    queryFn: async () => await geMytRequirement(),
    retry: 2,
    enabled: data?.room_type !== "group",
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
                  return <ServiceCard data={project} key={index?.toString()} />;
                }
              )}
          {clientRequirement.data?.data?.length > 0 && (
            <Heading size={"sm"} mt="3">Requirements</Heading>
          )}
          {clientRequirement.data?.data?.map((req: any, index: number) => {
            return <ReqCard data={req} key={index?.toString()} />;
          })}
        </div>
      )}
    </>
  );
}

export default ClientChatInfo;
