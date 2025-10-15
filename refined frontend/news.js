// news.js

document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");

  // ✅ Replace with your real API endpoint if you have one
  const apiUrl = "https://newsapi.org/v2/top-headlines?category=health&country=in&apiKey=0603a2c3b2c14251a0fef2daeea3bd01";

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      loading.style.display = "none";
      const container = document.querySelector("#symptom-checker .container");

      if (!data.articles || data.articles.length === 0) {
        container.innerHTML += "<p>No news available at the moment.</p>";
        return;
      }

      const newsList = document.createElement("div");
      newsList.classList.add("news-grid");

      data.articles.slice(0, 6).forEach(article => {
        const card = document.createElement("div");
        card.classList.add("news-card");

        card.innerHTML = `
          <img src="${article.urlToImage || 'default-news.jpg'}" alt="">
          <h3>${article.title}</h3>
          <p>${article.description || ''}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        `;

        newsList.appendChild(card);
      });

      container.appendChild(newsList);
    })
    .catch(err => {
      loading.textContent = "Failed to load news.";
      console.error(err);
    });
});
