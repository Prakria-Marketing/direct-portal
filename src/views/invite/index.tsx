
import { getMyInvitation } from "@/api/invite";
import InviteTable from "@/components/invite/inviteTable";
import { Card, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
function InvitePage() {
    const invitationList = useQuery({
        queryKey: ["invitation"],
        queryFn: getMyInvitation,
    })
    return (
        <Flex justifyContent={"center"} alignItems={"center"} p={"12px"}>
            <Card p={"20px"} >
                <InviteTable data={invitationList.data?.data} />
            </Card>
        </Flex>
    )
}

export default InvitePage;