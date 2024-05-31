import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreatePage from "./CreatePage";
import OraclesPage from "./OraclesPage";
import OraclePage from "./OraclePage";
import ManagePage from "./ManagePage";
import MyOraclesPage from "./MyOraclesPage";

/**
 * defines application routes
 */
const Router: FC = () => {
  return (
    <Routes>
      <Route path={"/create"} element={<CreatePage />} />
      <Route path={"/oracles"} element={<OraclesPage />} />
      <Route path={"/oracle"}>
        <Route path={":address"} element={<OraclePage />}></Route>
      </Route>
      <Route path={"/myoracles"}>
        <Route path={""} element={<MyOraclesPage />}></Route>
        <Route path={":address"} element={<ManagePage />}></Route>
        <Route path={"*"} element={<Navigate to={"/myoracles"} />} />
      </Route>
      <Route path={"*"} element={<Navigate to={"/oracles"} />} />
    </Routes>
  );
};

export default Router;
