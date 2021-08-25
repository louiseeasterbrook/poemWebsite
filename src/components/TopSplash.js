import "./topSplash.css";

const TopSplash = () => {
  return (
    <div className="topSplashContainer">
      <div className="leftSplash halfs">
        <h2>Read Poems</h2>
        <h2>Share Poems</h2>
      </div>
      <div className="rightSplash halfs">
        <div className="circle">
          <div className="paper1 paper">
            <p>_________</p>
            <p>_________</p>
            <p>_________</p>
            <p>_________</p>
            <p>_________</p>
          </div>
          <div className="paper2 paper">
            <p>___________</p>
            <p>_________</p>
            <p>_________</p>
            <p>_________</p>
            <p>_________</p>
          </div>
          <div className="paper3 paper">
            <p>_________</p>
            <p>_________</p>
            <p>_________</p>
            <p>_________</p>
            <p>_________</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSplash;
