import React, { useEffect } from 'react'
import './Combo.scss'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

export default function Combo(props) {
    const comboLs = useSelector(state => state.ticketManage.comboLs)
    const totalPrice = useSelector(state => state.ticketManage.totalPrice)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!comboLs[props.headOfficeItemCode]) {
            dispatch({
                type: 'SET_COMBOLS',
                payload: {
                    key: props.headOfficeItemCode,
                    value: '0'
                }
            })
        }

    }, [dispatch, comboLs, props])


    const HandleInscreaseCombo = () => {
        dispatch({
            type: 'SET_COMBOLS',
            payload: {
                key: props.headOfficeItemCode,
                value: comboLs[props.headOfficeItemCode] * 1 + 1
            }
        })
        dispatch({
            type: 'SET_TOTAL_PRICE',
            payload: totalPrice + props.displayPrice
        })
    }
    const HandleDescreaseCombo = () => {
        if (comboLs[props.headOfficeItemCode] !== '0') {
            dispatch({
                type: 'SET_COMBOLS',
                payload: {
                    key: props.headOfficeItemCode,
                    value: comboLs[props.headOfficeItemCode] * 1 - 1
                }
            })
            dispatch({
                type: 'SET_TOTAL_PRICE',
                payload: totalPrice - props.displayPrice
            })
        }
    }

    return (
        <div className='combo'>
            <div className='numOfCombo'>
                <div className='inscrease' onClick={HandleInscreaseCombo}><AiFillCaretUp /></div>
                <div className='descrease' onClick={HandleDescreaseCombo}><AiFillCaretDown /></div>
                <p>{comboLs[props.headOfficeItemCode]}</p>
            </div>
            <div className='comboDetail'>
                <h3>{props.description}</h3>
                <p>{props.extendedDescription}</p>
            </div>
            <p className='price'>{props.displayPrice}</p>
        </div>
    )
}
