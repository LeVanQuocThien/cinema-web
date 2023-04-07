import { useDispatch } from "react-redux"


export const formatText = (text) => {
    const reg = /<.+?>/g
    let newText = text ? text.replace(reg, '') : ''
    return newText
}

export const GetSeatLayout = (data) => {
    if (data) {
        let newMap = [...Array(data.height)].map((e, i) => {
            return [...Array(data.width)]
        })
        data.rows?.forEach((row, i) => {
            if (row.seats.length > 0) {
                row.seats.forEach((item, i) => {
                    newMap[item.position.rowIndex][item.position.columnIndex] = row.physicalName + item.id
                })
            }
        });
        return newMap
    }
}
