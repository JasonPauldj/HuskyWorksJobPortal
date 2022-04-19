import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import LeftSideBar from "./components/boilerplate/left_side_bar/LeftSideBar";
import MainSection from "./components/boilerplate/main_section/MainSection";
import RightSideBar from "./components/boilerplate/right_side_bar/RightSideBar";

function App() {
  return (
    <div className="prbg">
      <div className="flex-horizontal py-1">
        <div className="ly-1-3-1-bd-sec-left">
          <Navbar />
        </div>
        <div className="ly-1-3-1-bd-sec-right">
          <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
            <div className="ly-1-3-1-bd-sec-right-main">
            <MainSection />
            </div>
            <div className="ly-1-3-1-bd-sec-right-sidebar">
            <RightSideBar />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
