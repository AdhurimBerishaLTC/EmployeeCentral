import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Navbar from "./components/layout/Navbar";
import UserPage from "./pages/UserPage";
import DepartmentPage from "./pages/DepartmentPage";
import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/department" element={<DepartmentPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
