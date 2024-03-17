import "./App.css";
import LandingFooter from "./components/LandingFooter";
import LandingNavbar from "./components/LandingNavbar";

function App({ element }) {
  return (
    <div>
      <LandingNavbar />
      <div>{element}</div>
      <LandingFooter />
    </div>
  );
}

export default App;
