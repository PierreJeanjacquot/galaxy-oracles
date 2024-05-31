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
      <h1 className="text-3xl text-red-800 font-bold underline">
        Hello world!
      </h1>
      <NavBar />
      <Router />
    </div>
  );
}

export default App;
