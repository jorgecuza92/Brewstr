const cityTextBox = document.getElementById("cityTextBox")
const stateDropdown = document.getElementById("stateDropdown")
const submitButton = document.getElementById("submitButton")
// const searchTextBox = document.getElementById("searchTextBox")
// const submitSearchButton = document.getElementById("submitSearchButton")

const breweriesContainer = document.getElementById("breweriesContainer")

function fetchBreweriesByCityState(city, state) {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}&by_city=${city}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "fb7457a28cmsh8446e8ae6d62e1dp123bf0jsn87f55a1983ba",
            "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com"
        }
    }).then(response => {
        console.log(response);
        return response.json();
    }).then((result) => {
        console.log(result);
        displayBreweries(result)
    }).catch(err => {
        console.error(err);
    });
}

// function fetchBreweriesBySearch() {
//     fetch(`https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search?query=dog`, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-key": "fb7457a28cmsh8446e8ae6d62e1dp123bf0jsn87f55a1983ba",
//             "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com"
//         }
//     }).then(response => {
//         console.log(response);
//     }).then((result) => {
//         console.log(result);
//         displayBreweries(result)
//     }).catch(err => {
//         console.error(err);
//     });
// }

submitButton.addEventListener("click", function () {
    const city = cityTextBox.value
    const state = stateDropdown.value

    fetchBreweriesByCityState(city, state)

    cityTextBox.value = ""
    stateDropdown.value = ""
})

// submitSearchButton.addEventListener("click", function() {
//     const search = searchTextBox.value

//     fetchBreweriesBySearch()

//     searchTextBox.value = ""
// })

function displayBreweries(result) {
    for (let index = 0; index < result.length; index++) {
        let brewery = result[index]

        const breweryItem = `
            <div class="brewery_container">
                <div class="name_div">${brewery.name}</div>
                <div class="address_div">${brewery.street} ${brewery.city}, ${abbreviateState(brewery.state)} ${brewery.postal_code}</div>
                <div class="contact_div">
                    <a href="${brewery.website_url}" target="_blank">Website</a>
                    <a href="tel:${brewery.phone}">Phone</a>
                </div>
            </div>
        `

        breweriesContainer.insertAdjacentHTML('beforeend', breweryItem)
    }
}

function abbreviateState(input) {
    const states = [
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['American Samoa', 'AS'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['Armed Forces Americas', 'AA'],
        ['Armed Forces Europe', 'AE'],
        ['Armed Forces Pacific', 'AP'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['District Of Columbia', 'DC'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Guam', 'GU'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Marshall Islands', 'MH'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Northern Mariana Islands', 'NP'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Puerto Rico', 'PR'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['US Virgin Islands', 'VI'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    var i;
    input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    for (i = 0; i < states.length; i++) {
        if (states[i][0] == input) {
            return (states[i][1]);
        }
    }
}