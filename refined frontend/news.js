// news.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#symptom-checker .container");
  const loading = document.getElementById("loading");

  const newsApiUrl = "https://newsapi.org/v2/top-headlines?category=health&country=in&apiKey=0603a2c3b2c14251a0fef2daeea3bd01";

  // Use AllOrigins proxy to bypass CORS
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(newsApiUrl)}`;

  fetch(proxyUrl)
    .then(res => res.json())
    .then(data => {
      const parsed = JSON.parse(data.contents); // actual NewsAPI response
      console.log("Fetched articles via proxy:", parsed.articles);

      if (loading) loading.remove();

      if (!parsed.articles || parsed.articles.length === 0) {
        container.insertAdjacentHTML("beforeend", "<p>No news available right now.</p>");
        return;
      }

      parsed.articles.forEach(article => {
        const block = document.createElement("div");
        block.className = "alternating-grid";
        block.style.marginTop = "40px";

        block.innerHTML = `
          <div class="image-placeholder">
            <img src="${article.urlToImage || 'logo.jpg'}" alt="News Image" style="width:100%; height:auto; border-radius:8px;">
          </div>
          <div class="text-block-background">
            <h3><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></h3>
            <p>${article.description || 'No description available.'}</p>
          </div>
        `;

        container.appendChild(block);
      });
    })
    .catch(err => {
      console.error("Error loading news via proxy:", err);
      if (loading) loading.textContent = "⚠ Unable to load news. Please try again later.";
    });
});
