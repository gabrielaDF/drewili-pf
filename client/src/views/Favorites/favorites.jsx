import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import binIcon from "../../icons/bin.png"
import { NavLink } from 'react-router-dom';

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const userSessionFromCookies = Cookies.get("userSession");
  const userSession = userSessionFromCookies
    ? JSON.parse(userSessionFromCookies)
    : null;

  const { login } = useSelector((state) => state.login);

  const userId = (userSession && userSession.userId) || (login && login.userSession.userId);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/favorites/user`, { params: { userId } });
        setFavoriteProducts(response.data.favorites);
      } catch (error) {
        console.error('Error al obtener productos favoritos:', error);
      }
    };

    fetchFavoriteProducts();
  }, [userId]);

  const handleRemoveFromFavorites = async (favorited) => {
    try {
      await axios.delete(`http://localhost:3001/favorites/${favorited}`);

      setFavoriteProducts((prevFavoriteProducts) => prevFavoriteProducts.filter((item) => item.favorited !== favorited));
    } catch (error) {
      console.error('Error al quitar producto de favoritos:', error);
    }
  };



  return (
    <div className="text-black p-8 rounded-lg shadow-lg h-90vh">
      <h2 className="text-3xl font-semibold mb-6">Tus Productos Favoritos</h2>
      {favoriteProducts?.map((item) => (
        <div key={item.favorited} className="flex items-center justify-between py-3 border-b border-chiliRed">
          <NavLink to={`/detail/${item.id}`} className="flex items-center space-x-4">
            <img src={item.image} alt={item.name} className="w-36 h-36 rounded-md" />
            <span className="text-lg">{item.name}</span>
          </NavLink>

          <button
            onClick={() => handleRemoveFromFavorites(item.favorited)}
            className="text-red-500 hover:text-red-700 transition duration-300"
          >
            <img src={binIcon} alt="quitar" className="w-6 h-6" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
