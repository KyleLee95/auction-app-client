import { router } from "./router";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  );
}

export { App };
