import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { UserType } from "../types";

const HomePage: React.FC = (): JSX.Element => {
  const currentUser = useAppSelector((state: RootState): UserType | null => {
    return state.usersReducer.currentUser;
  });
  const isLoading = useAppSelector((state: RootState): Boolean => {
    return state.usersReducer.isLoading;
  });

  return (
    <Box>
      <Flex mt="300px" justify={"center"}>
        <Heading fontSize={"4xl"}>
          {isLoading ? (
            "Loading..."
          ) : (
            <Text>{`Hey ${currentUser?.firstName} ${currentUser?.lastName} !`}</Text>
          )}
        </Heading>
      </Flex>
    </Box>
  );
};

export default HomePage;
