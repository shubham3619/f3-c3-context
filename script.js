// Function to fetch the current image of the day when the page loads
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    const apiKey = 'j6uuOFL9sBZeqBQCYG4wvOV4vQ3qBw4p20pHA4hd';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Display the image and its details in the "current-image-container"
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;
        })
        .catch((error) => {
            console.error('Error fetching current image:', error);
        });
}

// Function to fetch the image for the selected date
function getImageOfTheDay(selectedDate) {
    const apiKey = 'j6uuOFL9sBZeqBQCYG4wvOV4vQ3qBw4p20pHA4hd';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Display the image and its details in the "current-image-container"
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;

            // Save the selected date to local storage
            saveSearch(selectedDate);

            // Add the selected date to the search history list
            addSearchToHistory(selectedDate);
        })
        .catch((error) => {
            console.error('Error fetching image for selected date:', error);
        });
}

// Function to save a search date to local storage
function saveSearch(date) {
    // Get the existing search history from local storage (if any)
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Add the new date to the search history array
    searchHistory.push(date);

    // Save the updated search history back to local storage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Function to add search history to the UI
function addSearchToHistory(date) {
    const searchHistoryList = document.getElementById('search-history');

    // Create a new list item and add it to the search history list
    const listItem = document.createElement('li');
    listItem.textContent = date;

    // Add a click event listener to fetch and display the image for the clicked date
    listItem.addEventListener('click', () => {
        getImageOfTheDay(date);
    });

    searchHistoryList.appendChild(listItem);
}

// Attach an event listener to the form for submitting a date
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedDate = document.getElementById('search-input').value;
    getImageOfTheDay(selectedDate);
});

// Load the current image of the day when the page loads
getCurrentImageOfTheDay();
