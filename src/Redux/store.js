import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxSaga from "redux-saga";
import rdcAllCinema from "./Reducers/rdcAllCinema";
import rdcMovieDetail from "./Reducers/rdcMovieDetail";
import rdcMovieList from "./Reducers/rdcMovieList";
import rdcSeatPlant from "./Reducers/rdcSeatPlant";
import rdcTicket from "./Reducers/rdcTicket";
import rdcUser from "./Reducers/rdcUser";
import mySaga from "./Saga/mySaga";
import rdcShowPopup from "./Reducers/rdcShowPopup";

const middleware = reduxSaga()
const globalState = combineReducers({
    movieManage: rdcMovieList,
    movieDetailManage: rdcMovieDetail,
    seatPlantManage: rdcSeatPlant,
    ticketManage: rdcTicket,
    allCinemaManage: rdcAllCinema,
    userManage: rdcUser,
    showPopupManage: rdcShowPopup
})
const store = createStore(globalState, applyMiddleware(middleware))
middleware.run(mySaga)
export default store