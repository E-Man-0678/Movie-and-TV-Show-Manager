document.addEventListener('DOMContentLoaded', () => {
    const addTitleButton = document.getElementById('add-title-button');
    const addTitleFormSection = document.getElementById('add-title-form');
    const titleForm = document.getElementById('title-form');

    // Initial state: Hide the form
    addTitleFormSection.style.display = 'none';

    // Toggle visibility of the form when 'Add Title' button is clicked
    addTitleButton.addEventListener('click', () => {
        if (addTitleFormSection.style.display === 'none') {
            addTitleFormSection.style.display = 'block';
        } else {
            addTitleFormSection.style.display = 'none';
        }
    });

    // Handle form submission
    titleForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const titleName = document.getElementById('title-name').value;
        const type = document.getElementById('type').value;
        const genre = document.getElementById('genre').value;
        const year = document.getElementById('year').value;
        const rating = document.getElementById('rating').value;

        const newTitle = {
            name: titleName,
            type: type,
            genre: genre,
            year: year,
            rating: parseFloat(rating)
        };

        console.log('New Title Added:', newTitle);

        // In a real application, you would save this data (e.g., to localStorage or a server)
        // For now, we just clear the form and hide it.
        titleForm.reset();
        addTitleFormSection.style.display = 'none';

        alert(`Added "${newTitle.name}" (${newTitle.year}) to your list!`);
    });

    // Placeholder function to render a title (for demonstration)
    function renderTitle(containerId, title) {
        const container = document.getElementById(containerId);
        const titleElement = document.createElement('div');
        titleElement.className = 'title-card';
        titleElement.innerHTML = `
            <h3>${title.name}</h3>
            <p>Type: ${title.type}</p>
            <p>Genre: ${title.genre}</p>
            <p>Year: ${title.year}</p>
            <p>Rating: ${title.rating}/5</p>
        `;
        container.appendChild(titleElement);
    }

    // Preloaded list of all titles
    const allTitles = [
        { name: "Inception", type: "movie", genre: "Sci-Fi", year: 2010, rating: 4.5 },
        { name: "Breaking Bad", type: "tv", genre: "Crime", year: 2008, rating: 4.9 },
        { name: "Dune", type: "movie", genre: "Sci-Fi", year: 2021, rating: 4.2 },
        { name: "The Matrix", type: "movie", genre: "Sci-Fi", year: 1999, rating: 4.7 },
        { name: "Game of Thrones", type: "tv", genre: "Fantasy", year: 2011, rating: 4.6 },
        { name: "Pulp Fiction", type: "movie", genre: "Crime", year: 1994, rating: 4.8 },
        { name: "Stranger Things", type: "tv", genre: "Horror", year: 2016, rating: 4.4 }
    ];

    // For the 'Most Popular' section, we'll use a subset or all titles.
    // For simplicity, we'll use allTitles for now.
    const popularTitles = allTitles;

    // Render popular titles on load
    popularTitles.forEach(title => renderTitle('popular-list', title));

    // Populate similarity selector with all titles
    const similaritySelector = document.getElementById('similarity-selector');
    allTitles.forEach(title => {
        const option = document.createElement('option');
        option.value = title.name;
        option.textContent = title.name;
        similaritySelector.appendChild(option);
    });

    // Handle similarity selection change (placeholder logic)
    similaritySelector.addEventListener('change', (event) => {
        const selectedTitleName = event.target.value;
        const similarList = document.getElementById('similar-list');
        similarList.innerHTML = ''; // Clear previous results

        if (selectedTitleName) {
            const selectedTitle = allTitles.find(t => t.name === selectedTitleName);
            if (selectedTitle) {
                // Simple placeholder for "similar" titles: titles of the same genre, excluding the selected one
                const similarPlaceholder = allTitles
                    .filter(t => t.genre === selectedTitle.genre && t.name !== selectedTitle.name)
                    .slice(0, 2); // Take up to 2 similar titles

                // If we found similar titles, render them.
                similarPlaceholder.forEach(title => renderTitle('similar-list', title));
            }
        }
    });
});
