import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../../components/Cards/Cards";
import {
  getVideoGames,
  getGenres,
  paginatedGame,
  goToPageAction,
  filterByGenres,
  setLoading,
  orderCards,
  getGamesOrderRatingAc,
  filterOrigin,
} from "../../Redux/Actions/actions";
import { FiltrosBar } from "../../components/Filters/filters";
import styles from "./Home.module.css";




const Home = () => {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allVideoGames);
  const allGenres = useSelector((state) => state.allGenres);
  const loadingState = useSelector((state) => state.loadingState);
  const currentPage = useSelector((state) => state.currentPage);

  const handleFilter = (event) => {
    if (event.target.value === "Default") {
      dispatch(setLoading());
      dispatch(getVideoGames());
    }
    dispatch(filterByGenres(event.target.value));
  };

  const handleFilterOrigin = (event) => {
    dispatch(setLoading());
    dispatch(filterOrigin(event.target.value));
  };

  const gamesOrderAll = (event) => {
    event.preventDefault();
    if (event.target.value === "Default") {
      dispatch(setLoading());
      dispatch(getVideoGames());
    }
    dispatch(orderCards(event.target.value));
  };

  useEffect(() => {
    if (!allGames.length) {
      dispatch(setLoading());
      dispatch(goToPageAction(0));
      dispatch(getVideoGames());
      dispatch(getGenres());
    }
  }, [dispatch,loadingState, currentPage]);

  const paginate = useCallback((event) => {
    dispatch(paginatedGame(event.target.name));
  }, [dispatch]);

  const goToPage = (page) => {
    dispatch(paginatedGame(page));
  };

  const getGamesOrderRating = (event) => {
    if (event.target.value === "Default") {
      dispatch(setLoading());
      dispatch(getVideoGames());
    }
    dispatch(getGamesOrderRatingAc(event.target.value));
  };

  return (
    <div className={styles.container}>
      <FiltrosBar
        allGenres={allGenres}
        handleFilter={handleFilter}
        handleFilterOrigin={handleFilterOrigin}
        getGamesOrderRating={getGamesOrderRating}
        gamesOrderAll={gamesOrderAll}
        dispatch={dispatch}
      />

      <div className={styles.home}>
        <h2 className={styles.titleone}>WELCOME</h2>

        {!loadingState ? (
          <div>
            {allGames && allGames.length === 0 ? (
              <span>No hay elementos...</span>
            ) : (
              <div className={styles.cardcontainer}>
                <Cards cards={allGames} />
              </div>
            )}
          </div>
        ) : (
          <div className={styles.loading}>
            LOADING.....
            {/* <img src="https://i.gifer.com/Ao.gif" width={400} alt="" /> */}
          </div>
        )}

        <div className={styles.navbar}>
          <button name="prev" onClick={paginate} disabled={currentPage === 0}>
            Prev
          </button>

          {[0, 1, 2, 3, 4, 5, 6].map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              style={{ backgroundColor: currentPage === page && "red" }}
            >
              {page}
            </button>
          ))}
          <button name="next" onClick={paginate} disabled={currentPage === 6}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
