import React from "react";
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Link as ReachLink } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { useToastSuccess, useToastError } from "./Toast";
import { getProfile, login } from "../slices/usersSlice";
import { UserType } from "../types";

const LoginForm: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const validateEmail = (value: string) => !value && "Email is required";
  const validatePassword = (value: string) => !value && "Password is required";

  return (
    <Stack spacing={4}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values: Pick<UserType, "email" | "password">) => {
          dispatch(login(values)).then((res: any) => {
            if (!res.error) {
              dispatch(getProfile());
              window.location.href = "/home";
              toastSuccess({
                title: "Success! Login success",
              });
            } else {
              toastError({
                title: `Error!  ${res.error.message}`,
              });
            }
          });
        }}
      >
        {(props) => (
          <Form>
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
                  mt="13px"
                  mb="20px"
                  colorScheme="green"
                  id="password"
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...field}
                    placeholder="Password"
                    type="password"
                    variant="outline"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Log In
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Need to{" "}
                <Link as={ReachLink} to="/register" color={"blue.400"}>
                  Register
                </Link>
                ?
              </Text>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default LoginForm;
