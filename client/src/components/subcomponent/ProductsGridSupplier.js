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

function ProductsGridSupplier({ handleFormClick }) {

  const current_item = -1 ; 

  
  const handleClick = (event) => {
    
    handleFormClick.handleFormClick(event.target.value);
  }
  return ( 
    

      <div >
							<GridList className="grid" style= {div_style} >
								{handleFormClick.Myproducts.map(tile => (
									<GridListTile  style = {{height : "80%" }} key={tile.fid} cols={.66}  >
                 
                  <div class="square" style ={square_style}>
                  <h3>product Id : {tile.product_id}</h3>
                  <h3>Selling Price : {tile.selling_price}</h3>
                 
                  <h3>price : {tile.total_price}</h3>
                  
                                               
                  </div>
									</GridListTile>
								))}
							</GridList>
			</div>

                
    
  );
}

export default ProductsGridSupplier;
