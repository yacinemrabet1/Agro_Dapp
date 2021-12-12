import React from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';



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

function ProductsGrid({ handleFormClick }) {

  const current_item = -1 ; 

  
  const handleClick = (event) => {
    console.log("clicked");
  
    console.log("data");
    console.log(handleFormClick.lot_data);
    handleFormClick.handleFormClick(event.target.value);
  }
  return ( 
    
      <div >
							<GridList className="grid" style= {div_style} >
								{handleFormClick.lot_data.map(tile => (
									<GridListTile  style = {{height : "80%" }} key={tile.fid} cols={.66}  >
                 
                  <div class="square" style ={square_style}>
                  <h3>fid :{tile.fid.slice(38)}...{tile.fid.slice(-5)}</h3>
                  <h3>farmer_name : {tile.farmer_name}</h3>
                  <h3>location : {tile.location}</h3>
                  <h3>crop_type : {tile.crop_type}</h3>
                  <h3>phone_number : {tile.phone_number}</h3>
                  <h3>quantity : {tile.quantity}</h3>
                  <h3>unit_price : {tile.unit_price}</h3>
                  <h3>total_price : {tile.total_price}</h3>
                  <button className='formicon' value={tile.fid}  onClick={handleClick} >Verify</button>

                  </div>
									</GridListTile>
								))}
							</GridList>
			</div>

                
    
  );
}

export default ProductsGrid;
