const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const vkBtn = document.getElementById("vk");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function showNewQuote() {
  showLoadingSpinner();
  // pick a random quote from apiQuotes array
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if author field is blank and replace it with 'Unknown'
  if (!randomQuote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = randomQuote.author;
  }
  // check quote length to determine styling //
  if (randomQuote.text.length > 60) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // set quote, hide loader
  quoteText.textContent = randomQuote.text;
  removeLoadingSpinner();
}

async function getQuotesFromApi() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    showNewQuote();
  } catch (error) {
    // catch error here
  }
}

function shareQuoteVk() {
  const vkUrl = `https://vk.com/`;
  window.open(vkUrl, "_blank");
}

// * Event Listeners
newQuoteBtn.addEventListener("click", showNewQuote);
vkBtn.addEventListener("click", shareQuoteVk);

// * On Load
getQuotesFromApi();
