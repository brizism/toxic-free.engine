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
      <div class="modal-header">
        <span id="close">&times;</span>
        <h1>${categories[0].product_type.charAt(0).toUpperCase() + categories[0].product_type.slice(1)}</h1>
      </div>
    `
    // Loop through categories
    categories.forEach(category => {
      output += `
        <div class="modal-body">
          <p>${category.name}</p>
        </div>
      `
    })
    this.products.innerHTML = output;

    this.closeModal();
  }

  closeModal(){
    document.getElementById('close').onclick = () => this.modal.style.display = 'none';
    window.onclick = (e) => e.target == this.modal ? this.modal.style.display = 'none' : this.modal;
  }
  
}

