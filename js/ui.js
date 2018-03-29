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

  getCategoryValue(product){
    document.getElementById('category').addEventListener('change', e => {
      const searchTag = e.target.value;
      if(searchTag === 'all'){
        makeup.getMakeup(product, searchTag)
          .then(res => this.displayCategory(res.products))
          return;
      }   
      makeup.getMakeupByCategory(product, searchTag)
        .then(res => this.displayCategory(res.categoryProduct))
        .catch(err => console.log(err))
        return;
    })
  }

  getTagValue(product){
    document.getElementById('tag').addEventListener('change', e => {
      const searchTag = e.target.value;
      if(searchTag === 'all'){
        makeup.getMakeup(product, searchTag)
          .then(res => this.displayCategory(res.products))
          return;
      }
      makeup.getMakeupByTag(product, searchTag)
        .then(res => this.displayCategory(res.tagProduct))
        .catch(err => console.log(err))
        return;
    })
  }

  getBothValues(product){
    const category = document.getElementById('category');
    const tag = document.getElementById('tag');
    category.addEventListener('change', e => {
      const categoryValue = e.target.value;

      tag.addEventListener('change', e => {
        const tagValue = e.target.value;

      if(categoryValue === 'all' && tagValue === 'all'){
        makeup.getMakeup(product)
          .then(res => this.displayCategory(res.products));
          return;
      }
      makeup.getBoth(product, categoryValue, tagValue)
        .then(res => this.displayCategory(res.categoryTagProducts))
        .catch(err => console.log(err))
        return;
      })
    })   
  }

  // getOptionValues(product){
  //   const category = document.getElementById('category');
  //   const tag = document.getElementById('tag');

  //   category.addEventListener('change', e => {
  //     const categoryValue = e.target.value;

  //     tag.addEventListener('change', e => {
  //       const tagValue = e.target.value;

  //     if(categoryValue === 'all' && tagValue === 'all'){
  //       makeup.getMakeup(product)
  //         .then(res => this.displayCategory(res.products));
  //         return;
  //     }
  //     makeup.getMakeupByCategory(product, categoryValue)
  //       .then(res => this.displayCategory(res.products))
  //       .catch(err => console.log(err))
  //     // makeup.getMakeupByTag(product, tagValue)
  //     //   .then(res => this.displayCategory(res.tagProduct))
  //     //   .catch(err => console.log(err))
  //     // makeup.getBoth(product, categoryValue, tagValue)
  //     //   .then(res => this.displayCategory(res.categoryTagProducts))
  //     //   .catch(err => console.log(err))

  //     })
  //   })
    
    // const options = [category, tag];
    // options.forEach(option => {
    //   option.addEventListener('change', e => {
    //     const searchTag = e.target.value;
    //     if(searchTag === 'all'){
    //       makeup.getMakeup(product)
    //         .then(res => this.displayCategory(res.products));
    //         return;
    //     }
    //     // makeup.getBoth(product, searchTag, searchTag)
    //     //   .then(res => this.displayCategory(res.categoryTagProducts))
    //     //   .catch(err => console.log(err))
    //     // makeup.getBoth(product, '', searchTag)
    //     //   .then(res => this.displayCategory(res.categoryTagProducts))
    //     //   .catch(err => console.log(err))
    //   })
    // })
  //}

  displayCategory(categories){
    console.log(categories);
    if(categories.length === 0){
      console.log('NO RESULTS FOOUND');
    }
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

