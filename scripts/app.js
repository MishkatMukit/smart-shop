
 //dom elements-------------------------------------------
 const toggleCart = document.getElementById('shopping-cart')
 const cartDrawer = document.getElementById('cart-drawer')


let cart = [];
let balance = 1000;
let allProducts = [];
let discountPercentage = 0;
let couponApplied = false;


// toggling cart-------------------------------------------------------------------------
    toggleCart.addEventListener('click', () => {
        cartDrawer.classList.toggle('hidden');
    });
 
//  loading products from api-------------------------------------------------------------
 const loadAllProducts = async()=>{
    const response = await fetch('../Public/Products.json')
    
    allProducts = await response.json()
    displayAllProducts(allProducts)
    console.log(allProducts)
}


// displaying all product cards from api---------------------------------------------------
const displayAllProducts=(products)=>{
    const productsContainer = document.getElementById('products-container')
    

    products.map(product =>{
        const fullStars = Math.floor(product.rating);
  const halfStar = product.rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
        const stars = `
    ${'<i class="fa-solid fa-star text-yellow-400"></i>'.repeat(fullStars)}
    ${halfStar ? '<i class="fa-regular fa-star-half-stroke text-yellow-400"></i>' : ''}
    ${'<i class="fa-regular fa-star text-yellow-400"></i>'.repeat(emptyStars)}
  `;
        const productCard = document.createElement('div')
        productCard.innerHTML=`
            <div
                    class="bg-gray-50 rounded-lg overflow-hidden max-w-[350px] max-h- shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                    <div class=""><img src="${product.image}" alt="Gadgets" class="object-cover"></div>
                    <div class="p-6 flex flex-col">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2 text-ellipsis overflow-hidden text-nowrap">${product.title}</h3>
                        <p class="text-dark2">${product.description}</p>
                        <div class="flex items-center mb-2">
                        ${stars}
                        <span class="text-gray-600 text-sm ml-2">(${product.rating})</span>
                         </div>
                        <div class="flex items-center justify-between ">
                            <span class="text-black1 font-bold text-lg">৳ ${product.price}</span>
                            <button onclick = "addToCart(${product.id})" class="bg-primary font-semibold text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
        `
        productsContainer.appendChild(productCard)
    })



}

// Add products to cart when add to cart button clicked------------------------------
const addToCart = (productId) =>{
    // console.log("button clicked", productId, allProducts)
    const product = allProducts.find(p => p.id === productId);

    if (!product) return;
    
    // check if already exists
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    // console.log(cart)
    
    updateCartCount();
    displayCart()
    // Show success message
    alert('Item added to cart!');
}

// display cart items from cart array---------------------------------------------------------------------------
const displayCart = ()=>{
    const cartItemsContainer  = document.getElementById('cart-items-container')
    // console.log(cartItemsContainer)

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
        // updateCartSummary();
        console.log('yes')
        return;
    }
    cartItemsContainer.innerHTML=""
    console.log(cart.length)
    cart.forEach(item => {
        const cartCard = document.createElement('div')
        console.log("from cart",item)
        cartCard.innerHTML=`
            <div class="cart-item flex items-center mb-4 pb-4 border-b border-gray-200">
                <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain rounded mr-3">
                <div class="flex-1 relative">
                    <div class="flex justify-between items-center">
                    <h4 class=" max-w-48 font-medium text-sm overflow-hidden text-ellipsis text-nowrap">${item.title}</h4>
                    <button 
                                onclick="removeFromCart(${item.id})" 
                                class="text-red-600 hover:text-red-800 mr-2 absolute -top-2 -right-3 text-sm w-3 h-3 flex items-center justify-center">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                    
                    </div>
                    <div class="flex justify-between items-center mt-1">
                        <span class="text-primary font-bold text-sm">৳${(item.price * item.quantity).toFixed(2)}</span>
                        <div class="flex items-center">
                            <button 
                                onclick="decreaseQuantity(${item.id})" 
                                class="text-gray-500 hover:text-red-600 mr-2 text-sm w-6 h-6 flex items-center justify-center">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="text-sm font-medium mx-1">${item.quantity}</span>
                            <button 
                                onclick="increaseQuantity(${item.id})" 
                                class="text-gray-500 hover:text-green-600 ml-2 text-sm w-6 h-6 flex items-center justify-center">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
        cartItemsContainer.appendChild(cartCard)
    })
    updateCartSummary()
}

// update the values of whole cart-----------------------------------------------
const updateCartSummary = ()=>{
    const subtotal = cart.reduce((sum, item) => sum+(item.price*item.quantity),0);
    // console.log(subtotal)
    const delivery = (cart.length<1) ? 0 : 70
    console.log(cart.length)

    discount = couponApplied ? (subtotal * discountPercentage / 100) : 0;
    const total = subtotal + delivery - discount


    document.querySelector('.cart-subtotal').innerText = `${subtotal.toFixed(2)}`;
    document.querySelector('.cart-delivery').innerText = `${delivery.toFixed(2)}`;
    document.querySelector('.cart-total').innerText = `${total.toFixed(2)}`;
}

// Add money to your account-------------------------------------------------------
document.getElementById('add1k').addEventListener('click', ()=>{
    balance+=1000
    updateBalance()
})

// update balance-------------------------------------------------------------------
const updateBalance =()=>{
    document.getElementById('balance').innerText = balance.toFixed(2) 
}

// increase cart item quantity by one-----------------------------------------------
const increaseQuantity=(itemID)=>{
    const item = cart.find(item=>item.id === itemID)
    console.log(item)
    if(item){
        item.quantity++;
        updateCartCount()
        displayCart()
    }
}

// decrease quantity of cart item by one--------------------------------
const decreaseQuantity=(itemID)=>{
    const item = cart.find(item=>item.id === itemID)
    console.log(item)
    if(item){
        item.quantity--;
        if(item.quantity<1){
            removeFromCart(itemID)
            updateCartSummary()
        }
        else{
            updateCartCount()
            displayCart()
        }
    }
}

// checkout---------------------------------------------------------------
document.querySelector('.checkout-btn').addEventListener('click', ()=>{
    const total = document.querySelector('.cart-total').innerText
    // console.log(total);
    if(cart.length===0){
        alert("your cart is empty")
        return  
    }
    if(balance<total){
        alert('Insufficient balance! Please add money to your wallet.')
        return
    }
    balance-=total
    updateBalance()
    cart=[]
    updateCartCount()
    updateCartSummary()
    displayCart()
    alert('Purchase successful! Thank you for shopping with us.');
    cartDrawer.classList.add('hidden');

})

// remove items from cart directly-----------------------------------------
const removeFromCart=(itemID)=>{
    cart = cart.filter(item=>item.id !== itemID)
    // console.log("from remove cart ", cart)
    updateCartCount()
    updateCartSummary()
    updateBalance()
    displayCart()
}

// discount coupon apply ---------------------------------------------------
document.getElementById('btn-coupon').addEventListener('click', ()=>{
    const couponCode = (document.getElementById('input-coupon').value).trim().toUpperCase()
    // console.log(couponCode)

    if(couponCode==="SMART10" && !couponApplied){
        if(cart.length===0){
            alert('Please add items to cart first!')
            return
        }
        couponApplied = true;
        discountPercentage = 10;
        
        document.getElementById('input-coupon').value=""
        alert('✅ Coupon "SMART10" applied! You saved 10%')
        
        updateCartSummary()
        displayCart()
    }
    else if(couponApplied){
        alert('Coupon already applied!')
    }
    else{
        alert('❌ Invalid coupon code! Try "SMART10"')      
    }
})


//update cart item count---------------------------------------------------
const updateCartCount=()=> {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
    // console.log(document.getElementById('cart-count').innerText)
}
updateBalance()
updateCartSummary()
displayCart()
loadAllProducts()