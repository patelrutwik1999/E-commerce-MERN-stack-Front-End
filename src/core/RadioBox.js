import React, { useState } from 'react'

function RadioBox({ prices, handleFilters }) {
    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

    return (
        prices.map((price, index) => (
            <li key={index} className='list-unstyled'>
                <input onChange={handleChange} name={price} value={`${price._id}`} className='mr-2 ml-4' type='radio' />
                <label className='form-check-labek'>{price.name}</label>
            </li>
        ))
    )
}

export default RadioBox