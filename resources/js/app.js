import axios from 'axios';
import Noty from 'noty';

var addTocart = document.querySelectorAll('.add-to-cart');
var cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    axios.post('/cart-update', pizza).then((res) =>{
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: 'success',
            text: 'add to cart successful',
            timeout: 1000,
        }).show();
    }).catch(err =>{
        new Noty({
            type: 'error',
            text: 'add to cart false'
        }).show();
    })
}

addTocart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        var pizza = JSON.parse(btn.dataset.pizza)
        
        updateCart(pizza);
    })
})