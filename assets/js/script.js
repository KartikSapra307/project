// Your API key for YouTube Data API
const API_KEY = "AIzaSyD-joRvqRDeS6gXivkeaH2p9gHYPzTUb1s";

// Function to search YouTube videos
async function searchYouTube(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}+recipe&type=video&key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

// Handle the search button click
document.getElementById("searchBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const form1 = document.getElementById("form1").value.trim();
  const form2 = document.getElementById("form2").value.trim();
  const form3 = document.getElementById("form3").value.trim();
  const query = [form1, form2, form3].filter(Boolean).join(" ");

  if (!query) {
    alert("Please enter at least one ingredient!");
    return;
  }

  const videos = await searchYouTube(query);
  displaySearchResults(videos, query);
});

// Function to display search results
function displaySearchResults(videos, query) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = "";
  
    if (videos.length === 0) {
      resultsContainer.innerHTML = "<p>No results found. Try different ingredients.</p>";
      return;
    }
  
    videos.forEach((video) => {
      const videoId = video.id.videoId;
      const title = video.snippet.title;
      const thumbnailUrl = video.snippet.thumbnails.medium.url; // Medium quality thumbnail
  
      // Create a container for each video
      const listItem = document.createElement("li");
      listItem.style.listStyleType = "none";
      listItem.style.marginBottom = "20px";
      listItem.style.display = "flex";
      listItem.style.alignItems = "center";
      listItem.style.gap = "15px";
  
      // Create the thumbnail image
      const thumbnail = document.createElement("img");
      thumbnail.src = thumbnailUrl;
      thumbnail.alt = title;
      thumbnail.style.width = "120px";
      thumbnail.style.borderRadius = "8px";
      thumbnail.style.cursor = "pointer";
  
      // Add click event to load video on thumbnail click
      thumbnail.addEventListener("click", (event) => {
        event.preventDefault();
        loadYouTubeVideo(videoId, query);
      });
  
      // Create a link for the video title
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = title;
      link.style.color = "#007BFF";
      link.style.textDecoration = "none";
      link.style.fontSize = "16px";
      link.style.cursor = "pointer";
  
      link.addEventListener("mouseover", () => {
        link.style.textDecoration = "underline";
      });
      link.addEventListener("mouseout", () => {
        link.style.textDecoration = "none";
      });
  
      // Add click event to load video on title click
      link.addEventListener("click", (event) => {
        event.preventDefault();
        loadYouTubeVideo(videoId, query);
      });
  
      // Append the thumbnail and link to the list item
      listItem.appendChild(thumbnail);
      listItem.appendChild(link);
  
      // Append the list item to the results container
      resultsContainer.appendChild(listItem);
    });
  }  

// Function to load the selected video in the iframe
function loadYouTubeVideo(videoId, query) {
  console.log("Loading video with ID:", videoId); // Debugging
  document.getElementById("youtube-video").src = `https://www.youtube.com/embed/${videoId}`;
  document.getElementById("recipe-title").innerText = "Recipe Video";
  document.getElementById("selected-ingredients").innerText = query;
}
