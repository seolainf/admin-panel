import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebaeConfig";

const OptionForm = (props) => {
  const { handleData } = props;

  const [imgURL, setImgURL] = useState("");
  const [optionData, setOptionData] = useState({});

  const handleUploadImg = (e) => {
    const images = e.target.files[0];
    const imageRef = ref(storage, `products/${images.name}`);
    const metadata = {
      contentType: "image/jpeg",
    };
    const uploadTask = uploadBytesResumable(imageRef, images, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
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
          setImgURL(downloadURL);
        });
      }
    );
  };
  const handleOptionValue = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setOptionData({ ...optionData, [id]: value, imgList: [imgURL] });
  };

  /* useEffect(() => {
    handleData(optionData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionData]); */

  return (
    <div className="option">
      <div className="news__form_group">
        <label htmlFor="">Color: </label>
        <input type="text" placeholder="Ex: Red, Yellow" id="colors" onChange={handleOptionValue} />
      </div>
      <div className="news__form_group">
        <label htmlFor="">Images: </label>
        <input type="file" onChange={handleUploadImg} />
      </div>
      <div className="news__form_group">
        <label htmlFor="">Opiont Code: </label>
        <input type="text" placeholder="Ex: AKM,..." id="optioncode" onChange={handleOptionValue} />
      </div>
    </div>
  );
};

OptionForm.propTypes = {
  handleOption: PropTypes.func,
};

export default OptionForm;
