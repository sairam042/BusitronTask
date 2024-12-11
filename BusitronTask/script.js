const searchBox = document.getElementById('searchBox');
const suggestionsBox = document.getElementById('suggestions');

// Api call to fetch suggestions as said in task
async function fetchSuggestions(query) {
    const response = await fetch(`https://api.datamuse.com/sug?s=${query}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.error('Error fetching suggestions');
        return [];
    }
}

//suggestions
function displaySuggestions(suggestions) {
    suggestionsBox.innerHTML = '';

    if (suggestions.length === 0) {
        const noSuggestionsDiv = document.createElement('div');
        noSuggestionsDiv.id = 'noSuggestions';
        noSuggestionsDiv.textContent = 'No suggestions found.';
        suggestionsBox.appendChild(noSuggestionsDiv);
        return;
    }

    suggestions.forEach(suggestion => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.textContent = suggestion.word;
        suggestionDiv.addEventListener('click', () => {
            searchBox.value = suggestion.word;
            suggestionsBox.innerHTML = '';
        });
        suggestionsBox.appendChild(suggestionDiv);
    });
}

// EventListener for search box
searchBox.addEventListener('input', async (e) => {
    const query = e.target.value.trim();

    if (query.length > 0) {
        const suggestions = await fetchSuggestions(query);
        displaySuggestions(suggestions);
    } else {
        suggestionsBox.innerHTML = '';
    }
});

// Hiding the suggestion box when user click outside the suggestion list
document.addEventListener('click', (e) => {
    if (!suggestionsBox.contains(e.target) && e.target !== searchBox) {
        suggestionsBox.innerHTML = '';
    }
});