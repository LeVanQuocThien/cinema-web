const initialState = {
    bookedSeat: ''
}

const rdcSeatPlant = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_SEAT_BOOKDATA':
            return {
                ...state,
                ...payload
            }
        case 'SET_BOOKED_SEAT':

            return {
                ...state,
                bookedSeat: payload.map(e => e.SeatCode).join('')
            }
        default:
            return state
    }
}

export default rdcSeatPlant