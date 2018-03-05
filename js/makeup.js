class Makeup {
  constructor(){
    
  }

  // Fetch makeup products from API
  async getMakeup(product_type){
    const productsResponse = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product_type}`);

    const products = await productsResponse.json();

    return {
      products
    }
  }

  async getMakeupByCategory(product_category, product_type){
    const categoryResponse = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product_type}&product_category=${product_category}`);

    const categoryProduct = await categoryResponse.json();

    return {
      categoryProduct
    }
  }
}