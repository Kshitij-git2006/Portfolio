const API_BASE = "https://java-miniproject.onrender.com/api";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#symptom-checker .container");
  const loading = document.getElementById("loading");

  if (!container || !loading) return;

  console.log("Fetching news from backend...");

  // Add a timeout in case backend is slow
  const loadingTimeout = setTimeout(() => {
    loading.textContent = "⚠ News taking too long to load. Try again later.";
  }, 15000); // 15 seconds

  fetch(`${API_BASE}/news/daily`)
    .then(res => {
      console.log("Response received:", res);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(articles => {
      clearTimeout(loadingTimeout);

      console.log("Articles fetched:", articles);
      if (loading) loading.remove();

      if (!articles || articles.length === 0) {
        container.insertAdjacentHTML(
          "beforeend",
          "<p>No news available right now.</p>"
        );
        return;
      }

      articles.forEach(article => {
        console.log("Appending article:", article.title); // debug
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
      clearTimeout(loadingTimeout);
      console.error("Error loading news:", err);
      if (loading) loading.textContent =
        "⚠ Unable to load news. Please try again later.";
    });
});
