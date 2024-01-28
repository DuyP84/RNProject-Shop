import { GETALL, CREATE, EDIT, DELETE, GETDETAIL, SEARCH } from "../actions/gameActions";

const initialState = {
  games: [],
  item: {},
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALL:
      // console.log(action.type)
      console.log(' GET ALL',action.payload);
      return {
        ...state,
        games: [...action.payload],
      };

      case CREATE:
        console.log("added successfully", action.payload);
        return {
          ...state,
          games: [...state.games, action.payload],
        };

        case EDIT:
        console.log('updated', action.payload);
        return {
          ...state,
          
        };
        
        case DELETE: {
          console.log("deleted", action.payload);
        return {
        ...state,
        games: state.games.filter((item) => item.id !== action.payload),
        };
        };

        case GETDETAIL:
      // console.log("GET DETAIL ", action.payload);
      return {
        ...state,
        item: action.payload,
      };

      case SEARCH:
        return {
          ...state,
          games: [...action.payload],
        };
      
       
    default:
      console.log("default action");
      return { ...state };
  }
};

