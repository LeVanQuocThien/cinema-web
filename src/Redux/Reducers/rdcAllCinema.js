const initialState = {
    cityLs: [],
    cinemaLs: []
}

const rdcAllCinema = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_CITYLS':
            return {
                ...state,
                cityLs: payload
            }
        case 'SET_ALL_CINEMALS':
            return {
                ...state,
                cinemaLs: payload
            }
        default:
            return state
    }
}
export default rdcAllCinema