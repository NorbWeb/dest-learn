import { Sidebar } from "../Sidebar/Sidebar";
import "./Info.scss";
const Info = () => {
  return (
    <>
      <div class="container sidebar-main-grid">
          <Sidebar/>
        <div className="main">
          <div className="intro">intro</div>
          <div className="content">content</div>
          <div className="toc">toc</div>
        </div>
      </div>
    </>
  );
};

export { Info };
