import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();
  const isAdmin = userData?.role == "admin" ? true : false

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Blogs", slug: "/all-blogs", active: authStatus },
    { name: "Profile", slug: "/profile", active: authStatus },
    { name: "Users", slug: "/users", active: authStatus },
    { name: "Add Blog", slug: "/add-blog", active: authStatus },
    { name: "Admin Dashboard", slug: "/admin-dashboard", active: isAdmin },
  ];

  return (
    <header className="py-3 shadow-md bg-gray-900 text-gray-300">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/">
              <Logo size={50} /> {/* Adjusted logo size */}
            </Link>
          </div>

          {/* Navigation Menu */}
          <ul className="flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-5 py-2 text-sm font-medium transition-all duration-200 rounded-full hover:bg-blue-500 hover:text-white"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
