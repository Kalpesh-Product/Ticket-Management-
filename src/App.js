import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Flowbite } from "flowbite-react";
import { useEffect } from "react";
import UserPage from "./pages/UserPage";

import AdminPage from "./pages/AdminPage";
import MemberPage from "./pages/MemberPage";
import AdminClosedTickets from "./pages/AdminClosedTickets";
import AdminMembers from "./pages/AdminMembers";
import AdminMessages from "./pages/AdminMessages";
import AdminTickets from "./pages/AdminTickets";
import MemberAssignedTickets from "./pages/MemberAssignedTickets";
import MemberClosedTickets from "./pages/MemberClosedTickets";
import MemberMessages from "./pages/MemberMessages";
import LoginAdmin from "./pages/LoginAdmin";
import LoginMember from "./pages/LoginMember";
import LogoutAdmin from "./pages/LogoutAdmin";
import LogoutMember from "./pages/LogoutMember";
import AssignMember from "./pages/AssignMember";
import LoginUser from "./pages/LoginUser";
import LogoutUser from "./pages/LogoutUser";
import RegisterUser from "./pages/RegisterUser";
import AdminReport from "./pages/AdminReport";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserTickets from "./pages/UserTickets";
import MemberAcceptedTickets from "./pages/MemberAcceptedTickets";
import AdminUnresolvedTickets from "./pages/AdminUnresolvedTickets";

function App() {
  // code for initial dark theme
  useEffect(() => {
    // Set the initial theme to dark
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Flowbite>
          <ToastContainer />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/user-page/:email" element={<UserPage />} />
            <Route path="/user-tickets/:email" element={<UserTickets />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/login-member" element={<LoginMember />} />
            <Route path="/login-user" element={<LoginUser />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/logout-admin" element={<LogoutAdmin />} />
            <Route path="/logout-member" element={<LogoutMember />} />
            <Route path="/logout-user" element={<LogoutUser />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/admin-closed-tickets"
              element={<AdminClosedTickets />}
            />
            <Route
              path="/admin-unresolved-tickets"
              element={<AdminUnresolvedTickets />}
            />
            <Route path="/admin-members" element={<AdminMembers />} />
            <Route path="/admin-messages" element={<AdminMessages />} />
            <Route path="/admin-tickets" element={<AdminTickets />} />
            <Route path="/admin-report" element={<AdminReport />} />
            {/* <Route path="/member/:email" element={<MemberPage />} /> */}
            <Route
              path="/member-assigned-tickets/:email"
              element={<MemberAssignedTickets />}
            />
            <Route
              path="/member-accepted-tickets/:email"
              element={<MemberAcceptedTickets />}
            />
            <Route
              path="/member-closed-tickets"
              element={<MemberClosedTickets />}
            />
            <Route path="/member-messages" element={<MemberMessages />} />
            <Route path="/assign-member/:id" element={<AssignMember />} />
          </Routes>
        </Flowbite>
      </BrowserRouter>
    </div>
  );
}

export default App;
