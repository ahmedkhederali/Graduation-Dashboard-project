import "./App.css";
import AddChanllenge from "./Components/Add Chanllenge/AddChanllenge";
import LargeWithNewsletter from "./Components/Footer/Footer";
import SidebarWithHeader from "./Components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserChallenge from "./Components/User Challenge/UserChallenge";
import AddProblem from "./Components/Add Problem/AddProblem";
import Comments from "./Components/Comments/Comments";
import Evaluation from "./Components/Evaluation/Evaluation";
import Complaint from "./Components/Complaint/Complaint";
import Home from "./Components/Home/Home";
import Help from "./Components/Help/Help";
import Contact from "./Components/ContactUs/ContactUs";
import SimpleThreeColumns from "./Components/AboutUs/AboutUs";

function App() {
  return (
    <Router>
        <SidebarWithHeader />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/aboutus" element={<SimpleThreeColumns />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/help" element={<Help />} />

          <Route path="/add_chanllenge" element={<AddChanllenge />} />
          <Route path="/user_chanllenge" element={<UserChallenge />} />
          <Route path="/add_problem" element={<AddProblem />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/complaint" element={<Complaint />} />

        </Routes>
        <LargeWithNewsletter />

    </Router>
  );
}

export default App;
