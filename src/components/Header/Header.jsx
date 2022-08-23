import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/images/avatar.webp";
import { auth } from "../../firebase/firebaeConfig";
import { setUser, removeUSer } from "../../redux/userSlice";
import "./header.scss";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const provider = new GoogleAuthProvider();
  const currenUser = user[0];

  const handleLogin = async () => {
    if (!currenUser) {
      const userData = await signInWithPopup(auth, provider);
      const userInfo = userData.user.providerData[0];
      dispatch(setUser(userInfo));
      setIsMenu(!isMenu);
    } else {
      alert("You are logged!");
      setIsMenu(!isMenu);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUSer(user[0]));
        setIsMenu(!isMenu);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="header">
      <div className="header__title">
        <h1>Dashboard</h1>
      </div>
      <div className="header__content">
        <div className="header__search">
          <input type="text" placeholder="Search here" />
          <span className="header__search_icon">
            <BsSearch />
          </span>
        </div>
        <div className="header__options">
          <span className="header__options_icon">
            <FaRegQuestionCircle />
          </span>
          <span className="header__options_icon">
            <MdOutlineNotificationImportant />
          </span>
          <div className="header__options_user">
            <div className="header__options_avatar" onClick={() => setIsMenu(!isMenu)}>
              <img src={user[0] ? user[0].photoURL : avatar} alt="" />
            </div>
            {isMenu && (
              <div className="header__options_menu">
                <span onClick={handleLogin}>Login</span>
                <span onClick={handleLogout}>Logout</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
