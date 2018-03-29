class Makeup {
  constructor(){
    
  }

  // Fetch makeup products from API
  async getMakeup(product_type){
    try {
      const productsResponse = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product_type}`);
      const products = await productsResponse.json();
      return { products };
    } catch(err) {
      console.log(err)
    } 
  }

  async getMakeupByCategory(product_type, product_category){
    try {
      const categoryResponse = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product_type}&product_category=${product_category}`);
      const categoryProduct = await categoryResponse.json();
      return { categoryProduct };
    } catch(err) {
      console.log(err)
    } 
  }

  async getMakeupByTag(product_type, product_tag){
    try {
      const tagResponse = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product_type}&product_tags=${product_tag}`);
      const tagProduct = await tagResponse.json();
      return { tagProduct };
    } catch (err) {
      console.log(err)
    }
  }

  async getBoth(product_type, product_category, product_tag){
    try {
      const productsResponse = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product_type}&product_category=${product_category}&product_tags=${product_tag}`);
      const categoryTagProducts = await productsResponse.json();
      return { categoryTagProducts };
    } catch(err) {
      console.log(err)
    } 
  }
}