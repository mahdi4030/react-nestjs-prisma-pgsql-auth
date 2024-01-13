import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";

import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = (): JSX.Element => {
  return (
    <Box>
      <Flex align={"center"} justify={"center"} mt={"140px"}>
        <Stack spacing={8} mx={"auto"} minW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Log in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <LoginForm />
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default LoginPage;
