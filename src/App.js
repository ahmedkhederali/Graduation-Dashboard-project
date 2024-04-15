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
import SoliderHome from "./Components/SoliderHome/SoliderHome";
import SoliderSlah from "./Components/SoliderSlah/SoliderSlah";
import AllSoliderHome from "./Components/AllSoliderHome/AllSoliderHome";
import ResetPasswordForm from "./Components/Login/Login";
import { useEffect, useState } from "react";
import AllSoliderSlah from "./Components/AllSoliderSlah/AllSoliderSlah";


function App() {
  const [admin,setAdmin]=useState(false)
  const isAdminLoggedIn = !!localStorage.getItem('admin');
  useEffect(()=>{
    if(admin){
      localStorage.setItem('admin',true)
    }
  },[isAdminLoggedIn  ])
if(!isAdminLoggedIn &&  !admin){
  return (<Router><ResetPasswordForm setAdmin={setAdmin} /></Router>)
}else{
  return (
    <Router>
        <SidebarWithHeader setAdmin={setAdmin}/>
        <Routes>
          <Route path="/" element={<AddChanllenge />} />
          <Route path="/user_chanllenge" element={<UserChallenge />} />
          <Route path="/solider_home" element={<SoliderHome />} />
          <Route path="/solider_slah" element={<SoliderSlah/>} />
          <Route path="/add_problem" element={<AddProblem />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/allSoliderHomes" element={<AllSoliderHome />} />
          <Route path="/allSoliderSlah" element={<AllSoliderSlah/>} />

        </Routes>
        {/* <LargeWithNewsletter /> */}

    </Router>
  );
}
}

export default App;
