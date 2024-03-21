import "./App.css";
import LargeWithNewsletter from "./Components/Footer/Footer";
import SidebarWithHeader from "./Components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserChallenge from "./Components/User Challenge/UserChallenge";
import AddProblem from "./Components/Departments/AddProblem";
import Comments from "./Components/DisplaySoliderInfo/Comments";
import Evaluation from "./Components/Evaluation/Evaluation";
import Complaint from "./Components/Complaint/Complaint";
import AddChanllenge from "./Components/Solider/AddChanllenge";


function App() {
  return (
    <Router>
        <SidebarWithHeader />
        <Routes>
          <Route path="/add_chanllenge" element={<AddChanllenge />} />
          <Route path="/user_chanllenge" element={<UserChallenge />} />
          <Route path="/add_problem" element={<AddProblem />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/complaint" element={<Complaint />} />

        </Routes>
        {/* <LargeWithNewsletter /> */}

    </Router>
  );
}

export default App;
