import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { resultsActions } from "../store/results-slice";

import {
  baseURL,
  API_KEY,
  GET_TOP_SERIES,
  GET_TOP_MOVIES,
  SEARCH_MOVIES,
  SEARCH_SERIES,
} from "../util/url-helpers";
import { Series, Movie } from "../util/type-definitions";
import HomepageItem from "../components/HomepageItem";

import "../assets/styles/homepage-styles.css";
import "../assets/styles/circular-progress.css";

function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<"series" | "movies">("series");
  const [currentInput, setCurrentInput] = useState<string>("");

  const dispatch = useDispatch();
  const currentResults = useSelector((state: RootState) => state.results);

  useEffect(() => {
    const getResults = async () => {
      try {
        if (currentInput.length >= 3) {
          try {
            setIsLoading(true);

            const response = await axios.get(
              `${baseURL}${
                currentTab === "series" ? SEARCH_SERIES : SEARCH_MOVIES
              }?${currentInput}${API_KEY}`
            );
            dispatch(resultsActions.setResults(response.data.results));

            setIsLoading(false);
          } catch (error) {
            console.error("Error displaying search results. Reason: ", error);
          }
        } else {
          setIsLoading(true);

          const response = await axios.get(
            `${baseURL}${
              currentTab === "series" ? GET_TOP_SERIES : GET_TOP_MOVIES
            }?${API_KEY}`
          );

          dispatch(
            resultsActions.setResults(response.data.results.slice(0, 10))
          ); // Auto-parse

          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          "There was some trouble fetching the movies/series data. Error: ",
          error
        );
      }
    };
    getResults();
  }, [currentTab, currentInput]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTimer = setTimeout(() => {
      setCurrentInput(event.target.value);
    }, 1000);

    return () => {
      clearTimeout(inputTimer);
    };
  };

  return (
    <main className="homepage-layout">
      <div className="tabs-container">
        <button
          className={`tab-btn ${currentTab === "series" ? "active" : ""}`}
          data-tab="series"
          onClick={() => setCurrentTab("series")}
        >
          TV Series
        </button>
        <button
          className={`tab-btn ${currentTab === "movies" ? "active" : ""}`}
          data-tab="movies"
          onClick={() => setCurrentTab("movies")}
        >
          Movies
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder={`Search for ${currentTab}...`}
          onChange={handleInput}
        />
      </div>

      <div className="tab-content">
        <div>
          <h2>{currentTab === "series" ? "TV Series" : "Movies"}</h2>
          {isLoading ? (
            <progress className="progress-circular" />
          ) : (
            <div className="results-layout">
              {currentResults.length > 0 ? (
                currentResults.map((item: Series | Movie) => (
                  <HomepageItem
                    itemData={
                      currentTab === "series"
                        ? (item as Series)
                        : (item as Movie)
                    }
                    series={currentTab === "series"}
                    key={item.id}
                  />
                ))
              ) : (
                <h2>No results found for "{currentInput}"...</h2>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
