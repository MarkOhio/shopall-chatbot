const grid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let activeCategory = 'All';
let searchQuery = '';

function formatPrice(n) {
  return '₦' + n.toLocaleString();
}

function render() {
  let list = products;

  if (activeCategory !== 'All') {
    list = list.filter(p => p.category === activeCategory);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <p>No products found for "<strong>${searchQuery || activeCategory}</strong>"</p>
      </div>`;
    return;
  }

  list.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <img class="card-img" src="${p.image}" alt="${p.name}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80'">
      <div class="card-body">
        <div class="card-category">${p.category}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-desc">${p.description}</div>
        <div class="card-price">${formatPrice(p.price)} <span>NGN</span></div>
      </div>`;
    grid.appendChild(card);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    render();
  });
});

function doSearch() {
  searchQuery = searchInput.value;
  render();
}

searchBtn.addEventListener('click', doSearch);
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

render();
