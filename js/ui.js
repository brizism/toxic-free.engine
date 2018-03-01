class UI {
  constructor(){
    this.products = document.getElementById('products-content');
    this.modal = document.getElementById('products-modal')
  }

  // Display products in UI
  showMakeup(categories){
    console.log(categories);
    this.modal.style.display = 'block';
    let output = `
      <div class="products-modal__header">
        <span id="close">&times;</span>
        <h1><span>${categories[0].product_type.split('_').join(' ')}</span></h1>
      </div>
      <div class="products-modal__wrapper">
    `
    // Loop through categories
    categories.forEach(category => {
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

  closeModal(){
    document.getElementById('close').onclick = () => this.modal.style.display = 'none';
    window.onclick = (e) => e.target == this.modal ? this.modal.style.display = 'none' : this.modal;
  }
  
}

