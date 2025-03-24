document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-name");
    const searchButton = document.getElementById("search-button");
    const titleElement = document.getElementById("js--serie-title");
    const descriptionElement = document.getElementById("js--serie-description");
 
    function fetchShow(query) {
        fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const show = data[0].show;
                    titleElement.textContent = show.name;
                    descriptionElement.innerHTML = show.summary;
                } else {
                    titleElement.textContent = "No show found";
                    descriptionElement.textContent = "";
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                titleElement.textContent = "Error loading data";
                descriptionElement.textContent = "";
            });
    }
 
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchShow(query);
        }
    });
 fetchShow("The Office");
});
 
 