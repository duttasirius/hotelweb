import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContex";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);

  const { user, logout } = useAuth();
  const { isOwner, setShowHotelReg } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    setIsScrolled(location.pathname !== "/" || window.scrollY > 10);

    const handleScroll = () => {
      setIsScrolled(location.pathname !== "/" || window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between px-4 transition-all duration-500 md:px-16 lg:px-24 xl:px-32 ${
        isScrolled
          ? "bg-white/80 py-3 text-gray-700 shadow-md backdrop-blur-lg md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      <Link to="/" onClick={() => setIsMenuOpen(false)}>
        <img src={assets.logo} className="h-9" alt="QuickStay" />
      </Link>

      <div className="hidden items-center gap-4 md:flex lg:gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {link.name}
            <span
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 transition-all duration-300 group-hover:w-full`}
            />
          </Link>
        ))}

        {user && (
          <button
            type="button"
            onClick={() => (isOwner ? navigate("/owner") : setShowHotelReg(true))}
            className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}
      </div>

      <div className="hidden items-center gap-4 md:flex">
        {user ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAccountMenu((current) => !current)}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur"
              aria-expanded={showAccountMenu}
              aria-haspopup="menu"
            >
              <img
                src={user.image}
                alt={user.username}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden max-w-28 truncate text-sm font-semibold text-gray-800 lg:block">
                {user.username}
              </span>
              <span className="px-1 text-xs text-gray-500">⌄</span>
            </button>

            {showAccountMenu && (
              <div className="absolute right-0 top-12 z-[80] w-52 overflow-hidden rounded-2xl border border-gray-200 bg-white p-1 shadow-2xl">
                <button
                  type="button"
                  onClick={() => navigate("/my-bookings")}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  My Bookings
                </button>
                {isOwner && (
                  <button
                    type="button"
                    onClick={() => navigate("/owner")}
                    className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Owner Dashboard
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/auth")}
            className={`ml-4 rounded-full px-8 py-2.5 transition-all duration-300 ${
              isScrolled ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            Login
          </button>
        )}

        <img src={assets.searchIcon} className="h-9" alt="Search" />
      </div>

      <button
        type="button"
        onClick={() => setIsMenuOpen((current) => !current)}
        className="flex items-center gap-3 md:hidden"
        aria-label="Toggle navigation menu"
      >
        <img
          src={isMenuOpen ? assets.closeIcon : assets.menuIcon}
          className="h-5"
          alt=""
        />
      </button>

      <div
        className={`fixed left-0 top-0 z-[70] h-screen w-full bg-white text-base transition-all duration-500 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-6 font-medium text-gray-800">
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <img src={assets.closeIcon} className="h-6" alt="" />
          </button>

          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}

          {user && (
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                isOwner ? navigate("/owner") : setShowHotelReg(true);
              }}
              className="rounded-full border px-5 py-2 text-sm"
            >
              {isOwner ? "Dashboard" : "List Your Hotel"}
            </button>
          )}

          {user ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/my-bookings");
                }}
                className="rounded-full bg-gray-100 px-5 py-2.5 text-sm"
              >
                My Bookings
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-black px-5 py-2.5 text-sm text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/auth");
              }}
              className="rounded-full bg-black px-8 py-2.5 text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
