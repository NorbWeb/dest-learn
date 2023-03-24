import { Show } from "solid-js";
import "./FullScreenImage.scss";

const FullScreenImage = (props) => {
  console.log()
  return (
    <Show when={props.open}>
      <div
        className="fullscreen-container"
        onClick={() => props.setOpen({ open: false })}
      >
        <div className="image-wrapper">
          <img
            className="fullscreen-image"
            src={props.src}
            alt={props.alt}
          />
          <figcaption className="fullscreen-caption">
            {props.alt}
          </figcaption>
        </div>
      </div>
    </Show>
  );
};

export { FullScreenImage };
