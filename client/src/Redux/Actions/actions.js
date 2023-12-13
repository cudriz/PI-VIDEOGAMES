import axios from "axios";

export const GET_VIDEO_GAMES = "GET_VIDEO_GAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_VIDEO_GAME_ID = "GET_VIDEO_GAME_ID";
export const PAGINATED = "PAGINATED";
export const SEARCH_GAME = "SEARCH_GAME";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const ORDER_BY_RATING = "ORDER_BY_RATING,";
export const ORDER_CARDS = "ORDER_CARDS";
export const POST_GAME = "POST_GAME";
export const RESET_STATE = "RESET_STATE";

export const getVideoGames = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/videogames/");
      const games = response.data;
      console.log("videogames ", games);
      dispatch({
        type: GET_VIDEO_GAMES,
        payload: games,
      });
    } catch (error) {
      console.log("no fue posible obtener los VideoGames");
    }
  };
};
export function getById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );
      const videoGameID = response.data;
      console.log(videoGameID, "action de id");
      return dispatch({
        type: GET_VIDEO_GAME_ID,
        payload: videoGameID,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/genres");
      const allGenres = response.data;
      return dispatch({
        type: GET_GENRES,
        payload: allGenres,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function goToPageAction(numberPage) {
  return {
    type: "NUMBER-PAGE",
    payload: numberPage,
  };
}

export function setLoading() {
  return {
    type: "SET_LOADING",
    payload: true,
  };
}

export function paginatedGame(order) {
  return (dispatch) => {
    try {
      dispatch({
        type: PAGINATED,
        payload: order,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
}

export function searchGames(name) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: SEARCH_GAME,
        payload: name,
      });
    } catch (error) {
      console.log("error al buscar");
    }
  };
}

export const filterByGenres = (genres) => {
  return {
    type: FILTER_BY_GENRES,
    payload: genres,
  };
};

export const filterOrigin = (status) => {
  return {
    type: FILTER_ORIGIN,
    payload: status,
  };
};

export const getGamesOrderRatingAc = (value) => {
  return {
    type: ORDER_BY_RATING,
    payload: value,
  };
};

export const orderCards = (order) => {
  return {
    type: ORDER_CARDS,
    payload: order,
  };
};

export const postGame = (state) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogames/",
        state
      );
      dispatch({
        type: POST_GAME,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};