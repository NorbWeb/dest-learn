import "./DrugImage.scss";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { createEffect, createSignal, For, Show } from "solid-js";
import { Toast } from "../../Helper/Toast/Toast";

const [toastMessage, setToastMessage] = createSignal();
const [imageList, setImageList] = createSignal();
const [openToast, setOpenToast] = createSignal(false);
const [openWarn, setOpenWarn] = createSignal(false);

const storage = getStorage();

function getList() {
  const listRef = ref(storage, "drug-images");
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {});
      setImageList(res.items);
      res.items.forEach((itemRef) => {});
    })
    .catch((error) => {});
}

const showToast = () => {
  setOpenToast(true);
  setTimeout(() => {
    setOpenToast(false);
  }, 5000);
};

const DrugImage = (props) => {
  const onInputChange = (e) => {
    e.preventDefault();
    if (e.target.value) {
      const storageRef = ref(storage, `drug-images/${e.target.value}`);
      getDownloadURL(storageRef).then((downloadUrl) => {
        props.setDrug({ img: { name: e.target.value, url: downloadUrl } });
      });
    }
  };

  function deleteImage() {
    const storageRef = ref(storage, `drug-images/${props.drug.img.name}`);
    deleteObject(storageRef)
      .then(() => {
        setOpenWarn(false);
        setToastMessage(`Bild "${props.drug.img.name}" erfolgreich gelöscht`);
        props.setDrug({ img: { name: "", url: "" } });
        getList();
      })
      .then(() => {
        showToast();
      })
      .catch((error) => {});
  }

  createEffect(() => {
    getList();
    // console.log(imageList());
    // console.log(selected.name);
    // console.log(selected.url);
  });

  return (
    <>
      <Toast
        id="message"
        type="success"
        open={openToast()}
        message={toastMessage()}
      />
      <div className="drug-image-container">
        {/* #################### Image preview #################### */}
        <div className="wrapper gap-1">
          <img
            src={
              props.drug.img.url != "" ? props.drug.img.url : "/placeholder.svg"
            }
            alt=""
          />
          <Show when={props.drug.img.name != ""}>
            <div
              onClick={() => props.setDrug({ img: { name: "", url: "" } })}
              className="delete-selection"
            >
              <i class="bi bi-x-square"></i>
            </div>
          </Show>
        </div>
        {/* ###################### Datalist ###################### */}
        <div className="group">
          <input
            type="text"
            name="image-list"
            value={props.drug.img.name}
            onChange={onInputChange}
            list="images"
          />
          <datalist id="images">
            <For each={imageList()}>
              {(img) => <option value={img.name}>{img.name}</option>}
            </For>
          </datalist>
          {/* <button
            type="button"
            onClick={() => setOpenWarn(true)}
            className="warn btn icon-btn"
            disabled={props.drug.img.name === ""}
          >
            <i class="bi bi-trash"></i>
          </button>
          <Toast
            type="warn"
            open={openWarn() === true}
            message={"Bild wirklich löschen?"}
          >
            <div className="wrapper gap-1 justify-center">
              <button
                type="button"
                className="btn secondary"
                onClick={() => deleteImage()}
              >
                Ja
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={() => setOpenWarn(false)}
              >
                Nein
              </button>
            </div>
          </Toast> */}
        </div>
      </div>
    </>
  );
};

// const DrugImageUpload = (props) => {
//   const [file, setFile] = createSignal();
//   const [nameExist, setNameExist] = createSignal(false);
//   const [openToastUpload, setOpenToastUpload] = createSignal();
//   const [toastMessageUpload, setToastMessageUpload] = createSignal();

//   const showToastUpload = () => {
//     setOpenToastUpload(true);
//     setTimeout(() => {
//       setOpenToastUpload(false);
//     }, 5000);
//   };

//   const onInputChangeFile = (e) => {
//     e.preventDefault();
//     setFile(e.currentTarget.files[0]);
//     checkIfUploadImgNameIsInDb();
//   };

//   function checkIfUploadImgNameIsInDb() {
//     let tester = false;
//     if (file()) {
//       imageList().map((e) => (e.name === file().name ? (tester = true) : null));
//     }
//     if (tester) {
//       setNameExist(true);
//     } else {
//       setNameExist(false);
//     }
//   }

//   function resetFileUpload() {
//     document.getElementById("file-upload").reset();
//   }

//   function uploadImage() {
//     const storageRef = ref(storage, `${props.folder}drug-images/${file().name}`);
//     uploadBytes(storageRef, file()).then((res) => {
//       if (res) {
//         setToastMessageUpload(`Bild "${file().name}" erfolgreich hochgeladen`);
//         getList();
//         showToastUpload();
//         resetFileUpload();
//         setFile();
//       }
//     });
//   }

//   createEffect(() => {
//     // console.log(file())
//   });

//   return (
//     <div className="drug-image-upload">
//       <Toast
//         type="success"
//         open={openToastUpload()}
//         message={toastMessageUpload()}
//       />
//       <fieldset>
//         <legend for="type" classList={{ error: nameExist() }}>
//           {nameExist() ? "Dateiname schon vorhanden!" : "Bild hochladen"}
//         </legend>
//         <form id="file-upload" method="dialog">
//           <div className="wrapper gap-1">
//             <input
//               id="input-file"
//               className="image"
//               name="img"
//               type="file"
//               files={file()}
//               onChange={onInputChangeFile}
//             />
//             <button
//               type="button"
//               className="btn primary icon-btn btn-sm"
//               onClick={uploadImage}
//               disabled={!file() || nameExist()}
//             >
//               <i class="bi bi-file-arrow-up"></i>Upload
//             </button>
//           </div>
//         </form>
//       </fieldset>
//     </div>
//   );
// };

export { DrugImage };
