console.log('%c HI', 'color: firebrick')

let imgCont = document.querySelector("#dog-image-container");
let breedUl = document.querySelector("#dog-breeds");
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

function loadImgs() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((resp) => resp.json())
    .then((dogSiteObj) => {
        dogSiteObj.message.forEach((dogUrl) => {
        renderOneImg(dogUrl);
        });
    });
}

function renderOneImg(dogUrl) {
    let imgDiv = document.createElement("div");
    let dogImg = document.createElement("img");
    dogImg.src = dogUrl;

    imgDiv.append(dogImg);
    imgCont.append(imgDiv);
}

fetch("https://dog.ceo/api/breeds/list/all")
    .then((resp) => resp.json())
    .then((results) => {
    breedsArr = Object.keys(results.message);

    addBreedSelectListener()
    breedsArr.forEach((dogBreed, index) => {
        updateList(dogBreed, index);
    });
    });

function updateList(dogBreed, index) {
    const breeLi = document.createElement("li");
    breeLi.textContent = dogBreed;

    breeLi.addEventListener('click', updateColor); 
    breedUl.append(breeLi);

    breeLi.dataset.id = index;
}

function updateColor(event) {
    event.target.style.color = '#00bcd4'
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', (event) => { 
        selectBreedsStartingWith(event.target.value);  
    });
}

function selectBreedsStartingWith(letter){ 
    let breedsToRemove = document.querySelectorAll('li')
        breedsToRemove.forEach(dogLi => {
        dogLi.remove()
        })
    let filteredArr = (breedsArr.filter(dogBreed => dogBreed.startsWith(letter)))

    filteredArr.forEach(dogObj => {
    const breeLi = document.createElement("li");
    breeLi.textContent = dogObj;
    breeLi.addEventListener('click', updateColor); 
    breedUl.append(breeLi);
    })
}
loadImgs();
updateList();