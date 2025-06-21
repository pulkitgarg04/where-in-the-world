# Where in the World
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) ![REST Countries API](https://img.shields.io/badge/API-REST%20Countries-blue)

Where in the World is a dynamic web application that allows users to explore detailed information about countries worldwide. Powered by the [REST Countries API](https://restcountries.com/), the project features interactive country cards, detailed country profiles, search and filter functionalities, and a responsive light/dark mode interface.


## Features
- **Country Cards:** View a list of countries presented as cards.
- **Country Details:** Click on a card to get detailed information about a specific country.
- **Interactive Interface:** Easy-to-use interface for exploring country data.

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **External Libraries**:
    - Font Awesome for icons
    - Nunito Font for typography
- **API**: [REST Countries API (v3.1)](https://restcountries.com/)
- **Tools**: Git, GitHub

## Setup and Installation
To get started with the "Where in the World" project, follow these steps:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/pulkitgarg04/where-in-the-world.git
    ```

2. Navigate to the Project Directory:
    ```bash
    cd where-in-the-world
    ```

3. Open the Project in Your Browser:
Simply open `index.html` in your web browser to view the application.

## API Documentation
The project fetches data from the REST Countries API (v3.1). Key endpoints used:
- All Countries: `GET https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region`
- Region Filter: `GET https://restcountries.com/v3.1/region/{region}?fields=name,flags,capital,population,region`
- Country Details: `GET https://restcountries.com/v3.1/name/{name}?fullText=true`
- Border Countries: `GET https://restcountries.com/v3.1/alpha/{code}`

For full API details, refer to the [REST Countries API Documentation](https://restcountries.com/#endpoints).

##  License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.