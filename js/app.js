// Init makeup
const makeup = new Makeup();

// Init ui
const ui = new UI();

const mascara = document.getElementById('mascara');
const eyeshadow = document.getElementById('eyeshadow');
const blush = document.getElementById('blush');
const nail_polish = document.getElementById('nail_polish');
const foundation = document.getElementById('foundation');
const lipstick = document.getElementById('lipstick');
const lip_liner = document.getElementById('lip_liner');
const bronzer = document.getElementById('bronzer');
const eyebrow = document.getElementById('eyebrow');
const eyeliner = document.getElementById('eyeliner');

const categories = [mascara, eyeshadow, blush, nail_polish, foundation, lipstick, lip_liner, bronzer, eyebrow, eyeliner];

categories.forEach(category => {
  category.addEventListener('click', () => {
    makeup.getMakeup(category.id)
    .then(res => ui.showMakeup(res.products))
    .then(res => ui.getCategoryValue())
    .then(res => console.log(ui.getTagValue()))
    .catch(err => console.log(err))
  })
});



