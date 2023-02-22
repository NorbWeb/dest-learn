import { onMount } from "solid-js";
import "./LoadingSpinner.scss";

const LoadingSpinner = (props) => {
  const { back } = props;
  const handleText = () => {
    let text = document.getElementById("spinner-text");
    let spinner = document.getElementById("spinner");
    let extra = document.getElementById("extra");
    let sorry = document.getElementById("sorry");

    if (!text) {
      null;
    } else {
      text.innerHTML = "Bitte warten";
      setTimeout(() => {
        text.innerHTML = "Dauert...";
      }, 5000);
      setTimeout(() => {
        text.innerHTML = "Sorry, probier es später nochmal";
        spinner.classList.add("hide");
        back ? extra.classList.remove("hide") : sorry.classList.remove("hide");
      }, 10000);
    }
  };

  onMount(() => {
    handleText();
  });

  return (
    <>
      <div className="loading-spinner">
        <div className="loading-spinner-body">
          <h4 id="spinner-text"></h4>
          <div id="spinner" className="spinner"></div>
          <div id="extra" className="hide">
            <button
              className="btn primary "
              onClick={() => {
                history.back();
              }}
            >
              Zurück
            </button>
          </div>
          <div id="sorry" className="hide">
            🙇
          </div>
        </div>
      </div>
    </>
  );
};

export { LoadingSpinner };
