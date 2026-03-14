import { useState, useReducer, useMemo, useCallback } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import {
  favouritesReducer,
  initialState
} from "../reducer/favouritesReducer";

export default function Gallery() {

  const { photos, loading, error } = useFetchPhotos();

  const [search, setSearch] = useState("");

  const [state, dispatch] = useReducer(
    favouritesReducer,
    initialState
  );

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {

    return photos.filter(photo =>
      photo.author
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [photos, search]);

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <div className="animate-spin h-10 w-10 border-4 border-black rounded-full border-t-transparent"></div>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500">
        {error}
      </p>
    );

  return (
    <div className="p-6">

      <input
        type="text"
        placeholder="Search by author..."
        onChange={handleSearch}
        className="border p-2 mb-6 w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {filteredPhotos.map(photo => {

          const isFav = state.favourites.includes(photo.id);

          return (

            <div
              key={photo.id}
              className="border rounded shadow"
            >

              <img
                src={photo.download_url}
                alt={photo.author}
                className="w-full h-60 object-cover"
              />

              <div className="p-3 flex justify-between items-center">

                <p>{photo.author}</p>

                <button
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_FAV",
                      payload: photo.id
                    })
                  }
                >
                  {isFav ? "❤️" : "🤍"}
                </button>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}