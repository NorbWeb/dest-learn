import { Routes, Route } from "@solidjs/router";
import { Navbar } from "./components/Navigation/Navbar";
import { PageWrapper } from "./components/PageWrapper/PageWrapper";
import { User } from "./components/User/User";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" component={PageWrapper}>
          <Route path={["/home", "/*"]} element={<div>Home</div>} />
          <Route path="/user" component={User} />
          <Route path="/admin" element={<div>Admin</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

