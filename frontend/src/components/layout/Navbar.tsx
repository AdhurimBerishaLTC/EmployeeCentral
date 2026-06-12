import { Link } from "react-router";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { User } from "../../types/user";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-background border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <ul className="flex gap-4 items-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/departments">Departments</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>

            {localStorage.getItem("token") ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Button onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/register")}>Sign Up</Button>
              </>
            )}
          </ul>

          {user && (
            <p>
              Welcome, {user.firstName} {user.lastName}
            </p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
