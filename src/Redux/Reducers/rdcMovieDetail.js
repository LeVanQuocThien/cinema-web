const initialState = {
    movieLs: [],
    detail: {},
    cinemaLs: []
}
const rdcMovieDetail = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_MOVIE_DETAIL':
            return {
                ...state,
                detail: payload
            }
        case 'SET_MOVIE_CINEMALS':
            return {
                ...state,
                cinemaLs: payload
            }
        case 'SET_SHOWTIME_MOVIELS':
            return {
                ...state,
                movieLs: payload
            }
        case 'RESET_MOVIE_DETAIL':
            return {
                ...initialState
            }
        default:
            return state
    }
}
export default rdcMovieDetail