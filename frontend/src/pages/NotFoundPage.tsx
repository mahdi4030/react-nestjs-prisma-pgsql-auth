import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <Box>
      <Flex mt="300px" justify={"center"}>
        <Heading fontSize={"4xl"}>Page Not Found</Heading>
      </Flex>
    </Box>
  );
};

export default NotFoundPage;
