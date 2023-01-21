import React from 'react'
import { API } from '../config'

//item -> product id, and url is the image url
function ShowImage({ item, url }) {
    return (
        <div className='product-img'>
            <img
                src={`${API}/${url}/photo/${item._id}`}
                alt={item.name}
                style={{ maxHeight: '100%', maxWidth: '100%' }}
                className='mb-3'>
            </img>
        </div>
    )
}

export default ShowImage