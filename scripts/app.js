 const loadAllProducts = async()=>{
    const response = await fetch('../Public/Products.json')
    
    const allProducts = await response.json()
    displayAllProducts(allProducts)
    console.log(allProducts)
}
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
                            <button
                                class="bg-primary font-semibold text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
        `
        productsContainer.appendChild(productCard)
    })

}
loadAllProducts()