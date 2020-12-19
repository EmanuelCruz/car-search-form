import {autos} from './db.js';

const $selectBrand = document.getElementById('brand')
const $selectMinPrice = document.getElementById('min-price')
const $selectMaxPrice = document.getElementById('max-price')
const $selectDoors = document.getElementById('doors')
const $selectTransmission = document.getElementById('transmission')
const $selectColour = document.getElementById('colour')

const $templateCard = document.getElementById('template-card').content
const $groupCards = document.querySelector('.group-cards')
const fragment = document.createDocumentFragment()

const $templateSelectYear = document.getElementById('template-select-year').content
const $selectYear = document.getElementById('year')
const fragmentSelect = document.createDocumentFragment()
const currentYear = new Date().getFullYear()

let searchData = {
    brand : '',
    year : '',
    minPrice : '',
    maxPrice : '',
    doors : '',
    transmission : '',
    colour : ''
}

document.addEventListener("DOMContentLoaded", () => {
    fillSelectYear()
    if(!localStorage.getItem('searchData')) {
        showCars(autos);
    } else {
        searchData = JSON.parse(localStorage.getItem('searchData'))
        completeAllSelects()
        showCars(filterResults());
    }
    toggleDetails()
    eventosSelects()
});

//==========================================EVENTOS PARA LOS SELECT==========================================
function eventosSelects() {
    $selectBrand.addEventListener('change',e=>{
        searchData.brand = e.target.value
        const filteredCars = filterResults()
        showCars(filteredCars);
    })
    $selectYear.addEventListener('change',e=>{
        searchData.year = e.target.value
        const filteredCars = filterResults()
        showCars(filteredCars);
    })
    $selectMinPrice.addEventListener('change',e=>{
        searchData.minPrice = e.target.value
        const filteredCars = filterResults()
        showCars(filteredCars);
    })
    $selectMaxPrice.addEventListener('change',e=>{
        searchData.maxPrice = e.target.value
        const filteredCars = filterResults()
        showCars(filteredCars);
    })
    $selectDoors.addEventListener('change',e=>{
        searchData.doors = e.target.value
        const filteredCars = filterResults()
        showCars(filteredCars);
    })
    $selectTransmission.addEventListener('change',e=>{
        searchData.transmission = e.target.value
        const filteredCars = filterResults()
        showCars(filteredCars);
    })
    $selectColour.addEventListener('change',e=>{
        searchData.colour = e.target.value
        const filteredCars = filterResults()
        showCars(filteredCars);
    })
}


//=================================================FUNCIONES=================================================
function showCars(cars) {
    initializeResults()
    if (cars.length===0) {
        $groupCards.innerHTML = `
        <div class="card card--no-result">
            <p class="card__msj">Sin resultados</p>
        </div>
        `
    } else {
        cars.forEach((car) => {
            $templateCard.querySelector('.card__brand').innerHTML = `${car.brand} <span class="card__model">${car.model}</span>`
            $templateCard.querySelector('.card__year').innerHTML = `${car.year}`
            $templateCard.querySelector('.card__price').innerHTML = `<span>$</span>${car.price}`
            $templateCard.querySelector('.info__doors').innerHTML = `<span>Puertas: </span>${car.doors}`
            $templateCard.querySelector('.info__colour').innerHTML = `<span>Color: </span>${car.colour}`
            $templateCard.querySelector('.info__transmission').innerHTML = `<span>Transmisión: </span>${car.transmission}`
            $templateCard.querySelector('.card').style.cssText = `background: linear-gradient(to left,rgba(255, 255, 255, 0),rgba(2, 2, 2, 0.836)),url(${car.img}) no-repeat center/cover;`

            const $car = $templateCard.cloneNode(true)
            fragment.appendChild($car)
        })
        $groupCards.appendChild(fragment)
    }
}

function initializeResults() {
    document.querySelector('.group-cards').innerHTML = ""
}

function toggleDetails() {
    document.addEventListener('click',(e)=>{
        if (e.target.matches('.details__icon')) {
            e.target.nextElementSibling.classList.add('move-left')
            e.target.classList.add('hidden')
        } else if (e.target.matches('.info')) {
            e.target.classList.remove('move-left')
            e.target.previousElementSibling.classList.remove('hidden')
        }
    })
}

function fillSelectYear() {
    for (let index = 0; index < 10; index++) {
        let year = currentYear-index
        console.log(typeof year)
        $templateSelectYear.querySelector('option').innerHTML = year
        $templateSelectYear.querySelector('option').setAttribute('value',year)
        const $option = $templateSelectYear.cloneNode(true)
        fragmentSelect.appendChild($option)
    }
    $selectYear.appendChild(fragmentSelect)
    console.log($selectYear)
    console.log(searchData)
}

//=============================================FILTRADO DE AUTOS=============================================
function filterResults() {
    const result = autos.filter(filterBrand).filter(filterYear).filter(filterMinPrice).filter(filterMaxPrice).filter(filterDoors).filter(filterTransmission).filter(filterColour)
    localStorage.setItem('searchData',JSON.stringify(searchData))
    return result
}

function filterBrand(auto) {
    if (searchData.brand) {
        return auto.brand === searchData.brand
    }
    return auto
}

function filterYear(auto) {
    if (searchData.year) {
        return auto.year === Number(searchData.year)
    }
    return auto
}

function filterMinPrice(auto) {
    if (searchData.minPrice) {
        return auto.price >= Number(searchData.minPrice)
    }
    return auto
}

function filterMaxPrice(auto) {
    if (searchData.maxPrice) {
        return auto.price <= Number(searchData.maxPrice)
    }
    return auto
}

function filterDoors(auto) {
    if (searchData.doors) {
        return auto.doors === Number(searchData.doors)
    }
    return auto
}

function filterTransmission(auto) {
    if (searchData.transmission) {
        return auto.transmission === searchData.transmission
    }
    return auto
}

function filterColour(auto) {
    if (searchData.colour) {
        return auto.colour === searchData.colour
    }
    return auto
}

//=============================================Local Storage=============================================
function completeAllSelects() {
    $selectBrand.value = searchData.brand
    $selectYear.value = searchData.year
    $selectMinPrice.value = searchData.minPrice
    $selectMaxPrice.value = searchData.maxPrice
    $selectDoors.value = searchData.doors
    $selectTransmission.value = searchData.transmission
    $selectColour.value = searchData.colour
}