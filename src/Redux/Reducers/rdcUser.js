const initialState = {
    currentUser: undefined,
    bankAcc: [],
    ticketLs: [],
    ticketDetail: {},
    allUser: undefined,
    allBankCard: [],
    cardSelected: ''
}
const rdcUser = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_ALL_USER':
            return {
                ...state,
                allUser: payload
            }
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: payload
            }
        case 'SET_ALL_CARD':
            return {
                ...state,
                allBankCard: payload
            }
        case 'SET_BANK_ACCOUNT':
            return {
                ...state,
                bankAcc: payload
            }
        case 'SET_CARD_SELECTED':
            return {
                ...state,
                cardSelected: payload
            }
        case 'SET_TICKETLS':
            return {
                ...state,
                ticketLs: payload
            }
        case 'SET_TICKET_DETAIL':
            return {
                ...state,
                ticketDetail: payload
            }
        default:
            return state
    }
}
export default rdcUser