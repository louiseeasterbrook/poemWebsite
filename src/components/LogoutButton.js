import { useAuth0 } from "@auth0/auth0-react";
import "./loginButton.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="logout-btn"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
