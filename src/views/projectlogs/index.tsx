import { Box, Grid, Heading } from "@chakra-ui/react";
import LogCard from "../../components/projectLogs/logCard";
import WrapperLayout from "../../layouts/wrapperLayout";

function ProjectLogs() {
  return (
    <WrapperLayout>
      <Box my={10}>
        <Heading as="h5" size="md" pb="5">
          Project Logs
        </Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <LogCard bg={"#edd6ff"} title="Poster Design" />
          <LogCard bg={"#ffd6e8"} title="Website Design" />
          <LogCard bg={"#d6ffda"} title="Presentation" />
          <LogCard bg={"#ffeed6"} title="Social Media Posts" />
          <LogCard bg={"#d6fff5"} title="Print Designs" />
          <LogCard bg={"#fcffd6"} title="Emailer Template" />
          <LogCard bg={"#ffd6d6"} title="App UI & UX Design" />
          <LogCard bg={"#d6fff0"} title="Logo Designs" />
        </Grid>
      </Box>
    </WrapperLayout>
  );
}

export default ProjectLogs;
