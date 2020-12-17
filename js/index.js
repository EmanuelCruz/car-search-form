import {autos} from './db.js';

const $selectBrand = document.getElementById('brand')
const $selectYear = document.getElementById('year')
const $selectMinPrice = document.getElementById('min-price')
const $selectMaxPrice = document.getElementById('max-price')
const $selectDoors = document.getElementById('doors')
const $selectTransmission = document.getElementById('transmission')
const $selectColour = document.getElementById('colour')

const $groupCards = document.querySelector('.group-cards')
const $templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()

const $templateSelectYear = document.getElementById('template-select-year').content
const fragmentSelect = document.createDocumentFragment()
const currentYear = new Date().getFullYear()

const searchData = {
    brand : '',
    year : '',
    minPrice : '',
    maxPrice : '',
    doors : '',
    transmission : '',
    colour : ''
}

document.addEventListener("DOMContentLoaded", () => {
    showCars(autos);
    toggleDetails()
    fillSelects()
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
        searchData.year = Number(e.target.value)
        const filteredCars = filterResults()
        showCars(filteredCars);
    })
    $selectMinPrice.addEventListener('change',e=>{
        searchData.minPrice = Number(e.target.value)
        const filteredCars = filterResults()
        showCars(filteredCars);
    })
    $selectMaxPrice.addEventListener('change',e=>{
        searchData.maxPrice = Number(e.target.value)
        const filteredCars = filterResults()
        showCars(filteredCars);
    })
    $selectDoors.addEventListener('change',e=>{
        searchData.doors = Number(e.target.value)
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
            e.target.classList.toggle('hidden')
        } else if (e.target.matches('.info')) {
            e.target.previousElementSibling.classList.toggle('hidden')
            e.target.classList.remove('move-left')
        }
    })
}

function fillSelects() {
    for (let index = 0; index < 10; index++) {
        let year = currentYear-index
        $templateSelectYear.querySelector('option').innerHTML = year
        $templateSelectYear.querySelector('option').setAttribute('value',year)

        const $option = $templateSelectYear.cloneNode(true)
        fragmentSelect.appendChild($option)
    }
    $selectYear.appendChild(fragmentSelect)
}

//=============================================FILTRADO DE AUTOS=============================================
function filterResults() {
    const result = autos.filter(filterBrand).filter(filterYear).filter(filterMinPrice).filter(filterMaxPrice).filter(filterDoors).filter(filterTransmission).filter(filterColour)
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
        return auto.year === searchData.year
    }
    return auto
}

function filterMinPrice(auto) {
    if (searchData.minPrice) {
        return auto.price >= searchData.minPrice
    }
    return auto
}

function filterMaxPrice(auto) {
    if (searchData.maxPrice) {
        return auto.price <= searchData.maxPrice
    }
    return auto
}

function filterDoors(auto) {
    if (searchData.doors) {
        return auto.doors === searchData.doors
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