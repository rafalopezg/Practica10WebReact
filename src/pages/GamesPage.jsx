import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadGames, sortGames } from '../redux/gameSlice';

const GamesPage = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.games);
  const loading = useSelector((state) => state.games.loading);

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const handleSort = (criteria) => {
    dispatch(sortGames({ criteria }));
  };

  return (
    <div>
      <button onClick={() => handleSort('rating')}>Sort by Rating</button>
      <button onClick={() => handleSort('release_date')}>Sort by Release Date</button>
      <button onClick={() => handleSort('alphabetical')}>Sort Alphabetically</button>

      {loading ? <div>Loading...</div> : (
        <ul>
          {games.map((game) => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GamesPage;
