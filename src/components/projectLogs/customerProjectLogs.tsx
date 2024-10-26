import { getCustomerProjects, ProjectBody } from "@/api/project";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import LogCard from "./logCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../search";

function CustomerProjectLogs() {
  const { user } = useAuth();
  const [filterText, setFilterText] = useState("");
  const custmerProjectsLogs = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await getCustomerProjects(user?.userId),
    enabled: !!user?.userId,
  });

  if (custmerProjectsLogs.isLoading) return <Loading />;
  const projectsList = custmerProjectsLogs?.data?.data?.map((project: any) => ({
    ...project,
  }));

  // Filtering function
  const filteredData = projectsList?.data?.filter((item: ProjectBody) => {
    return (
      item.title.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category?.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status.toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <>
      <Flex alignContent={"center"} justifyContent={"space-between"} pb="5">
        <Box>
          <Heading as="h5" size="md">
            Project Logs
          </Heading>
        </Box>
        <SearchBar filterText={filterText} setFilterText={setFilterText} />
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        {filteredData?.map((projects: ProjectBody, index: number) => (
          <Link key={index} to={"/project-logs/" + projects?._id}>
            <LogCard
              type="customer"
              border="1px"
              borderColor="gray.300"
              bg={"white"}
              projectInfo={projects as ProjectBody}
            />
          </Link>
        ))}
      </Grid>
    </>
  );
}

export default CustomerProjectLogs;
