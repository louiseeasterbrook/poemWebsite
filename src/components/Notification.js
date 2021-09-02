import "./notification.css";

const Notification = ({ message, show }) => {
  if (show) {
    return (
      <div className="notificationContainer">
        <p>{message}</p>
      </div>
    );
  } else {
    return <> </>;
  }
};

export default Notification;
