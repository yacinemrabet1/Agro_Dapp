import React from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import QRCode from "react-qr-code";


const square_style =  {
  marginTop : "5px",
  height: "80%",
  width: "100%",
  textAlign: "left",
  marginLeft: "5px",
  marginRight: "5px",
  paddingLeft: "6px",
  paddingRight: "6px",
  backgroundImage: "linear-gradient(to top, #BAFE50, #EEFCD8)",
  borderRadius : "10px",
  fontSize : "15px",
  fontFamily : "sans-serif",
};

const div_style =  {
  display: "flex",
  justifyContent: "center",
  aligItems: "left",
  height: "100%",
  width: "100%",
  
};

function ProductsGridClient({ handleFormClick }) {

  const current_item = -1 ; 

  

  return ( 
    

      <div >
							<div class="row row-cols-1 row-cols-md-3 g-4">
								{handleFormClick.all_products.map(tile => (
									<div class="col">
                  <div class="card" style={{borderWidth : "4px;", borderRadius: "10px", background: "transparent"}}>
                    <div className="justify-content-center">
                    <QRCode value={JSON.stringify(tile)} alt="wheat" style={{ borderRadius: "10px 10px 10px 10px"}}/>
                    </div>
                      <div class="card-body">
                        <h5>Crop: {tile.crop_type}</h5>
                        <h6>Grade: {tile.grade}</h6>          
                      </div>
									</div>
                  </div>
								))}
							</div>
			</div>

                
    
  );
}

export default ProductsGridClient;
