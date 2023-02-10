import { onMount } from "solid-js";
import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
  const handleText = () => {
    let text = document.getElementById("spinner-text");
    let spinner = document.getElementById("spinner");
    let shield = document.getElementById("shield");

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
        shield.classList.remove("hide");
      }, 10000);
    }
  };

  onMount(() => {
    handleText();
  });

  return (
    <>
      <div className="loading-spinner">
        <h4 id="spinner-text"></h4>
        <div id="spinner" className="spinner"></div>
        <div id="shield" className='hide'>
          <button
            className="btn primary "
            onClick={() => {
              history.back();
            }}
          >
            Zurück
          </button>
        </div>
      </div>
    </>
  );
};

export { LoadingSpinner };
