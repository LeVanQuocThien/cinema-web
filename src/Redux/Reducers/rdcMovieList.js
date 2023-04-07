const initialState = {
    movieShowing: [],
    movieCommingSoon: []
}
const rdcMovieList = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_MOVIE_LIST':
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}

export default rdcMovieList