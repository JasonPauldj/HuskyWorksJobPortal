import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import LeftSideBar from "./components/left_side_bar/LeftSideBar";
import MainSection from "./components/main_section/MainSection";
import RightSideBar from "./components/right_side_bar/RightSideBar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="body-section">
        <div className="body-section-left">
          <LeftSideBar />
        </div>
        <div className="body-section-right">
          <div className="body-section-search">
            <input
              type="text"
              name="searchKey"
              id="searchKey"
              placeholder="Job title or keyword"
              className="searchKey"
            />
            <input
              type="text"
              name="searchLoc"
              id="searchLoc"
              placeholder="Select Location"
              className="searchLoc"
            />
            <button>More</button>
          </div>
          <div className="body-section-right-content">
            <div className="body-section-right-main">
              <MainSection />
            </div>
            <div className="body-section-right-sidebar">
              <RightSideBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
