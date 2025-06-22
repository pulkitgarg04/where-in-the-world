const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const fullName = document.querySelector('.full-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const themeChanger = document.querySelector('.theme-changer')
const timezones = document.querySelector('.timezones')
const area = document.querySelector('.area')
const continents = document.querySelector('.continents')
const independent = document.querySelector('.independent')
const unMember = document.querySelector('.un-member')
const drivingSide = document.querySelector('.driving-side')
const maps = document.querySelector('.maps')

document.addEventListener("DOMContentLoaded", function () {
    document.title = `${countryName} - Countries List`;
});

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        flagImage.src = country.flags.svg
        countryNameH1.innerText = country.name.common
        population.innerText = country.population.toLocaleString('en-IN')
        region.innerText = country.region
        topLevelDomain.innerText = country.tld.join(', ')

        const faviconElement = document.getElementById('favicon');
        faviconElement.href = country.flags.svg;

        if (country.capital) {
            capital.innerText = country.capital?.[0]
        }

        if (country.subregion) {
            subRegion.innerText = country.subregion
        }

        if (country.name.nativeName) {
            const nativeNames = Object.values(country.name.nativeName)
                .map(name => name.common)
                .join(', ');
            nativeName.innerText = nativeNames;
        } else {
            nativeName.innerText = country.name.common
        }

        if (country.name.official) {
            fullName.innerText = country.name.official;
        }

        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies)
                .map((currency) => `${currency.symbol} ${currency.name}`)
                .join(', ')
        }

        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ')
        }

        if (country.timezones) {
            timezones.innerText = country.timezones.join(', ')
        }

        if (country.area) area.innerText = `${country.area.toLocaleString('en-IN')} km²`
        if (country.continents) continents.innerText = country.continents.join(', ')
        independent.innerText = country.independent ? 'Yes' : 'No'
        unMember.innerText = country.unMember ? 'Yes' : 'No'
        if (country.car && country.car.side) drivingSide.innerText = country.car.side.charAt(0).toUpperCase() + country.car.side.slice(1)
        if (country.maps && country.maps.googleMaps) {
            maps.innerHTML = `<a href="${country.maps.googleMaps}" target="_blank" rel="noopener noreferrer">Google Maps</a>`
        }

        console.log(country);
        if (country.borders) {

            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        // console.log(borderCountry)
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.innerText = borderCountry.name.common
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        borderCountries.append(borderCountryTag)
                    })
            })
        }
    })

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark')
    themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`
}

themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')

    const isDark = document.body.classList.contains('dark')

    if (isDark) {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.setItem('theme', 'light')
    }

    themeChanger.innerHTML = `<i class="fa-regular ${isDark ? 'fa-sun' : 'fa-moon'}"></i>&nbsp;&nbsp;${isDark ? 'Light' : 'Dark'} Mode`
})