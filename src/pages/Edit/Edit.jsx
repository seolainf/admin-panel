import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../../firebase/firebaeConfig";
import { getProductById } from "../../firebase/firebaseFunc";
import { toast, ToastContainer } from "react-toastify";
import "./edit.scss";

const Edit = ({ table }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imgList, setImgList] = useState();
  const [imgView, setImgView] = useState(imgList && imgList[0]);
  const [imgUpload, setImgUpload] = useState("");

  const [showAddOption, setShowAddOption] = useState(false);
  const [showAddImg, setShowAddImg] = useState(false);
  const [process, setProcess] = useState(0);
  const [dataUpload, setDataUpload] = useState({});

  const handleUploadImg = (e) => {
    const file = e.target.files[0];
    const imageRef = ref(storage, `${table}/${file.name}`);
    const metadata = {
      contentType: "image/jpeg",
    };
    const uploadTask = uploadBytesResumable(imageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProcess(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUpload(downloadURL);
        });
      }
    );
  };

  const handleAddOptions = async (e) => {
    e.preventDefault();
    const optionRef = doc(db, `${table}`, `${id}`);
    const info = {
      ...dataUpload,
    };
    try {
      await updateDoc(optionRef, {
        options: arrayUnion(info),
      });
      toast.success("Add New Success !", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      toast.error("What wrong!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleInput = (e) => {
    const inputId = e.target.id;
    const value = e.target.value;
    setDataUpload({ ...dataUpload, [inputId]: value });
  };

  const handleAddImg = async (e) => {
    e.preventDefault();
    const optionRef = doc(db, `${table}`, `${id}`);
    try {
      await updateDoc(optionRef, {
        imgURL: arrayUnion(imgUpload),
      });
      toast.success("Add New Success !", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      toast.error("What wrong!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductById(id, table);

        setProduct(data);
        setImgView(data.imgURL[0]);
        setImgList(data?.imgURL);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, table]);

  return (
    <div className="edit">
      <div className="edit__img">
        <div className="edit__img_list">
          {imgList &&
            imgList.map((img, index) => (
              <div className="edit__img_item" key={index}>
                <img src={img} alt="" onClick={() => setImgView(img)} />
              </div>
            ))}
        </div>
        <div className="edit__img_view">
          <img src={imgView} alt="" />
        </div>
      </div>
      <div className="edit__info">
        <span>{product && product.name}</span>
        <div className="edit__info_size">
          Size:
          {product &&
            product.sizes?.map((size, index) => (
              <span key={index}>{size}</span>
            ))}
        </div>
        <span className="edit__info_title">Màu sắc: </span>
        <div className="edit__info_options">
          {product &&
            product.options?.map((option, index) => (
              <div className="edit__info_item" key={index} title={option.color}>
                <span style={{ backgroundColor: `${option.clname}` }}></span>
              </div>
            ))}
          <div className="edit__info_addOption" title="Add Option">
            <span onClick={() => setShowAddOption(!showAddOption)}>+</span>
            {showAddOption && (
              <form className="edit__info_form">
                <div className="edit__info_form_group">
                  <label htmlFor="">Color: </label>
                  <input
                    type="text"
                    id="color"
                    placeholder="Ex: Red, Yellow"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="edit__info_form_group">
                  <label htmlFor="">Color name: </label>
                  <input
                    type="text"
                    placeholder="Ex: AKM,..."
                    id="clname"
                    onChange={handleInput}
                    required
                  />
                </div>

                <button onClick={handleAddOptions}>Add</button>
              </form>
            )}
          </div>
        </div>
        <div className="edit__info_addImg">
          <span
            className="edit__info_addImg_title"
            onClick={() => setShowAddImg(!showAddImg)}
          >
            Thêm ảnh
          </span>
          {showAddImg && (
            <div className="edit__info_addImg_form">
              <label htmlFor="">Image: </label>
              <input
                type="file"
                id="img"
                onChange={handleUploadImg}
                required={true}
              />
              <small>{process}%</small>
              <button onClick={handleAddImg}>Add</button>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Edit;
