import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./app/App";
import { ExchangeLayout, SecurityLayout } from "./components";
import {
  CreateExchangePage,
  CreateSecurityPage,
  EditExchangePage,
  EditSecurityPage,
  ExchangeDetailsPage,
  ExchangeListPage,
  SecurityDetailsPage,
  SecurityListPage,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="securities">
        <Route index element={<SecurityListPage />} />
        <Route path="create" element={<CreateSecurityPage />} />
        <Route path=":id" element={<SecurityLayout />}>
          <Route index element={<SecurityDetailsPage />} />
          <Route path="edit" element={<EditSecurityPage />} />
        </Route>
      </Route>

      <Route path="exchanges">
        <Route index element={<ExchangeListPage />} />
        <Route path="create" element={<CreateExchangePage />} />
        <Route path=":id" element={<ExchangeLayout />}>
          <Route index element={<ExchangeDetailsPage />} />
          <Route path="edit" element={<EditExchangePage />} />
        </Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
