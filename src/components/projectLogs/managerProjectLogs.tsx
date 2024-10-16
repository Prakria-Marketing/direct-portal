import { getAllAssignedProjects } from "@/api/project";
import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import LogCard from "./logCard";
import Loading from "../Loading";

function ManagerProjectLogs() {
  const allprojects = useQuery({
    queryKey: ["projects"],
    queryFn: getAllAssignedProjects,
  });
  if (allprojects.isLoading) return <Loading />;
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      {allprojects?.data?.data?.map((projects: any, index: number) => (
        <Link key={index} to={"/project-logs/" + projects?._id}>
          <LogCard
            type="servicing"
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

export default ManagerProjectLogs;
