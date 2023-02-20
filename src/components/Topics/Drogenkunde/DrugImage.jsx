import "./DrugImage.scss";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { createEffect, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import { Toast } from "../../Helper/Toast/Toast";

const DrugImage = () => {
  const storage = getStorage();
  const [open, setOpen] = createSignal(false);
  const [images, setImages] = createSignal([]);
  const [file, setFile] = createSignal("");
  const [selected, setSelected] = createStore({
    name: "",
    url: "",
  });

  const listRef = ref(storage, "drug-images");
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {});
      setImages(res.items);
      res.items.forEach((itemRef) => {});
    })
    .catch((error) => {});

  const onInputChange = (e) => {
    e.preventDefault();
    setSelected({ name: e.currentTarget.value });
    if (selected.name) {
      getUrl();
    } else {
      setSelected({ url: "" });
    }
  };

  const onInputChangeFile = (e) => {
    e.preventDefault();
    setFile(e.currentTarget.files[0]);
  };

  function getUrl() {
    const storageRef = ref(storage, `drug-images/${selected.name}`);
    getDownloadURL(storageRef).then((downloadUrl) => {
      setSelected({ url: downloadUrl });
    });
  }

  function uploadImage() {
    const storageRef = ref(storage, `drug-images/${file().name}`);
    uploadBytes(storageRef, file());
    setFile("");
    showToast();
  }

  const showToast = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  createEffect(() => {
  });
  return (
    <>
      <Toast type="success" open={open()}>
        Bild erfolgreich hochgeladen!
      </Toast>
      <div className="drug-image-container">
        <label for="type">Bild hochladen</label>
        <input
          className="image"
          name="img"
          type="file"
          files={file()}
          onChange={onInputChangeFile}
        />
        <div className="wrapper gap-1">
          <button type="button" className="btn primary" onClick={uploadImage}>
            OK
          </button>
        </div>
        <input
          type="text"
          name="image-list"
          value={selected.name}
          onChange={onInputChange}
          list="images"
        />
        <datalist id="images">
          <For each={images()}>
            {(img) => <option value={img.name}>{img.name}</option>}
          </For>
        </datalist>
        <div className="wrapper gap-1">
          <img
            src={selected.url != "" ? selected.url : "/placeholder.svg"}
            alt=""
          />
          <button
            type="button"
            onClick={() => setSelected({ name: "", url: "" })}
            className="btn icon-btn warn"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export { DrugImage };
