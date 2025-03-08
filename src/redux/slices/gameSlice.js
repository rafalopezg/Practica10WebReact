import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGames } from '../../services/api';

export const loadGames = createAsyncThunk('games/loadGames', async (page = 1, pageSize = 12) => {
  const data = await fetchGames(page, pageSize);
  return data.results;
});

const gameSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    loading: false,
    error: null
  },
  reducers: {
    sortGames: (state, action) => {
      const { criteria } = action.payload;
      state.games.sort((a, b) => {
        if (criteria === 'rating') {
          return b.rating - a.rating;
        } else if (criteria === 'release_date') {
          return new Date(b.released) - new Date(a.released);
        } else if (criteria === 'alphabetical') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(loadGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { sortGames } = gameSlice.actions;

export default gameSlice.reducer;
