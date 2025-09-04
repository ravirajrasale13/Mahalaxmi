import React from 'react'
import '../styles/ProductCard.css'

const ProductCard = ({ img, name, price, rating }) => {
    return (
        <div className="product-card">
            <img src={img} alt={name} />
            <h3>{name}</h3>
            <p>{price}</p>
            <div className="stars">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
            <button>Select options</button>
        </div>
    )
}

export default ProductCard
