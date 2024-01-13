import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { logout } from "../../slices/usersSlice";

const Header: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state: RootState) => {
    return state.usersReducer.currentUser;
  });
  const token = localStorage.getItem("bearer-token");

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box fontSize={"18px"} fontWeight={"bold"}>
              Test App
            </Box>
          </HStack>
          <Flex alignItems={"center"}>
            {token ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Box fontWeight={"bold"}>{currentUser?.firstName}</Box>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(logout()).then(
                        () => (window.location.href = "/login")
                      );
                    }}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Box>
                <Link as={ReachLink} to="/login" mr={"15px"}>
                  Login
                </Link>
                <Link as={ReachLink} to="/register">
                  Register
                </Link>
              </Box>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
