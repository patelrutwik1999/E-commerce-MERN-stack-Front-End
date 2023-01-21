import React from 'react'

function Checkbox({ categories }) {
    return (
        categories.map((category, index) => (
            <li key={index} className='list-unstyled'>
                <input className='form-check-input' type='checkbox' />
                <label className='form-check-labek'>{category.name}</label>
            </li>
        ))
    )
}

export default Checkbox