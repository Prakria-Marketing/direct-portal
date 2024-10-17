import { geMytRequirement, getMyProjects } from '@/api/project';
import { useQuery } from '@tanstack/react-query';
import ServiceCard from '../../ServiceCard';
import { Heading } from '@chakra-ui/react';
import { useChannelStateContext } from 'stream-chat-react';
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
        enabled: data?.room_type !== "group"
    });

    return (
        <div>
            {clientProjectList.data?.data?.map(
                (project: any, index: number) => {
                    return <ServiceCard data={project} key={index} />;
                }
            )}
            {clientRequirement.data?.data?.length > 0 &&
                <Heading size={"sm"}>
                    Requiremen's
                </Heading>
            }
            {clientRequirement.data?.data?.map(
                (req: any, index: number) => {
                    return <ServiceCard data={req} key={index} />;
                }
            )}
        </div>
    )
}

export default ClientChatInfo;