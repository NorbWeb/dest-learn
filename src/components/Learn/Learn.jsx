import { Sidebar } from "../Sidebar/Sidebar";
import "./Learn.scss";
const Learn = () => {
  return (
    <>
      <div class="container info-grid">
        <aside className="sidebar">
          <Sidebar/>
        </aside>
        <div className="main">
            <h1>Inhalt</h1>
        </div>
      </div>
    </>
  );
};

export { Learn };
