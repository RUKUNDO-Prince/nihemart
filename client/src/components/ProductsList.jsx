import React from 'react'
import { productsList } from '../constants/data'
import { eye, likes } from '../assets'

const ProductsList = () => {
  return (
    <div>
        {
            productsList.map((product, index) => (
                <div key={index}>
                    <div>
                        <img src={product.img} alt="img" />
                        <div>

                        <img src={likes} alt="icon" />
                        <img src={eye} alt="icon" />
                        </div>
                    </div>
                    <div>
                        <h1>{product.name}</h1>
                        <div>
                        <p>{product.updatedPrice}</p>
                        <p>{product.price}</p>
                        </div>
                        <div>
                            <p>{product.starCount}</p>
                            <p>{product.reviewCount}</p>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default ProductsList