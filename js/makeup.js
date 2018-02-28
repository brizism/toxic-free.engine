class Makeup {
  constructor(){
   
  }

  // Fetch makeup products from API
  async getMakeup(product_type){
    const response = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product_type}`);

    const responseData = await response.json();

    return responseData;
  }
}