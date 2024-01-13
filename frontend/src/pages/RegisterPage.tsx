import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage: React.FC = (): JSX.Element => {
  return (
    <Box>
      <Flex align={"center"} justify={"center"} mt={"140px"}>
        <Stack spacing={8} mx={"auto"} minW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Register</Heading>
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
            <RegisterForm />
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default RegisterPage;
