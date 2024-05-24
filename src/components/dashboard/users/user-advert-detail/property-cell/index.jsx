import Image from 'next/image';
import React from 'react'
import "./style.scss";

const UserAdvertsPropertyCell = ({row}) => {

    const {featured_image, city, country, district, title, price} = row
  

 
  return (
    <div className='property-cell'>
      <span className='d-lg-none text-left w-100 ms-2 pt-3'>Property</span>
        <div className='img-container'>
        {
            !featured_image || featured_image==null ? (<Image src=""  alt={title}  width={187} height={100}/>) : (<Image src={`data:image/jpeg;base64,${featured_image}`} alt={title}  width={187} height={100}/>)
          }
        </div>
        <div className='info-container'>
            <h5>{title}</h5>
            <p>{country}, {city}, {district}</p>
            <p>${price}</p>
        </div>
    </div>
  )
}

export default UserAdvertsPropertyCell