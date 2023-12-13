import {
  GET_VIDEO_GAMES,
  GET_GENRES,
  GET_VIDEO_GAME_ID,
  PAGINATED,
  SEARCH_GAME,
  FILTER_BY_GENRES,
  FILTER_ORIGIN,
  ORDER_BY_RATING,
  ORDER_CARDS,
  POST_GAME,
} from "../Actions/actions";

const initialState = {
  allVideoGames: [],
  allVideogamesBackUp: [],
  loadingState: true,
  currentPage: 0,
  allGenres: [],
  videoGameId: [],
  selectedGenre: null,
  selectedOrigin: "All",
  searchQuery: "",
  orderByRating: null,
};

const rootReducer = (state = initialState, action) => {
  const ITEMS_PER_PAGE = 12;

  switch (action.type) {
    case GET_VIDEO_GAMES:
      return {
        ...state,
        allVideoGames: [...action.payload].slice(0, ITEMS_PER_PAGE),
        allVideogamesBackUp: action.payload,
        loadingState: false,
      };
    case POST_GAME:
      return {
        ...state,
        allVideoGames: [...state.allVideoGames, action.payload],
      };
    case GET_GENRES:
      return {
        ...state,
        allGenres: action.payload,
      };
    case GET_VIDEO_GAME_ID:
      return {
        ...state,
        videoGameId: action.payload,
        loadingState: false,
      };

    case SEARCH_GAME:
      const search = action.payload.toLowerCase();
      const VideoGameFilter = state.allVideogamesBackUp.filter(
        (game) => game && game.name && game.name.toLowerCase().includes(search)
      );
      return {
        ...state,
        allVideogamesBackUp: VideoGameFilter,
        allVideoGames: VideoGameFilter.slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
      };
    case PAGINATED:
      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;

      if (
        action.payload === "next" &&
        next_page * ITEMS_PER_PAGE < state.allVideogamesBackUp.length
      ) {
        const firstIndex = next_page * ITEMS_PER_PAGE;
        return {
          ...state,
          allVideoGames: state.allVideogamesBackUp.slice(
            firstIndex,
            firstIndex + ITEMS_PER_PAGE
          ),
          currentPage: next_page,
        };
      } else if (action.payload === "prev" && prev_page >= 0) {
        const firstIndex = prev_page * ITEMS_PER_PAGE;
        return {
          ...state,
          allVideoGames: state.allVideogamesBackUp.slice(
            firstIndex,
            firstIndex + ITEMS_PER_PAGE
          ),
          currentPage: prev_page,
        };
      }
      return state;
    case "NUMBER-PAGE":
      const index = action.payload * ITEMS_PER_PAGE;
      return {
        ...state,
        allVideoGames: [...state.allVideogamesBackUp].slice(
          index,
          index + ITEMS_PER_PAGE
        ),
        currentPage: action.payload,
      };

    case FILTER_BY_GENRES:
      const selectedGenre = action.payload;
      const filteredGameByGenre = state.allVideogamesBackUp.filter(
        (game) => game && game.genres === selectedGenre
      );
      return {
        ...state,
        allVideoGames: filteredGameByGenre.slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
        selectedGenre,
      };

    case FILTER_ORIGIN:
      let filterorigin;
      if (action.payload === "All") {
        filterorigin = state.allVideogamesBackUp;
      }

      if (action.payload === "Local") {
        filterorigin = state.allVideogamesBackUp.filter(
          (allVideoGames) =>
            allVideoGames && typeof allVideoGames.id === "string"
        );
      }

      if (action.payload === "Api") {
        filterorigin = state.allVideogamesBackUp.filter(
          (allVideoGames) =>
            allVideoGames && typeof allVideoGames.id === "number"
        );
      }

      return {
        ...state,
        allVideoGames: filterorigin.slice(0, ITEMS_PER_PAGE),
        selectedOrigin: action.payload,
        loadingState: false,
      };

    case ORDER_BY_RATING:
      const orderByRating = action.payload;
      let sortedGamesByRating;
      if (orderByRating === "Ascendente") {
        sortedGamesByRating = [
          ...state.allVideoGames.sort((a, b) => a.rating - b.rating),
        ];
      } else {
        sortedGamesByRating = [
          ...state.allVideoGames.sort((a, b) => b.rating - a.rating),
        ];
      }
      return {
        ...state,
        allVideoGames: sortedGamesByRating,
        orderByRating,
      };

    case ORDER_CARDS:
      const orderByName = action.payload;
      let orderedGamesByName;
      if (orderByName === "AZ") {
        orderedGamesByName = [...state.allVideogamesBackUp]
          .filter((game) => game && game.name)
          .sort((prev, next) =>
            prev.name.toLowerCase().localeCompare(next.name.toLowerCase())
          );
      } else {
        orderedGamesByName = [...state.allVideogamesBackUp]
          .filter((game) => game && game.name)
          .sort((prev, next) =>
            next.name.toLowerCase().localeCompare(prev.name.toLowerCase())
          );
      }
      return {
        ...state,
        allVideoGames: orderedGamesByName.slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
        orderByName,
      };

    case "SET_LOADING":
      return {
        ...state,
        loadingState: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
