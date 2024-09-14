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

        if(country.name.official) {
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

themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')
})