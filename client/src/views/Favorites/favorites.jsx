import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import binIcon from "../../icons/bin.png"

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
        const response = await axios.get(`http://localhost:3001/favorites/user`,{params:{userId}});
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
    <div className="bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Tus Productos Favoritos</h2>
      <div className="flex items-center justify-between py-2">
        <span className="flex-1">Nombre del Producto</span>
      </div>
      {favoriteProducts?.map((item) => (
        <div key={item.favoriteId} className="flex items-center justify-between py-2 space-y-2">
          <span className="flex items-center flex-1">
            <img src={item.image} alt={item.name} className="mr-2" style={{ maxWidth: '50px', maxHeight: '50px' }} />
            {item.name}
          </span>
          <button onClick={() => handleRemoveFromFavorites(item.favorited)} className="ml-2">
            <img src={binIcon} alt="quitar" style={{ maxWidth: '20px', maxHeight: '20px' }} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
