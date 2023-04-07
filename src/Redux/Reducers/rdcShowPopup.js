const initialState = {
    screen: '',
    isShow: false
}
const rdcShowPopup = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_SCREEN':
            return {
                ...state,
                screen: payload,
                isShow: true
            }
        case 'DISAPPEAR':
            return {
                ...state,
                screen: '',
                isShow: false
            }
        default:
            return state
    }
}
export default rdcShowPopup