/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const {
    default: Axios
} = require("axios");


Axios.get('https://lambda-times-api.herokuapp.com/articles')
    .then((result) => {
        cardsMaker(result.data);
    })
    .catch((err) => {
        console.log('something went wrong', err);
    })
    .finally(() => {
        console.log('done');
    });

function cardMaker(article) {
    // Instantiate
    const card = document.createElement('div');
    const headline = document.createElement('div');
    const author = document.createElement('div');
    const imageContainer = document.createElement('div');
    const authorImage = document.createElement('img');
    const authorName = document.createElement('span');

    // Structure
    card.appendChild(headline);
    card.appendChild(author);
    author.appendChild(imageContainer);
    imageContainer.appendChild(authorImage);
    author.appendChild(authorName);

    // Class Names
    card.classList.add('card');
    headline.classList.add('headline');
    author.classList.add('author');
    imageContainer.classList.add('img-container');

    // Content
    headline.textContent = article.headline;
    authorImage.src = article.authorPhoto;
    authorName.textContent = article.authorName

    return card;
}


function cardsMaker(authorInfo) {
    const cardSection = document.querySelector('.cards-container');
    let articles = authorInfo.articles;
    let articleKeys = Object.keys(articles);
    for (let index = 0; index < articleKeys.length; index++) {
        let key = articleKeys[index];
        const articleTopic = articles[key];
        let topicContainer = document.createElement('div');
        topicContainer.setAttribute('id', key + 'topic');
        topicContainer.classList.add('topic-container');
        cardSection.appendChild(topicContainer);
        for (let i = 0; i < articleTopic.length; i++) {
            const article = articleTopic[i];
            let card = cardMaker(article);
            topicContainer.appendChild(card);

            // Events
            card.addEventListener('click', (event) => {
                console.log(article.headline);
            })
        }
    }
}