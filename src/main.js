const categories = ['全部', '居家收纳', '文具手作', '数码配件', '香氛礼物'];

const products = [
  { id: 1, name: '云朵陶瓷马克杯', category: '居家收纳', price: 39, tag: '热卖', rating: 4.9, image: '☁️' },
  { id: 2, name: '便携格纹帆布袋', category: '居家收纳', price: 29, tag: '新品', rating: 4.8, image: '👜' },
  { id: 3, name: '复古胶带礼盒', category: '文具手作', price: 26, tag: '套装', rating: 4.7, image: '🎁' },
  { id: 4, name: '磁吸理线夹 6 枚', category: '数码配件', price: 18, tag: '实用', rating: 4.9, image: '🔌' },
  { id: 5, name: '森林香氛蜡烛', category: '香氛礼物', price: 49, tag: '礼物', rating: 4.8, image: '🕯️' },
  { id: 6, name: '透明桌面收纳盒', category: '居家收纳', price: 35, tag: '精选', rating: 4.6, image: '🗃️' },
  { id: 7, name: '奶油色便利贴组', category: '文具手作', price: 15, tag: '低价', rating: 4.7, image: '📝' },
  { id: 8, name: '迷你蓝牙遥控器', category: '数码配件', price: 59, tag: '便携', rating: 4.5, image: '🎛️' },
];

let activeCategory = '全部';
let query = '';
let cart = [];

const categoryList = document.querySelector('#categories');
const productGrid = document.querySelector('#productGrid');
const cartButton = document.querySelector('#cartButton');
const searchInput = document.querySelector('#searchInput');

function renderCategories() {
  categoryList.innerHTML = categories.map((category) => `
    <button class="${activeCategory === category ? 'active' : ''}" data-category="${category}">${category}</button>
  `).join('');
}

function renderProducts() {
  const filteredProducts = products.filter((product) => {
    const categoryMatch = activeCategory === '全部' || product.category === activeCategory;
    const queryMatch = product.name.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  });

  productGrid.innerHTML = filteredProducts.map((product) => `
    <article class="product-card">
      <button class="love" aria-label="收藏 ${product.name}">♡</button>
      <div class="product-image">${product.image}</div>
      <div class="product-meta"><span>${product.tag}</span><span>★ ${product.rating}</span></div>
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <div class="product-footer"><strong>¥${product.price}</strong><button data-id="${product.id}">加入购物车</button></div>
    </article>
  `).join('') || '<p class="empty">暂时没有找到相关小物，换个关键词试试吧。</p>';
}

function renderCart() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartButton.textContent = `🛍️ ${cart.length} 件 · ¥${total}`;
}

categoryList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderProducts();
});

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]');
  if (!button) return;
  const product = products.find((item) => item.id === Number(button.dataset.id));
  cart = [...cart, product];
  renderCart();
});

searchInput.addEventListener('input', (event) => {
  query = event.target.value;
  renderProducts();
});

renderCategories();
renderProducts();
renderCart();
