import NavBar from "./components/NavBar";
import Router from "./pages/router";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <NavBar />
      <Router />
    </div>
  );
}

export default App;
