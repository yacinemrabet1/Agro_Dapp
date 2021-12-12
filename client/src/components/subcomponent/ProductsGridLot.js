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

function ProductsGridLot({ handleFormClick }) {

  const current_item = -1 ; 

  
  const handleClick = (event) => {
    
    handleFormClick.handleFormClick(event.target.value);
  }
  return ( 
    
      <div >
							<GridList className="grid" style= {div_style} >
								{handleFormClick.added_lots.map(tile => (
									<GridListTile  style = {{height : "80%" }} key={tile.fid} cols={.66}  >
                 
                  <div class="square" style ={square_style}>
                  <h3>fid : {tile.fid.slice(38)}...{tile.fid.slice(-5)}</h3>
                  <h3>test date : {tile.test_date}</h3>
                  <h3>expiration date : {tile.exp_date}</h3>
                  <h3>crop type : {tile.crop_type}</h3>
                  <h3>Tester Address : {tile.tester_id.slice(38)}...{tile.tester_id.slice(-5)}</h3>
                  <h3>farmer name : {tile.farmer_name}</h3>
                  <h3>address : {tile.location}</h3>
                  <h3>price : {tile.total_price}</h3>
                  
                  {handleFormClick.supp
                      ? <button className='formicon' value={tile.fid}  onClick={handleClick} >BUY</button>
                      : <h1></h1>
                    }

                  </div>
									</GridListTile>
								))}
							</GridList>
			</div>

                
    
  );
}

export default ProductsGridLot;
