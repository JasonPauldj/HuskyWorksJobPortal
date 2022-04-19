import "./App.scss";
import Navbar from "./components/boilerplate/navbar/Navbar";
import LeftSideBar from "./components/boilerplate/left_side_bar/LeftSideBar";
import MainSection from "./components/boilerplate/main_section/MainSection";
import RightSideBar from "./components/boilerplate/right_side_bar/RightSideBar";

function App() {
  return (
    <div className="prbg">
      <div className="flex-horizontal">
        <div className="layout-1-4-body-section-left my-1">
          <LeftSideBar />
        </div>
        <div className="layout-1-4-body-section-right my-1">
          {/* <div className="body-section-search">
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
          </div> */}
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
