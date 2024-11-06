import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"
type EmtyPageProps = {
    text?: string;
}
function TableEmty(props: EmtyPageProps) {

    return (
        <Flex padding={2} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={2}>
            <Image src="/images/project-not-found.png" width={200} height={200} mixBlendMode={"multiply"} />
            <Heading size={"md"} >{props?.text}</Heading>
        </Flex>
    )
}

export default TableEmty