import { Outlet, Link } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { DashboardLayout } from "./dashboard-layout";
function DashboardPage() {
  return <DashboardLayout />;
}
export { DashboardPage };
