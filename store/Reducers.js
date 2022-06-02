import ACTIONS from "./Actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.VOTEPOWER:
      return {
        ...state,
        votepowerR: action.payload,
      };
    case ACTIONS.VOTEWEİGTH:
      return {
        ...state,
        votweigthR: action.payload,
      };
    case ACTIONS.STEEMDLR:
      return {
        ...state,
        steemdlrR: action.payload,
      };
    case ACTIONS.BUSDDLR:
      return {
        ...state,
        busddlrR: action.payload,
      };
    case ACTIONS.SBDDLR:
      return {
        ...state,
        sdbdlrR: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
