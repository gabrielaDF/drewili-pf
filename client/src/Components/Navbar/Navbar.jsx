import React, { useState, useRef, useEffect } from "react";
import { NavLink, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { AiOutlineMore } from "react-icons/ai";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { postLogout } from "../../reduxToolkit/Login/logoutThunks";
import cartIcon from "../../icons/carrito-de-compras.png";
import { useAuth0 } from "@auth0/auth0-react";
import { postGoogle } from "../../reduxToolkit/User/userThunks";
import LogoutButton from "../../Components/LogoutButton";

function Navbar({ setActualPage }) {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const userGoogle = {
        userName: user.name,
        email: user.email,
        authId: user.sub,
      };

      dispatch(postGoogle(userGoogle));
      Cookies.set("userGoogle", JSON.stringify(userGoogle));
    }
  }, [dispatch, isAuthenticated, user]);

  const { usersGoogle } = useSelector((state) => state.users);

  if (usersGoogle) {
    const currentData = Cookies.get("userGoogle")
      ? JSON.parse(Cookies.get("userGoogle"))
      : {};
    const newData = {
      ...currentData,
      id: usersGoogle.id,
    };
    Cookies.set("userGoogle", JSON.stringify(newData));
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Obtener la información de sesión desde las cookies
  const userSessionFromCookies = Cookies.get("userSession");
  const userGoogleFromCookies = Cookies.get("userGoogle");

  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;
  const userGoogleSession = userGoogleFromCookies
    ? JSON.parse(userGoogleFromCookies)
    : null;

  // Combina la información del estado Redux y las cookies
  const combinedUserSession =
    userSession && userSession.username
      ? userSession.username
      : login && login.userSession
      ? login.userSession.username
      : isAuthenticated && user.name
      ? user.name
      : userGoogleSession
      ? userGoogleSession.userName
      : null;

  const handleclick = async () => {
    if (login && login.userSession) {
      try {
        await dispatch(postLogout());
        navigate("/");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    } else {
      Cookies.remove("userSession");
      Cookies.remove("userGoogle");
      navigate("/");
    }
  };
  const id =
    (userSession && userSession.userId) ||
    (login && login.userSession.userId) ||
    (usersGoogle && usersGoogle.id) ||
    (userGoogleSession && userGoogleSession.id);
  const role =
    (userSession && userSession.role) ||
    (login && login.userSession.role) ||
    (usersGoogle && usersGoogle.role) ||
    (userGoogleSession && userGoogleSession.role);
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-whiteSmoke shadow-xl">
      <div className="flex items-center justify-between text-onyx">
        <NavLink to="/" className="flex items-center">
          <div className="w-20 h-20 rounded ml-40 mt-4">
            <img src="\logoOriginal.png" alt="drewili" />
          </div>
        </NavLink>
        <Routes>
          <Route
            path="/"
            element={
              location.pathname === "/" && (
                <Searchbar
                  className="mx-auto"
                  setActualPage={(num) => setActualPage(num)}
                />
              )
            }
          />
        </Routes>
        <div className="flex space-x-2 mr-7">
          {combinedUserSession ? (
            <div className="flex space-x-3 text-chiliRed items-center">
              <div className="relative group">
                <div className="flex items-center space-x-4">
                  <img
                    src={cartIcon}
                    alt="shopping-cart-icon"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => navigate("/shoppingcart")}
                  />
                  <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
                    <p onClick={toggleDropdown} className="flex items-center">
                      Bienvenido, {combinedUserSession}! <AiOutlineMore />
                    </p>
                  </h1>

                  {/* Botón de Favoritos */}
                  <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
                    <NavLink
                      to="/favorites"
                      className="text-chiliRed hover:underline"
                    >
                      Favoritos
                    </NavLink>
                  </h1>
                </div>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 bg-white border rounded shadow-md text-chiliRed"
                  >
                    <ul className="py-1">
                      <li className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                        <NavLink
                          to={`/userprofile/${id}`}
                          className="text-chiliRed hover:underline"
                        >
                          Ver Perfil
                        </NavLink>
                      </li>
                      
                      <li className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                        <NavLink
                         to={`/history/${id}`}   
                          className="text-chiliRed hover:underline"
                        >
                          Historial de Compras
                        </NavLink>
                      </li>
                      
                      {role === "admin" && (
                        <li className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                          <NavLink
                            to="/dashboard"
                            className="text-chiliRed hover:underline"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                      )}
                      {isAuthenticated && (
                        <li>
                          <LogoutButton />
                        </li>
                      )}
                      {!isAuthenticated && (
                        <li
                          className="cursor-pointer py-2 px-4 hover:bg-gray-200"
                          onClick={handleclick}
                        >
                          Cerrar Sesión
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex space-x-1">
              <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
                <NavLink
                  to="/userform"
                  className="text-chiliRed hover:text-onyx"
                >
                  Regístrate
                </NavLink>
              </h1>
              <span className="text-chiliRed">|</span>
              <h1 className="transition duration-300 hover:text-onyx cursor-pointer">
                <NavLink
                  to="/userlogin"
                  className="text-chiliRed hover:text-onyx"
                >
                  Ingresa
                </NavLink>
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
