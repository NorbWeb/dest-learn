import "./ImageUpload.scss";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { createEffect, createSignal, For, Show } from "solid-js";
import { Toast } from "../Toast/Toast";

const ImageUpload = (props) => {
  const [file, setFile] = createSignal();
  const [nameExist, setNameExist] = createSignal(false);
  const [openToastUpload, setOpenToastUpload] = createSignal();
  const [toastMessageUpload, setToastMessageUpload] = createSignal();
  const [imageList, setImageList] = createSignal();
  const [folder, setFolder] = createSignal(props.folder);

  const storage = getStorage();

  function getList() {
    const listRef = ref(storage, folder());
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {});
        setImageList(res.items);
        res.items.forEach((itemRef) => {});
      })
      .catch((error) => {});
  }

  const showToastUpload = () => {
    setOpenToastUpload(true);
    setTimeout(() => {
      setOpenToastUpload(false);
    }, 5000);
  };

  const onInputChangeFile = (e) => {
    setNameExist(false);
    e.preventDefault();
    let file = e.currentTarget.files[0];
    setFile(file);
  };

  function resetFileUpload() {
    document.getElementById("file-upload").reset();
  }

  function uploadImage() {
    setNameExist(false);
    const storageRef = ref(storage, `${folder()}/${file().name}`);
    imageList().map((m) =>
      m.name === file().name ? setNameExist(true) : null
    );
    if (!nameExist()) {
      uploadBytes(storageRef, file()).then((res) => {
        if (res) {
          setToastMessageUpload(
            `Bild "${file().name}" erfolgreich hochgeladen`
          );
          getList();
          showToastUpload();
          resetFileUpload();
          setFile();
          props.update;
        }
      });
    }
  }

  getList();

  createEffect(() => {
    if (folder() != props.folder) {
      setFolder(props.folder);
      getList();
      resetFileUpload();
      setFile();
      setNameExist(false);
    }
  });

  return (
    <div className="image-upload">
      <Toast
        type="success"
        open={openToastUpload()}
        message={toastMessageUpload()}
      />
      <fieldset>
        <legend for="type" classList={{ error: nameExist() }}>
          {nameExist() ? "Dateiname schon vorhanden!" : "Bild hochladen"}
        </legend>
        <form id="file-upload" method="dialog">
          <div className="wrapper gap-1">
            <input
              id="input-file"
              className="image"
              name="img"
              type="file"
              files={file()}
              onChange={onInputChangeFile}
            />
            <button
              type="button"
              className="btn primary icon-btn btn-sm"
              onClick={uploadImage}
              disabled={!file() || nameExist() || props.folder === ""}
            >
              <i class="bi bi-file-arrow-up"></i>Upload
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export { ImageUpload };
