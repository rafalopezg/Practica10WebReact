import { createSlice } from '@reduxjs/toolkit';
import { fetchGames } from '../services/api';

const gameSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    currentIndex: 0,
  },
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
  },
});

export const { setGames, setCurrentIndex } = gameSlice.actions;

export default gameSlice.reducer;
