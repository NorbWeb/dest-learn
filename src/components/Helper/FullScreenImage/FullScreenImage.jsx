import { Show } from "solid-js";
import "./FullScreenImage.scss";

const FullScreenImage = (props) => {
  return (
    <Show when={props.open}>
      <div
        className="fullscreen-container"
        onClick={() => props.setOpen({ open: false })}
      >
        <div className="image-wrapper">
          <img className="fullscreen-image" src={props.src} alt="" />
        </div>
      </div>
    </Show>
  );
};

export { FullScreenImage };
