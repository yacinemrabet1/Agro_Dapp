import React from 'react';
import QRCode from "react-qr-code";


function ProductsGridSupplier({ handleFormClick }) {

    const current_item = -1 ; 

  
    const handleClick = (event) => {
    
    handleFormClick.handleFormClick(event.target.value);
  }
  return ( 
        <div class="row row-cols-1 row-cols-md-3 g-4">
            {handleFormClick.Myproducts.map(tile => (
            <div class="col">
                <div class="card" style={{borderWidth : "4px;", borderRadius: "10px" }}>
                    <img src="card1.jpg" class="card-img-top" alt="wheat" style={{ borderRadius: "10px 10px 0px 0px" }}/>
                    <div class="card-body">
                        <h5 class="card-title">product Id : {tile.product_id}</h5>
                        <h6 class="card-title">Selling Price : {tile.selling_price}</h6> 
                    </div>
                </div>
            </div>
            ))}
        </div>
     );
}

export default ProductsGridSupplier;