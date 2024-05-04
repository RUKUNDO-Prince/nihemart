import React from 'react'
import { productsList, singleProduct } from '../constants/data'

const Product = () => {
  return (
    <div>
      {
        singleProduct.map((item, index) => (
          <div key={index}>
            <p>{item.category}/<span>{item.name}</span></p>
            <div>
              <div>
                {
                  item.imgs.map((img, index) => (
                    <img src={img} alt="img" key={index} />
                  ))
                }
              </div>
              <div><img src={item.img} alt="item" /></div>
              <div>
                <h1>{item.name}</h1>
                <div>
                  <p>{item.starCount}</p>
                  <p>({item.reviewCount})</p>
                  <p>{item.isAvailable ? "In Stock" : "Waiting for more"}</p>
                </div>
                <p>{item.updatedPrice}frw <span>{item.price}frw</span></p>
                <p>{item.desc}</p>
                <hr />
                <p>Size: </p>
                <div>
                  <p>2</p>
                  <button>Add To Cart</button>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Product
