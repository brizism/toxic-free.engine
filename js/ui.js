class UI {
  constructor(){
    this.products = document.getElementById('products-content');
    this.modal = document.getElementById('products-modal');
  }

  // Display products in UI
  showAllProducts(categories){
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
      <div class="products-modal__wrapper" id="modal-body">
    `
    // Loop through categories
    categories.map(category => {
      output += `
        <div class="products-modal__body">
          <p>${category.name}</p>
          <p><span>by</span> <a href="${category.website_link}" target="_blank">${category.brand}</a></p>
          <div class="products-modal__img">
            <img src="${category.image_link}" alt="${category.name}"/>
          </div>
          <div class="products-modal__desc">
            <p>${this.trucateText(category.description, 515)}</p>
          </div>
          <div class="products-modal__buy">
            <a href="${category.product_link}" target="_blank">Buy</a>
          </div>
        </div>
      `
    })
    output += '</div>';
    this.products.innerHTML = output;

    this.getFilterValues(categories[0].product_type);
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

  getFilterValues(product){
    const selectCategory = document.getElementById('category');
    const selectTag = document.getElementById('tag');
    
    selectCategory.addEventListener('change', e => this.getResponse(product, e.target.value, selectTag.value));
    selectTag.addEventListener('change', e => this.getResponse(product, selectCategory.value, e.target.value));
  }

  getResponse(product, categoryValue, tagValue){
    if(categoryValue === 'all' && tagValue === 'all'){
      makeup.getMakeup(product)
        .then(res => this.displayCategory(res.products));
        return;
    }
    if(categoryValue === 'all'){
      makeup.getMakeupByTag(product, tagValue)
        .then(res => this.displayCategory(res.tagProduct));
        return;
    }
    if(tagValue === 'all'){
      makeup.getMakeupByCategory(product, categoryValue)
        .then(res => this.displayCategory(res.categoryProduct));
        return;
    }
    makeup.getBoth(product, categoryValue, tagValue)
      .then(res => this.displayCategory(res.categoryTagProducts))
      .catch(err => console.log(err))
      return;
  }

  displayCategory(categories){
    //console.log(categories);
    if(categories.length === 0){
      const selectCategory = document.getElementById('category');
      const selectTag = document.getElementById('tag');

      let output = `
        <div class="products-modal__wrapper">
          <h1>No product results found for ${selectCategory.value} and ${selectTag.value} at this time.</h1>
        </div>
      `;
      document.getElementById('modal-body').innerHTML = output;
      return;
    };
    let output = '';
    categories.map(category => {
      output += `
        <div class="products-modal__body">
          <p>${category.name}</p>
          <p><span>by</span> <a href="${category.website_link}" target="_blank">${category.brand}</a></p>
          <div class="products-modal__img">
            <img src="${category.image_link}" alt="${category.name}"/>
          </div>
          <div class="products-modal__desc">
            <p>${this.trucateText(category.description, 515)}</p>
          </div>
          <div class="products-modal__buy">
            <a href="${category.product_link}" target="_blank">Buy</a>
          </div>
        </div>
      `
    })

    document.getElementById('modal-body').innerHTML = output;
  }

  // Truncate Text 
  trucateText(text, limit){
    if(text == null)return;
    const shortened = text.indexOf('', limit);
    if(shortened == -1)return text;
    return text.substring(0, shortened);
  }

  showAlert(message){
    const h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(message));
    document.getElementById('modal-body').appendChild(h2)
  }

  closeModal(){
    document.getElementById('close').onclick = () => this.modal.style.display = 'none';
    window.onclick = (e) => e.target == this.modal ? this.modal.style.display = 'none' : this.modal;
  }
  
}

