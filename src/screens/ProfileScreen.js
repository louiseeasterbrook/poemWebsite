import "./profileScreen.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

//import components
import PoemItem from "../components/PoemItem";
import Loading from "../components/Loading";
import Notification from "../components/Notification";

const ProfileScreen = ({
  isAuthenticated,
  user,
  setSelectedPoem,
  setOpenDelModal,
  setOpenEditModal,
  profilePoems,
  setProfilePoems,
}) => {
  let history = useHistory();

  const [profileLoading, setProfileLoading] = useState(true);
  const [noPosts, setNoPosts] = useState(false);
  const [error, setError] = useState("");

  //Get profile data from server
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`/api/poems/profile/${user.sub}`)
        .then((response) => {
          setProfilePoems(response.data);
          setProfileLoading(false);

          if (response.data.length === 0) {
            setNoPosts(true);
          }
        })
        .catch((error) => {
          setError("Error loading Poems");
        });
    }
  }, [isAuthenticated, user.sub, setProfilePoems]);

  //check if user is logged in
  if (!isAuthenticated) {
    history.push("/");
  }

  return (
    <div className="profile-container">
      <div className="profile-inner">
        {isAuthenticated ? (
          <>
            <div className="profile-header">
              <div className="header-left">
                <img src={user.picture} alt="user" />
                <p>Posts by {user.name}</p>
              </div>

              {/* <div className="header-right">
                <button>Newest</button>
                <button>Oldest</button>
                <button>Popular</button>
              </div> */}
            </div>
            {profileLoading ? (
              <Loading />
            ) : error ? (
              <Notification message={error} />
            ) : noPosts ? (
              <p className="no-posts">No Posts</p>
            ) : (
              <>
                {profilePoems.map((el, i) => (
                  <PoemItem
                    key={i}
                    poem={el}
                    profile={true}
                    setSelectedPoem={setSelectedPoem}
                    setOpenDelModal={setOpenDelModal}
                    setOpenEditModal={setOpenEditModal}
                  />
                ))}
              </>
            )}
          </>
        ) : (
          <p>You must login to view this page</p>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
