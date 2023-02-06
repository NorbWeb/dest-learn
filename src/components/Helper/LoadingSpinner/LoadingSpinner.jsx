import { onMount } from "solid-js";
import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
  let test = "Bitte warten";
  const handleText = () => {
    let text = document.getElementById("spinner-text");
    if (!text) {
      null;
    } else {
      text.innerHTML = test;
      setTimeout(() => {
        text.innerHTML = "Dauert...";
      }, 5000);
    }
  };

  onMount(() => {
    handleText();
  });

  return (
    <>
      <div className="loading-spinner">
        <h4 id="spinner-text"></h4>
        <div className="spinner"></div>
      </div>
    </>
  );
};

export { LoadingSpinner };
