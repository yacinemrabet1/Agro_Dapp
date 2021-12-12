import React from 'react';

function ProdGridLot({ handleFormClick }) {

    const current_item = -1 ; 

  
    const handleClick = (event) => {
    
    handleFormClick.handleFormClick(event.target.value);
  }


    return ( 
    <div class="row row-cols-1 row-cols-md-3 g-4">
        {handleFormClick.added_lots.map(tile => (
        <div class="col">
            <div class="card" style={{borderWidth : "4px;", borderRadius: "10px" }}>
                <img src="card1.jpg" class="card-img-top" alt="wheat" style={{ borderRadius: "10px 10px 0px 0px" }}/>
                <div class="card-body">
                    <h5 class="card-title">fid : {tile.fid.slice(38)}...{tile.fid.slice(-5)}</h5>
                    <h6 class="card-title">test date : {tile.test_date}</h6>
                    <h6 class="card-title">expiration date : {tile.exp_date}</h6>
                    <h6 class="card-title">crop type : {tile.crop_type}</h6>
                    <h6 class="card-title">Tester Address : {tile.tester_id.slice(38)}...{tile.tester_id.slice(-5)}</h6>
                    <h6 class="card-title">farmer name : {tile.farmer_name}</h6>
                    <h6 class="card-title">address : {tile.location}</h6>
                    <h6 class="card-title">price : {tile.total_price}</h6>
                    {handleFormClick.supp
                      ? <button className='formicon' value={tile.fid}  onClick={handleClick} >BUY</button>
                      : <h1></h1>
                    }
                </div>
            </div>
        </div>
        ))}
    </div>
     );
}

export default ProdGridLot;