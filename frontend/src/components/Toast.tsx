import { UseToastOptions, useToast } from "@chakra-ui/react";

export const toastDefaultConfig: UseToastOptions = {
  duration: 3000,
  isClosable: true,
  position: "top-right",
  variant: "solid",
};

export const useToastError = () =>
  useToast({
    ...toastDefaultConfig,
    status: "error",
    duration: 5000,
  });

export const useToastSuccess = () =>
  useToast({
    ...toastDefaultConfig,
    status: "success",
  });
