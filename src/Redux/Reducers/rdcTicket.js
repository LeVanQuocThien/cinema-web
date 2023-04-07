const initialState = {
    cinemaName: '',
    theaterName: '',
    filmName: '',
    imageLandscape: '',
    imagePortrait: '',
    showTime: '',
    session: '',
    totalPrice: 0,
    seatLs: {
    },
    comboLs: {
    }
}

const rdcTicket = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_MORE_INFO':
            return {
                ...state,
                [payload.key]: payload.value
            }
        case 'RESET_CHOICE':
            return {
                ...state,
                totalPrice: initialState.totalPrice,
                seatLs: initialState.seatLs,
                comboLs: initialState.comboLs
            }
        //---------Ticket------------------
        case 'PUSH_TICKET':
            return {
                ...state,
                seatLs: {
                    ...state.seatLs,
                    ...state.seatLs[payload.key].push(payload.value)

                }
            }
        case 'REMOVE_TICKET':
            return {
                ...state,
                seatLs: {
                    ...state.seatLs,
                    [payload.key]: state.seatLs[payload.key].filter(e => e !== payload.value)
                }
            }
        case 'CREATE_TICKET':
            return {
                ...state,
                seatLs: {
                    ...state.seatLs,
                    [payload.key]: payload.value
                }
            }

        //------------------Combo--------------------------
        case 'CREATE_COMBOLS':
            return {
                ...state,
                comboLs: {
                    ...state.comboLs,
                    [payload.key]: payload.value
                }
            }
        case 'SET_COMBOLS':
            return {
                ...state,
                comboLs: {
                    ...state.comboLs,
                    [payload.key]: payload.value
                }
            }

        //------------ Total Price-----------------------
        case 'SET_TOTAL_PRICE':
            return {
                ...state,
                totalPrice: payload
            }
        default:
            return state
    }
}
export default rdcTicket