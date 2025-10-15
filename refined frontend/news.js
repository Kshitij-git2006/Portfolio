const API_BASE = "https://java-miniproject.onrender.com/api";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#symptom-checker .container");
  const loading = document.getElementById("loading");

  fetch(`${API_BASE}/news/daily`)
    .then(res => res.json())
    .then(articles => {
      console.log("Fetched articles from backend:", articles);

      if (loading) loading.remove();

      if (!articles || articles.length === 0) {
        container.insertAdjacentHTML("beforeend", "<p>No news available right now.</p>");
        return;
      }

      articles.forEach(article => {
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
      console.error("Error loading news:", err);
      if (loading) loading.textContent = "⚠ Unable to load news. Please try again later.";
    });
});
