const books = [
  {
    title: "The Shining",
    author: "Stephen King",
    category: "Horror",
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/81K6tA8rG-L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Horror",
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/71C56P2r4uL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    category: "Self Development",
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/61u6j6HxaQL.jpg"
  },
  {
    title: "Ariel",
    author: "Sylvia Plath",
    category: "Poetry",
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/71YMngZLaAL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "The Argumentative Indian",
    author: "Amartya Sen",
    category: "History",
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/91sN3sFzJ0L.jpg"
  },
  {
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    category: "Self Development",
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/81rsD9Hl6pL.jpg"
  },
  // Add more books if needed
];

function renderBooks(bookList) {
  const grid = document.getElementById('bookGrid');
  grid.innerHTML = '';

  bookList.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';

    card.innerHTML = `
      <div class="heart" onclick="toggleLike(this)">♡</div>
      <img src="${book.image}" alt="${book.title}">
      <h4>${book.title}</h4>
      <p>by ${book.author}</p>
      <p><strong>${book.category}</strong></p>
      <div class="stars">${'★'.repeat(Math.floor(book.rating))}☆</div>
    `;

    grid.appendChild(card);
  });
}

function toggleLike(el) {
  el.classList.toggle('liked');
  el.textContent = el.classList.contains('liked') ? '❤️' : '♡';
}

function filterBooks(category) {
  const filtered = category === 'All' ? books : books.filter(b => b.category === category);
  renderBooks(filtered);
}

document.getElementById('searchInput').addEventListener('input', function() {
  const value = this.value.toLowerCase();
  const filtered = books.filter(book => book.title.toLowerCase().includes(value) || book.author.toLowerCase().includes(value));
  renderBooks(filtered);
});

renderBooks(books);
