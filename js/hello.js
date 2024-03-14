const loadPhones = async (searchText="13") =>{
    
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
   
};
loadPhones();
var showAllParameter;
var showAllClicked;
function showAll(){
    showAllParameter = true;
    handleSearch()
    showAllClicked = true;
}

const displayPhones = (phones) =>{
    const phoneContainer = document.getElementById("phones-container");
    phoneContainer.innerHTML = '';
    const numbersOfPhones = phones.length;
    const showAllButton = document.getElementById('show-all-button');
    if(numbersOfPhones >12){
        showAllButton.classList.remove('hidden');
    } else if ( numbersOfPhones === 0){
        document.getElementById("error-container").innerHTML = `<h2 class="font-bold text-5xl my-4 text-red-800 text-center ">No phone found</h2>`
    }
    if(showAllClicked){
        showAllButton.classList.add('hidden');
        console.log('clicked');
    }
    if(!showAllParameter){
        phones = phones.slice(0,12);
    } 
    phones.forEach(phone =>{
        const newPhone = document.createElement('p');
        newPhone.innerHTML =`
        <div class="card glass p-8">
        <figure><img src=${phone.image} class="w-1/2" alt="iPhone!"/></figure>
        <div class="card-body text-center">
          <h2 class="text-center text-3xl font-bold ">${phone.phone_name}</h2>
          <p class="my-2 text-lg text-gray-500">There are many variations of passages of available, but the majority have suffered</p>
          <h2 class="text-center text-xl font-bold mb-2">$999</h2>
          <div class="flex items-center justify-center">
          <button class="btn btn-info w-1/3 text-white" id="${phone.slug}" onclick="showMore('${phone.slug}')">Show More</button>
</div>.
        </div>
      </div> 
      `
        phoneContainer.appendChild(newPhone);
    })
    // for(const phone of phones){
    //     // console.log(phone);
        
    // }
    toggleLoadingSpinner(false);

}

loadPhones();

const showMore = async (data) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${data}`)
    const result = await res.json();
    showModalData(result.data);
}

function showModalData(phone){
    show_detail_modal.showModal();
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    const phoneImage = document.getElementById('show-detail-phone-photo');
    const phoneDetailContainer = document.getElementById('show-detail-phone-detail-container');
    phoneDetailContainer.innerHTML = `
    
    <p class="py-2"> <span class="font-bold">Storage : </span> <span class="text-gray-500">${phone?.mainFeatures?.storage}</span> </p>
    <p class="py-2"> <span class="font-bold">Display : </span> <span class="text-gray-500">${phone?.mainFeatures?.displaySize}</span> </p>
    <p class="py-2"> <span class="font-bold">Chipset : </span> <span class="text-gray-500">${phone?.mainFeatures?.chipSet}</span> </p>
    <p class="py-2"> <span class="font-bold">Memory : </span> <span class="text-gray-500">${phone?.mainFeatures?.memory}</span> </p>
    <p class="py-2"> <span class="font-bold">Slug : </span> <span class="text-gray-500">${phone?.slug}</span> </p>
    <p class="py-2"> <span class="font-bold">Release data : </span> <span class="text-gray-500">${phone?.releaseDate}</span> </p>
    <p class="py-2"> <span class="font-bold">Brand : </span> <span class="text-gray-500">${phone?.brand}</span> </p>
    <p class="py-2"> <span class="font-bold">GPS : </span> <span class="text-gray-500">${phone?.others?.GPS || "no GPS"}</span> </p>
    
    `
    phoneName.innerText = phone.name;
    phoneImage.setAttribute("src",`${phone.image}` );
   

}

const handleSearch = () =>{
    toggleLoadingSpinner(true);
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    loadPhones(searchText);
    
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove("hidden");
    } else{
        loadingSpinner.classList.add("hidden");
    }

}