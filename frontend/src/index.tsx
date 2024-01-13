import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";

import { App } from "./App";
import store from "./store";

const container: HTMLElement | any = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ReduxProvider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ReduxProvider>
);
