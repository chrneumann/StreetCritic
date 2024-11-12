import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export type MapState = {
  // Map center.
  center: { lng: number; lat: number };

  // Map zoom (integer).
  zoom: number;

  // Stops on the map.
  stops: { lng: number; lat: number }[];
};

const initialState: MapState = {
  center: { lng: 8.684966, lat: 50.110573 },
  zoom: 14,
  stops: [],
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    // Updates the map center.
    centerUpdated: (
      state,
      action: PayloadAction<{ lng: number; lat: number }>,
    ) => {
      state.center.lng = action.payload.lng;
      state.center.lat = action.payload.lat;
    },

    // Updates the map zoom (rounds to integer first).
    zoomUpdated: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },

    // Stop has been added.
    stopAdded: (
      state,
      action: PayloadAction<{ index: number; lng: number; lat: number }>,
    ) => {
      state.stops.splice(action.payload.index, 0, {
        lng: action.payload.lng,
        lat: action.payload.lat,
      });
    },

    // Stop has been changed.
    stopChanged: (
      state,
      action: PayloadAction<{ index: number; lng: number; lat: number }>,
    ) => {
      state.stops[action.payload.index].lng = action.payload.lng;
      state.stops[action.payload.index].lat = action.payload.lat;
    },

    // Stop has been removed.
    stopRemoved: (state, action: PayloadAction<number>) => {
      state.stops.splice(action.payload, 1);
    },

    // All stops have been removed.
    stopsResetted: (state) => {
      state.stops.length = 0;
    },
  },
});

export const {
  centerUpdated,
  zoomUpdated,
  stopAdded,
  stopRemoved,
  stopChanged,
  stopsResetted,
} = mapSlice.actions;
export const selectMapState = (state: RootState) => state.map;
export default mapSlice.reducer;
