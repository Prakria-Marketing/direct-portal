import { getCustomerProjects, getRequirement } from '@/api/project';
import { useAuth } from '@/hooks/auth';
import { useQuery } from '@tanstack/react-query';
import { useChannelStateContext } from 'stream-chat-react';
import ServiceCard from '../../ServiceCard';
import { Heading } from '@chakra-ui/react';

function ServicingChatInfo() {
    const { user } = useAuth();
    const { channel } = useChannelStateContext();
    const data = channel?.data;
    const state = channel?.state;
    const members = Object.values(state?.members);
    const customer: any = members?.find((member) => member.user_id !== user?.userId) as string;
    // console.log("members=", customer.user_id)
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

export default ServicingChatInfo;