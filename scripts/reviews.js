const loadAllReviews = async()=>{
    const response = await fetch('../Public/reviews.json')
    
    const allReviews = await response.json()
     displayAllReviews(allReviews.customers)
    // console.log(allReviews.customers);
}
const displayAllReviews = (reviews) =>{
    const reviewsContainer = document.getElementById('reviews-container');

    reviews.map(review =>{
        // console.log(review)
        const fullStars = Math.floor(review.rating);
        const halfStar = review.rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
            const stars = `
            ${'<i class="fa-solid fa-star text-yellow-400"></i>'.repeat(fullStars)}
            ${halfStar ? '<i class="fa-regular fa-star-half-stroke text-yellow-400"></i>' : ''}
            ${'<i class="fa-regular fa-star text-yellow-400"></i>'.repeat(emptyStars)}
        `
        const reviewCard = document.createElement('div');
        reviewCard.innerHTML=`
        <div class="card bg-gradient-to-b from-[#016AE720] to-white shadow-xl shadow-gray-300
        p-5 w-full items-center">
                <div class="avatar">
                    <div class=" rounded-full items-center">
                        <img  src=${review.image} class="w-24"/>
                    </div>
                </div>
                <div class="card-body p-2 flex items-center">
                    <h2 class="card-title">${review.name}</h2>                  
                    <div class="flex items-center mb-2">
                        ${stars}
                        <span class="text-gray-600 text-sm ml-2">(${review.rating})</span>
                    </div>
                    <p class="text-[#00000095] text-center">${review.review}</p>
                </div>
        </div>`
        reviewsContainer.appendChild(reviewCard);
   })
}

loadAllReviews();