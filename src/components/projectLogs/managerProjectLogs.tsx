import { getAllAssignedProjects, ProjectBody } from "@/api/project";
import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import LogCard from "./logCard";
import Loading from "../Loading";
import { useState } from "react";
import SearchBar from "../search";

function ManagerProjectLogs() {
  const [filterText, setFilterText] = useState("");
  const allprojects = useQuery({
    queryKey: ["projects"],
    queryFn: getAllAssignedProjects,
  });
  if (allprojects.isLoading) return <Loading />;

  // Filtering function
  const filteredData = allprojects?.data?.data?.filter((item: ProjectBody) => {
    return (
      item.title.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category?.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status?.toString().toLowerCase().includes(filterText.toLowerCase())
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
        {filteredData?.map((projects: any, index: number) => (
          <Link key={index} to={"/project-logs/" + projects?._id}>
            <LogCard
              type="servicing"
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

export default ManagerProjectLogs;
