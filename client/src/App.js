import "./App.css";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/form" component={Form} />
    </div>
  );
}

export default App;
