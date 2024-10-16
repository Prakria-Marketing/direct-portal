import { getCustomerProjects } from "@/api/project";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import { Grid } from "@chakra-ui/react";
import LogCard from "./logCard";
import { Link } from "react-router-dom";

function CustomerProjectLogs() {
  const { user } = useAuth();

  const custmerProjectsLogs = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await getCustomerProjects(user?.userId),
    enabled: !!user?.userId,
  });
  if (custmerProjectsLogs.isLoading) return <Loading />;
  const projectsList = custmerProjectsLogs?.data?.data?.map((project: any) => ({
    ...project,
  }));
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      {projectsList?.map((projects: any, index: number) => (
        <Link key={index} to={"/project-logs/" + projects?._id}>
          <LogCard
            type="customer"
            border="1px"
            borderColor="rgba(255, 255, 255, 0.3)"
            bg={"rgba(255, 255, 255, 0.2)"}
            projectInfo={projects}
          />
        </Link>
      ))}
    </Grid>
  );
}

export default CustomerProjectLogs;
