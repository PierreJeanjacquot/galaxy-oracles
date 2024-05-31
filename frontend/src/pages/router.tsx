import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreatePage from "./CreatePage";
import OraclesPage from "./OraclesPage";
import OraclePage from "./OraclePage";

/**
 * defines application routes
 */
const Router: FC = () => {
  return (
    <Routes>
      <Route path={`/create`} element={<CreatePage />} />
      <Route path={`/oracles`} element={<OraclesPage />} />
      <Route path={`/oracle`}>
        <Route path={`:address`} element={<OraclePage />}></Route>
      </Route>
      <Route path={"*"} element={<Navigate to={`/oracles`} />} />
    </Routes>
  );
};

export default Router;
