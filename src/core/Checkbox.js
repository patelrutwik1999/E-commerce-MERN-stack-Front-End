import React, { useState } from 'react'

function Checkbox({ categories, handleFilters }) {
    const [checked, setChecked] = useState([])

    //on change when the category is selected.
    const handleToggle = (category) => () => {
        const currentCategoryId = checked.indexOf(category) // return the first index or -1
        const newCheckedCategoryId = [...checked] //All the id in the checked list
        //If currently checked was not already in checked state > push
        //else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(category)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }

        //console.log("newCHeckedcategoryid", newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    return (
        categories.map((category, index) => (
            <li key={index} className='list-unstyled'>
                <input onChange={handleToggle(category._id)} value={checked.indexOf(category._id === -1)} className='form-check-input' type='checkbox' />
                <label className='form-check-labek'>{category.name}</label>
            </li>
        ))
    )
}

export default Checkbox