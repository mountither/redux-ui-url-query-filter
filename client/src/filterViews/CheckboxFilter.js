import React, {useState} from 'react'
import { Checkbox} from 'antd';
import {useSelector, useDispatch} from 'react-redux'
import { addFilter,removePath, updateURL, clearFilters, clearAllQuery} from '../actions';


const CheckboxFilter = ({
    list,
    field,
    handleFilters
}) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    console.log('state seen in checkFilt comp: ',state);
    
    const handleChange = (value) => {

        dispatch(addFilter(value.id, field))

        if (!value.active){
            console.log('url updated');
            dispatch(updateURL(value.id, field))
        }else{
            console.log("path removed");
            dispatch(removePath(value.id, field))
        }
        handleFilters(value.id)
    }



    return (
        <>

    {list.map((value, i) => {
        return (
        <React.Fragment key={i}>
            <Checkbox.Group >
            <Checkbox
                onChange={() => {handleChange(value, field)}}
                checked={value.active}
                >
                {value.name}
            </Checkbox>
            </Checkbox.Group>
        </React.Fragment>
        )
        }
        )
    }
        </>
    )
}


export default CheckboxFilter;
