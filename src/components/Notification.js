import "./notification.css";

const Notification = ({ message }) => {
  // if (show) {
  return (
    <div className="notification-container">
      <p>{message}</p>
    </div>
  );
  // } else {
  //   return <> </>;
  // }
};

export default Notification;
