import { Routes, Route } from "@solidjs/router";
import { Home } from "./components/Home/Home";
import { Learn } from "./components/Learn/Learn";
import { User } from "./components/User/User";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" component={Home}>
          <Route path="/home"component={Learn} />
          <Route path="/user" component={User} />
          <Route path="/admin" element={<div className="container">Admin</div>} />
          <Route path="/about" element={<div className="container">About</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

