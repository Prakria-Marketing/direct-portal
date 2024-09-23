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
          <LogCard border="1px" borderColor="#bf8de5" bg={"#edd6ff"} title="Poster Design" />
          <LogCard border="1px" borderColor="#ef448f" bg={"#ffd6e8"} title="Website Design" />
          <LogCard border="1px" borderColor="#4ad357" bg={"#d6ffda"} title="Presentation" />
          <LogCard border="1px" borderColor="#e7a635" bg={"#ffeed6"} title="Social Media Posts" />
          <LogCard border="1px" borderColor="#28d3c7" bg={"#d6fff5"} title="Print Designs" />
          <LogCard border="1px" borderColor="#d3bb28" bg={"#fcffd6"} title="Emailer Template" />
          <LogCard border="1px" borderColor="#da5353" bg={"#ffd6d6"} title="App UI & UX Design" />
          <LogCard border="1px" borderColor="#42c897" bg={"#d6fff0"} title="Logo Designs" />
        </Grid>
      </Box>
    </WrapperLayout>
  );
}

export default ProjectLogs;
