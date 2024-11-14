import { getMyTask } from "@/api/task";
import { useQuery } from "@tanstack/react-query";
import { useChannelStateContext } from "stream-chat-react";
import { getChatUser } from "../components/utils/getChatUser";
import { useAuth } from "@/hooks/auth";
import { TaskCard } from "../../ServiceCard";
function TaskLogsChatInfo() {
  const { user } = useAuth();
  const { channel } = useChannelStateContext();
  const data = channel.data;

  const chatuser = getChatUser(user, channel.state);

  const taskList = useQuery({
    queryKey: [chatuser.user_id],
    queryFn: async (qk) => getMyTask(qk.queryKey?.[0]),
    enabled: !!chatuser,
  });
  return (
    <>
      {data?.room_type === "group" ? null : (
        <div>
          {taskList?.data?.data?.map((task: any, index: number) => (
            <TaskCard key={index?.toString()} data={task} />
          ))}
        </div>
      )}
    </>
  );
}

export default TaskLogsChatInfo;
