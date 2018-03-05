class UI {
  constructor(){
    this.products = document.getElementById('products-content');
    this.modal = document.getElementById('products-modal');
  }

  // Display products in UI
  showMakeup(categories){
    console.log(categories);
    this.modal.style.display = 'block';
    let output = `
      <div class="products-modal__header">
        <span id="close">&times;</span>
        <h1 id="product-modal__title" class="${categories[0].product_type}"><span>${categories[0].product_type.split('_').join(' ')}</span></h1>
        <div class="products-modal__filter">
          <p>Filter by:</p>
          <div class="products-modal__category">
            <p>Category</p>
            <select id="category">
              <option value="all" selected>all</option>
              ${this.filterCategory(categories).map(category => `<option value="${category}">${category}</option>`)}
            </select>
          </div>
          <div class="products-modal__tag">
            <p>Tag</p>
            <select id="tag">
              <option value="all" selected>all</option>
              ${this.filterTag(categories).map(tag => `<option value="${tag}">${tag}</option>`)}
            </select>
          </div>
        </div>
      </div>
      <div class="products-modal__wrapper">
    `
    // Loop through categories
    categories.map(category => {
      output += `
        <div class="products-modal__body">
          <p>${category.name}</p>
        </div>
      `
    })
    output += '</div>';
    this.products.innerHTML = output;

    this.closeModal();
  }

  filterCategory(categories){
    const filterCategories = categories
      .map(i => i.category)
      .filter((curr, i, arr) => curr !== null && arr.indexOf(curr) == i);
    return filterCategories
  }

  filterTag(tags){
    const filterTags = tags
      .map(i => i.tag_list)
      .filter((curr, i, arr) => curr.length > 1)
    const allTags = [].concat(...filterTags)
      .filter((curr, i, arr) => arr.indexOf(curr) == i)
    return allTags;
  }

  getCategoryValue(){
    const product_type = document.getElementById('product-modal__title').getAttribute('class');
    document.getElementById('category').addEventListener('change', e => {
      const searchTag = e.target.value;
      makeup.getMakeupByCategory(product_type, searchTag)
        .then(res => this.displayCategory(res.categoryProduct))
        .catch(err => console.log(err))
    })
  }

  displayCategory(categories){
    //let modalWrapper = document.getElementsByClassName('products-modal__wrapper')[0].innerHTML = '';
    //let selected = document.querySelector('option:checked').value;
    
    console.log(this.showMakeup(categories))
  }

  getTagValue(){
    const product_type = document.getElementById('product-modal__title').getAttribute('class');
    document.getElementById('tag').addEventListener('change', e => {
      const searchTag = e.target.value;
      makeup.getMakeupByTag(product_type, searchTag)
        .then(res => console.log(res.tagProduct))
        .catch(err => console.log(err))
      console.log(searchTag)
    })
  }

  closeModal(){
    document.getElementById('close').onclick = () => this.modal.style.display = 'none';
    window.onclick = (e) => e.target == this.modal ? this.modal.style.display = 'none' : this.modal;
  }
  
}

