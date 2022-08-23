import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Section from "../../components/Section/Section";
import { db, storage } from "../../firebase/firebaeConfig";
import "./news.scss";
import slugify from "slugify";

const News = (props) => {
  const { type } = props;
  console.log(type);

  const [imagesURL, setImagesURL] = useState("");
  const [data, setData] = useState({});
  /* console.log(data); */
  const handleUploadImg = (e) => {
    const images = e.target.files[0];
    const imageRef = ref(storage, `${type}/${images.name}`);
    const metadata = {
      contentType: "image/jpeg",
    };
    const uploadTask = uploadBytesResumable(imageRef, images, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          setImagesURL(downloadURL);
        });
      }
    );
  };
  const handleInputValue = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    const info = {
      name: data.name,
      sizes: data.sizes?.split(","),
      featured: data.featured?.split("\n"),
      categories: data.categories?.split(","),
      price: +data.price,
      oldPrice: +data.oldPrice,
      imgURL: [imagesURL],
      options: [
        {
          color: data.color,
          clname: data.clname,
        },
      ],
      slug: slugify(data.name, {
        replacement: "-",
        lower: true,
        strict: true,
        locale: "vi",
      }),
      time: serverTimestamp(),
    };
    console.log(info);
    try {
      const colRef = collection(db, `${type}`);
      await addDoc(colRef, info);
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

  return (
    <div className="news">
      <div className="news__title">
        <Section title={`Add News ${type || "Item"}`} />
      </div>
      <div className="news__content">
        <div className="news__images">
          <img
            src={
              imagesURL ? imagesURL : require("../../assets/images/image.webp")
            }
            alt=""
          />
        </div>

        <form action="" className="news__form">
          <div className="news__form_group">
            <label htmlFor="">Producrs name: </label>
            <input
              type="text"
              placeholder="Ex: Apple Macbook Pro"
              onChange={handleInputValue}
              id="name"
            />
          </div>
          <div className="news__form_group">
            <label htmlFor="">Prices: </label>
            <input
              type="float"
              placeholder="Ex: 399000"
              onChange={handleInputValue}
              id="price"
            />
          </div>
          <div className="news__form_group">
            <label htmlFor="">Old Prices: </label>
            <input
              type="float"
              placeholder="Ex: 399000"
              onChange={handleInputValue}
              id="oldPrice"
            />
          </div>
          <div className="news__form_group">
            <label htmlFor="">Size: </label>
            <input
              type="text"
              placeholder="Ex: S, M, L,..."
              onChange={handleInputValue}
              id="sizes"
            />
          </div>
          <div className="news__form_group">
            <label htmlFor="">Options: </label>
          </div>
          <div className="news__form_group">
            <label htmlFor="">Color: </label>
            <input
              type="text"
              placeholder="Ex: Red, Yellow"
              onChange={handleInputValue}
              id="color"
            />
          </div>
          <div className="news__form_group">
            <label htmlFor="">Color name: </label>
            <input
              type="text"
              placeholder="Ex: Red, Yellow"
              onChange={handleInputValue}
              id="clname"
            />
          </div>
          <div className="news__form_group">
            <label htmlFor="">Images: </label>
            <input type="file" onChange={handleUploadImg} />
          </div>

          <div className="news__form_group">
            <label htmlFor="">Categories: </label>
            <input
              type="text"
              placeholder="Ex: Polo,..."
              onChange={handleInputValue}
              id="categories"
            />
          </div>
          <div className="news__form_group">
            <label htmlFor="">Featured: </label>
            <textarea
              type="text"
              placeholder="Ex: S, M, L,..."
              onChange={handleInputValue}
              id="featured"
            />
          </div>
          <button className="btn__add" onClick={handleAddNews}>
            Add {type}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

News.propTypes = {
  type: PropTypes.string,
};

export default News;
