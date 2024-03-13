const loadPhones = async (searchText) =>{
    
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
   
};
var showAllParameter;
function showAll(){
    showAllParameter = true;
    handleSearch()
}

const displayPhones = (phones) =>{
    const phoneContainer = document.getElementById("phones-container");
    phoneContainer.innerHTML = '';
    const numbersOfPhones = phones.length;
    if(numbersOfPhones >12){
        const showAllButton = document.getElementById('show-all-button');
        showAllButton.classList.remove('hidden')
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
    console.log(result.data);
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