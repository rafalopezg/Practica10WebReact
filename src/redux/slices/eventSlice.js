import { createSlice } from '@reduxjs/toolkit';
import { events } from '../services/events';

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    userEvents: JSON.parse(localStorage.getItem('userEvents')) || []
  },
  reducers: {
    setEvents: (state) => {
      state.events = events;
    },
    toggleUserEvent: (state, action) => {
      const eventId = action.payload;
      const isAlreadyParticipating = state.userEvents.includes(eventId);

      if (isAlreadyParticipating) {
        state.userEvents = state.userEvents.filter((id) => id !== eventId);
      } else {
        state.userEvents.push(eventId);
      }

      // Guardar en localStorage
      localStorage.setItem('userEvents', JSON.stringify(state.userEvents));
    }
  }
});

export const { setEvents, toggleUserEvent } = eventSlice.actions;

export default eventSlice.reducer;
