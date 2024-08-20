import { Route, Routes } from "react-router-dom";
import { Login, Signup} from "./pages";
import Dashboard from "./pages/Dashboard";
import ChildrenPage from "./pages/Children";
import TeacherPage from "./pages/Teacher";
import GuardianPage from "./pages/Guardian";
import AppointmentPage from "./pages/Appointment";


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/children" element={<ChildrenPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/guardian" element={<GuardianPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
        </Routes>
    </div>
  );
}

export default App;
