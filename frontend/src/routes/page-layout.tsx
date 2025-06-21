import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected-route";

function PageLayout() {
  return (
    <>
      <Routes>
        <Route
          path="/users"
          element={
            <ProtectedRoute
              element=""
              requiredRoles={["Admin"]}
            />
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute
              element=""
              requiredRoles={["Admin", "User"]}
            />
          }
        />
        <Route
          path="/challenges/:id"
          element={
            <ProtectedRoute
              element=""
              requiredRoles={["Admin", "User"]}
            />
          }
        />
      </Routes>
    </>
  );
}

export default PageLayout;