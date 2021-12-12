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
  backgroundImage: "linear-gradient(to right, #BAFE50, #EEFCD8)",
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
							<GridList className="grid" style= {div_style} >
								{handleFormClick.all_products.map(tile => (
									<GridListTile  style = {{height : "80%" }} key={tile.fid} cols={.66}  >

                  <div class="square" style ={square_style}>
                  <QRCode value={JSON.stringify(tile)} />
                  <h1>{tile.crop_type}</h1>
                  <h1>{tile.grade}</h1>
                  

                                               
                  </div>
									</GridListTile>
								))}
							</GridList>
			</div>

                
    
  );
}

export default ProductsGridClient;
