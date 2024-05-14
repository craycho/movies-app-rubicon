import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { detailsActions } from "../store/details-slice";
import { Series, Movie } from "../util/type-definitions";
import { posterBaseURL } from "../util/url-helpers";

import noImageAvailable from "../assets/imgs/no-image-available.png";
import "../assets/styles/homepage-styles.css";

export default function HomepageItem({
  itemData,
  series,
}: {
  itemData: Movie | Series;
  series: boolean;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const missingBackdrop = itemData.backdrop_path == null;

  const handleDetailsClick = () => {
    dispatch(detailsActions.setCurrentDetails(itemData));
    sessionStorage.setItem("currentItem", JSON.stringify(itemData));
    navigate("/details");
  };

  if (series) {
    const seriesItem = itemData as Series;
    return (
      <div className="movie-container" onClick={handleDetailsClick}>
        <img
          className="movie-poster"
          src={`${
            missingBackdrop
              ? noImageAvailable
              : posterBaseURL + seriesItem.backdrop_path
          }`}
          alt="Movie Poster"
        />
        <div className="movie-name">{seriesItem.name}</div>
      </div>
    );
  } else {
    const movieItem = itemData as Movie;
    return (
      <div className="movie-container" onClick={handleDetailsClick}>
        <img
          className="movie-poster"
          src={`${
            missingBackdrop
              ? noImageAvailable
              : posterBaseURL + movieItem.backdrop_path
          }`}
          alt="Movie Poster"
        />
        <div className="movie-name">{movieItem.title}</div>
      </div>
    );
  }
}
