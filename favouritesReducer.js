export const initialState = {
  favourites: JSON.parse(localStorage.getItem("favourites")) || []
};

export function favouritesReducer(state, action) {

  switch (action.type) {

    case "TOGGLE_FAV":

      const exists = state.favourites.includes(action.payload);

      let updated;

      if (exists) {
        updated = state.favourites.filter(
          id => id !== action.payload
        );
      } else {
        updated = [...state.favourites, action.payload];
      }

      localStorage.setItem(
        "favourites",
        JSON.stringify(updated)
      );

      return { favourites: updated };

    default:
      return state;
  }
}