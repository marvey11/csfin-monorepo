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
import { PortfolioLayout } from "./components/PortfolioLayout";
import {
  CreateExchangePage,
  CreatePortfolioPage,
  CreateSecurityPage,
  EditExchangePage,
  EditPortfolioPage,
  EditSecurityPage,
  ExchangeDetailsPage,
  ExchangeListPage,
  PortfolioDetailsPage,
  PortfolioListPage,
  SecurityDetailsPage,
  SecurityEvaluationPage,
  SecurityListPage,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="portfolios">
        <Route index element={<PortfolioListPage />} />
        <Route path="create" element={<CreatePortfolioPage />} />
        <Route path=":id" element={<PortfolioLayout />}>
          <Route index element={<PortfolioDetailsPage />} />
          <Route path="edit" element={<EditPortfolioPage />} />
        </Route>
      </Route>

      <Route path="securities">
        <Route index element={<SecurityListPage />} />
        <Route path="create" element={<CreateSecurityPage />} />
        <Route path="evaluate" element={<SecurityEvaluationPage />} />
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
