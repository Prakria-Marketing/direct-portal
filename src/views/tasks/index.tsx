import TaskList from "@/components/tasks/TaskList";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box } from "@chakra-ui/react";

function Tasks() {
  return (
    <WrapperLayout>
      <Box my={10}>
        <TaskList />
      </Box>
    </WrapperLayout>
  );
}

export default Tasks;
