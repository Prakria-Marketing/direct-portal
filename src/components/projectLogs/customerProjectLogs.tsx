import { getCustomerProjects, ProjectBody } from "@/api/project";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import LogCard from "./logCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../search";
import LoadingWrapper from "../global/loadingWrapper";
import TableEmty from "../notfound/tableEmty";

function CustomerProjectLogs() {
  const { user } = useAuth();
  const [filterText, setFilterText] = useState("");
  const { data: custmerProjectsLogs } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await getCustomerProjects(user?.userId),
    enabled: !!user?.userId,
  });

  // Filtering function
  const filteredData = custmerProjectsLogs?.data?.filter(
    (item: ProjectBody) => {
      return (
        item.title.toLowerCase().includes(filterText.toLowerCase()) ||
        item.category?.title
          ?.toLowerCase()
          .includes(filterText.toLowerCase()) ||
        item.status.toString().toLowerCase().includes(filterText.toLowerCase())
      );
    }
  );

  return (
    <LoadingWrapper isLoading={custmerProjectsLogs?.isLoading}>
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
          <Link key={index?.toString()} to={"/project-logs/" + projects?._id}>
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
      {filteredData?.length === 0 ? <TableEmty text="No projects yet" /> : null}
    </LoadingWrapper>
  );
}

export default CustomerProjectLogs;
