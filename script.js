const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input');
const themeChanger = document.querySelector('.theme-changer');

let allCountriesData;

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,area,continents')
  .then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch countries: ${res.status}`);
    countriesContainer.innerHTML = '<p>Loading...</p>';
    return res.json();
  })
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  })
  .catch((err) => {
    console.error(err);
    countriesContainer.innerHTML = '<p>Error loading countries. Please try again later.</p>';
  });

filterByRegion.addEventListener('change', (e) => {
  const region = e.target.value;
  if (!region) return;
  fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,flags,capital,population,region,area,continents`)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch region ${region}: ${res.status}`);
      countriesContainer.innerHTML = '<p>Loading...</p>';
      return res.json();
    })
    .then((data) => {
      const searchQuery = searchInput.value.toLowerCase();
      const filteredBySearch = data.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery)
      );
      renderCountries(filteredBySearch);
    })
    .catch((err) => {
      console.error(err);
      countriesContainer.innerHTML = '<p>No countries found for this region.</p>';
    });
});

function renderCountries(data) {
  countriesContainer.innerHTML = '';
  if (!data || data.length === 0) {
    countriesContainer.innerHTML = '<p>No countries found.</p>';
    return;
  }
  if (!Array.isArray(data) || data.length === 0) {
    countriesContainer.innerHTML = '<p>No countries found.</p>';
    return;
  }

  data.forEach((country) => {
    const countryCard = document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href = `./country.html?name=${encodeURIComponent(country.name.common)}`;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag" />
      <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${country.capital?.[0] || 'N/A'}</p>
          <p><b>Area: </b>${country.area?.toLocaleString('en-IN') || 'N/A'} km²</p>
          <p><b>Continent: </b>${country.continents?.[0] || 'N/A'}</p>
      </div>
    `;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener('input', debounce((e) => {
  const searchQuery = e.target.value.toLowerCase();
  const region = filterByRegion.value;

  let filteredCountries = allCountriesData;

  if (region) {
    filteredCountries = filteredCountries.filter((country) =>
      country.region === region
    );
  }

  filteredCountries = filteredCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery)
  );
  renderCountries(filteredCountries);
}, 300));

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i> Light Mode`;
}

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  const isDark = document.body.classList.contains('dark');

  if (isDark) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }

  themeChanger.innerHTML = `<i class="fa-regular ${isDark ? 'fa-sun' : 'fa-moon'}"></i> ${isDark ? 'Light' : 'Dark'} Mode`;
});