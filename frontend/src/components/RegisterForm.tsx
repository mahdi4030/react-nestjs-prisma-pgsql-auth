import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  Stack,
  Button,
  Text,
  Link,
  FormErrorMessage,
  InputGroup,
  RadioGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useToastSuccess, useToastError } from "./Toast";
import { register } from "../slices/usersSlice";
import { UserType } from "../types";

const RegisterForm: React.FC = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const validateEmail = (value: string) => !value && "Email is required";
  const validatePassword = (value: string) => !value && "Password is required";
  const validateFirstName = (value: string) =>
    !value && "First Name is required";
  const validateLastName = (value: string) => !value && "Last Name is required";

  return (
    <Stack spacing={4}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        }}
        onSubmit={(values: Omit<UserType, "id" | "token">) => {
          dispatch(register(values)).then((res: any) => {
            if (!res.error) {
              navigate("/login");
              toastSuccess({
                title: "Success! Register success",
              });
            } else {
              toastError({
                title: `Error! ${res.error.message}`,
              });
            }
          });
        }}
      >
        {(props) => (
          <Form>
            <Field name="firstName" validate={validateFirstName}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.firstName && form.touched.firstName}
                  mt="12px"
                  colorScheme="green"
                  id="name"
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="First Name"
                    type="text"
                    variant="outline"
                  />
                  <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="lastName" validate={validateLastName}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.lastName && form.touched.lastName}
                  mt="12px"
                  colorScheme="green"
                  id="name"
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Last Name"
                    type="text"
                    variant="outline"
                  />
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email" validate={validateEmail}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                  mt="12px"
                  colorScheme="green"
                  id="email"
                >
                  <FormLabel>Email address</FormLabel>
                  <Input
                    {...field}
                    placeholder="Email Address"
                    type="email"
                    variant="outline"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password" validate={validatePassword}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                  my="13px"
                  colorScheme="green"
                  id="password"
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      placeholder="Password"
                      variant="outline"
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                mt="5"
                type="submit"
              >
                Register
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link as={ReachLink} to="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default RegisterForm;
