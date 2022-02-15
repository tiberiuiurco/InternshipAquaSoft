import React from 'react';
import {useEffect, useState} from 'react'

export const Employees = () => {
    const [initialState, setInitialState] = useState([])

    useEffect(()=>{
        fetch('/employees/').then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => setInitialState(jsonResponse))
    }, [])

    console.log(initialState);
    return(<div>
        {initialState.length > 0 && initialState.map((elem, i) => <li key={i}>{elem.Name}</li>)}
    </div>)
}
