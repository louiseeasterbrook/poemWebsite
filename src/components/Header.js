import "./header.css";
import bookcaseImg from "../img/bookshelf.png";

const Header = ({ setOpenModal, isAuthenticated }) => {
  //triggered by 'add first poem' button
  const clickOpenBtn = () => {
    if (isAuthenticated) {
      setOpenModal(true);
    }
  };
  return (
    <div className="header-container">
      <div className="inner-header">
        <div className="header-img">
          <img src={bookcaseImg} alt="clipart bookmark" />
        </div>
        <div className="header-text">
          <h1 className="header-text-1">Express yourself</h1>
          <h1 className="header-text-2">With words</h1>
          <p>Explore the online bookshelf for poems, or post your own</p>

          <button
            onClick={clickOpenBtn}
            className={
              isAuthenticated ? "header-btn" : "header-btn no-login-btn"
            }
          >
            Add your first poem
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
