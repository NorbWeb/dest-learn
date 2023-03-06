import { createEffect, createSignal, For } from "solid-js";
import { ImageUpload } from "../../Helper/ImageUpload/ImageUpload";
import "./ImageStore.scss";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import { Toast } from "../../Helper/Toast/Toast";

const ImageStore = () => {
  const storage = getStorage();
  const [imageList, setImageList] = createSignal();
  const [folder, setFolder] = createSignal();
  const [openToastSuccess, setOpenToastSuccess] = createSignal(false);
  const [openToastWarn, setOpenToastWarn] = createSignal(false);
  const [toastMessage, setToastMessage] = createSignal();
  const [disabled, setDisabled] = createSignal(true);
  let deleteImageList = [];

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

  function handleSelect(e) {
    let value = e.target.value;
    setFolder(value);
    deleteImageList = [];
    setDisabled(true);
    getList();
  }

  function handleCheck(e) {
    let check = e.target.checked;
    let value = e.target.value;
    if (check) {
      deleteImageList.push(value);
    } else {
      let arr = [...deleteImageList];
      let index = arr.indexOf(value);
      arr.splice(index, 1);
      deleteImageList = [...arr];
    }
    if (deleteImageList.length < 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  function showToastWarn() {
    setToastMessage("Bilder wirklich löschen?");
    setOpenToastWarn(true);
  }

  function showToastSuccess() {
    setOpenToastSuccess(true);
    setTimeout(() => {
      setOpenToastSuccess(false);
    }, 1000);
  }

  function deleteImage(image) {
    const storageRef = ref(storage, `${folder()}/${image}`);
    deleteObject(storageRef)
      .then(() => {
        setOpenToastWarn(false);
        setToastMessage(`Bilder erfolgreich gelöscht`);
        showToastSuccess(true);
        getList();
        setDisabled(true);
        deleteImageList = [];
      })
      .then(() => {
        showToast();
      })
      .catch((error) => {});
  }

  function handleDelete() {
    for (let i = 0; i < deleteImageList.length; i++) {
      deleteImage(deleteImageList[i]);
    }
  }

  createEffect(() => {});

  return (
    <div id="image-store">
      <h1 className="image-title">Bilder</h1>
      <p>Hier kannst du Bilder hochladen und löschen.</p>
      <div className="divider" />
      <div className="header-menu">
        <div className="buttons">
          <button
            type="button"
            className="btn primary btn-back"
            onClick={() => history.back()}
          >
            Zurück
          </button>
          <button
            className="btn primary"
            onClick={() => showToastWarn()}
            disabled={disabled() === true}
          >
            Löschen
          </button>
        </div>
      </div>
      <Toast
        open={openToastWarn()}
        type="warn"
        message={toastMessage()}
        id="image-store-toast-1"
      >
        <div className="wrapper gap-1">
          <button
            className="btn secondary"
            type="button"
            onClick={() => handleDelete()}
          >
            Ja
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={() => setOpenToastWarn(false)}
          >
            Nein
          </button>
        </div>
      </Toast>
      <Toast
        open={openToastSuccess()}
        type="success"
        message={toastMessage()}
        timeBeforeAutoClose={5000}
        id="image-store-toast-2"
      />
      <div className="wrapper col">
        <label htmlFor="list">Speicherort wählen</label>
        <select
          name="list"
          id="list"
          onChange={(e) => {
            handleSelect(e);
          }}
        >
          <option value=""></option>
          <option value="content-images">Artikel</option>
          <option value="drug-images">Drogen</option>
        </select>
      </div>
      <div className="menu">
        <ImageUpload
          folder={folder()}
          update={getList()}
          disabled={folder() ? false : true}
        />
      </div>
      <div className="image-list">
        <ul>
          <For each={imageList()}>
            {(image, index) => (
              <li>
                <div className="wrapper gap-1 aligne-center">
                  <input
                    value={image.name}
                    type="checkbox"
                    onChange={(e) => handleCheck(e)}
                  />
                  {image.name}
                </div>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};

export { ImageStore };
