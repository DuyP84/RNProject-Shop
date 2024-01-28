import { GETALL_PROFILE, GETDETAIL_PROFILE, UPDATE_PROFILE } from "../actions/profileAction";

const initialState = {
  profiles: [],
  item: {},

};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALL_PROFILE:
      console.log('GETALL_PROFILE',action.payload);
      return {
        ...state,
        profiles: [...action.payload],
      };

        case UPDATE_PROFILE:
        console.log('updated profile', action.payload);
        return {
          ...state,
          
        };
        case GETDETAIL_PROFILE:
       //console.log("GET DETAIL ", action.payload);
      return {
        ...state,
        item: action.payload,
      };
       
    default:
      console.log("default action");
      return { ...state };
  }
};

