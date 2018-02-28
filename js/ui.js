class UI {
  constructor(){
    this.products = document.getElementById('products-content');
    this.modal = document.getElementById('products-modal')
  }

  // Display products in UI
  showMakeup(categories){
    this.modal.style.display = 'block';
    categories.forEach(category => {
      this.products.innerHTML = `
        <div class="modal-header">
          <span id="close">&times;</span>
          <h1>${category.product_type.charAt(0).toUpperCase() + category.product_type.slice(1)}</h1>
        </div>
      `
    })

    this.closeModal();
  }

  closeModal(){
    document.getElementById('close').onclick = () => this.modal.style.display = 'none';
    window.onclick = (e) => e.target == this.modal ? this.modal.style.display = 'none' : this.modal;
  }
  
}

