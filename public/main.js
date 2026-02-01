// Mock Data for Ingredients
// Data Source: https://github.com/hellomynam3/dubaizzon (ingredients.ts)
const ingredientsData = [
    // --- Core Ingredients (Filling & Topping) ---
    {
        id: 'kataifi',
        type: 'core',
        name: '카다이프 면 (Kataifi)',
        unit: '100g',
        pricePerUnit: 2580,
        gramsPerCookie: 15,
        emoji: '🍝',
        searchKeyword: '카다이프 면',
        tip: '비싸거나 구하기 어렵다면? 얇은 소면이나 건면을 잘게 부수어 버터에 튀기듯 볶아보세요! 실제 식감과 놀랍도록 비슷합니다.'
    },
    {
        id: 'pistachio-spread',
        type: 'core',
        name: '피스타치오 스프레드',
        unit: '100g',
        pricePerUnit: 9250,
        gramsPerCookie: 20,
        emoji: '🥜',
        searchKeyword: '피스타치오 스프레드',
        tip: '꾸덕한 식감을 원하시면 화이트 초콜릿을 살짝 섞어보세요. 100% 피스타치오 페이스트를 쓰면 단맛은 줄고 고소함이 폭발합니다!'
    },
    {
        id: 'dark-chocolate',
        type: 'core',
        name: '커버춰 다크 초콜릿',
        unit: '100g',
        pricePerUnit: 990,
        gramsPerCookie: 30,
        emoji: '🍫',
        searchKeyword: '커버춰 다크초콜릿',
        tip: '코팅용(컴파운드) 초콜릿은 템퍼링이 필요 없어 편하지만, 맛은 커버춰가 훨씬 깊습니다. 초보자라면 코팅용을 추천해요.'
    },
    {
        id: 'butter',
        type: 'core',
        name: '무염 버터 (필링+반죽)',
        unit: '100g',
        pricePerUnit: 1888,
        gramsPerCookie: 25, // 필링 10g + 반죽 15g
        emoji: '🧈',
        searchKeyword: '무염버터',
        tip: '일반 버터 대신 발효 버터(고메 버터)를 사용하면 카다이프를 볶을 때 풍미가 훨씬 깊고 고급스러워집니다.'
    },
    // --- Dough Ingredients (Cookie Base) ---
    {
        id: 'flour',
        type: 'dough',
        name: '중력분 (밀가루)',
        unit: '1kg',
        pricePerUnit: 250, // 1kg 2500원 -> 100g 250원
        gramsPerCookie: 20,
        emoji: '🌾',
        searchKeyword: '중력분',
        tip: '쿠키의 쫀득한 식감을 위해서는 박력분보다는 단백질 함량이 적당한 중력분을 사용하는 것이 좋습니다.'
    },
    {
        id: 'sugar',
        type: 'dough',
        name: '설탕 (황설탕/백설탕)',
        unit: '1kg',
        pricePerUnit: 200, // 1kg 2000원 -> 100g 200원
        gramsPerCookie: 15,
        emoji: '🧂',
        searchKeyword: '황설탕',
        tip: '황설탕은 쿠키에 수분감과 쫀득함을 주고, 백설탕은 바삭함을 줍니다. 두 가지를 섞어 쓰는 것이 베스트!'
    },
    {
        id: 'egg',
        type: 'dough',
        name: '계란 (특란)',
        unit: '10구(약 500g)',
        pricePerUnit: 800, // 10구 4000원 -> 500g 4000원 -> 100g 800원
        gramsPerCookie: 5, // 쿠키 10개당 계란 1개(50g) 사용 가정
        emoji: '🥚',
        searchKeyword: '동물복지 유정란',
        tip: '실온에 미리 꺼내두어 찬기를 뺀 계란을 사용해야 버터와 분리되지 않고 매끄럽게 유화됩니다.'
    }
];

// DOM Elements
const cookieCountInput = document.getElementById('cookie-count');
const totalPriceElement = document.getElementById('total-price');
const coreIngredientsContainer = document.getElementById('ingredients-core');
const doughIngredientsContainer = document.getElementById('ingredients-dough');

// Modal Elements
const modal = document.getElementById('ingredient-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalEmoji = document.getElementById('modal-emoji');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLinks = document.getElementById('modal-links');

// Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');

// Initialize
function init() {
    renderIngredients();
    calculateTotal();
    
    // Event Listeners
    cookieCountInput.addEventListener('input', calculateTotal);
    
    // Modal Close Events
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Theme Toggle
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
    });
}

// Render Ingredient Cards
function renderIngredients() {
    const createCardHTML = (ing) => `
        <article class="ingredient-card">
            <div class="card-image-placeholder">
                ${ing.emoji}
            </div>
            <div class="card-content">
                <h3>${ing.name}</h3>
                <p class="unit-price">기준: ${ing.unit}</p>
                <span class="price-tag">${formatCurrency(ing.pricePerUnit)} <small style="font-size:0.8rem; font-weight:normal;">/100g</small></span>
                <button class="buy-btn" onclick="openModal('${ing.id}')">
                    🔍 가격 비교 & 팁
                </button>
            </div>
        </article>
    `;

    // Render Core Ingredients
    coreIngredientsContainer.innerHTML = ingredientsData
        .filter(ing => ing.type === 'core')
        .map(createCardHTML)
        .join('');

    // Render Dough Ingredients
    doughIngredientsContainer.innerHTML = ingredientsData
        .filter(ing => ing.type === 'dough')
        .map(createCardHTML)
        .join('');
}

// Open Modal
window.openModal = function(id) {
    const ing = ingredientsData.find(item => item.id === id);
    if (!ing) return;

    modalEmoji.textContent = ing.emoji;
    modalTitle.textContent = ing.name;
    modalDesc.textContent = ing.tip;

    // Generate Shopping Links
    const queries = [
        { name: '네이버 쇼핑', url: 'https://search.shopping.naver.com/search/all?query=', class: 'shop-naver' },
        { name: '쿠팡', url: 'https://www.coupang.com/np/search?q=', class: 'shop-coupang' },
        { name: 'SSG 쓱', url: 'https://www.ssg.com/search.ssg?query=', class: 'shop-ssg' },
        { name: '마켓컬리', url: 'https://www.kurly.com/search?keyword=', class: 'shop-kurly' }
    ];

    modalLinks.innerHTML = queries.map(shop => `
        <a href="${shop.url}${encodeURIComponent(ing.searchKeyword)}" 
           class="shop-link ${shop.class}" 
           target="_blank" 
           rel="noopener noreferrer">
           ${shop.name} 검색
        </a>
    `).join('');

    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

// Calculate Total Cost
function calculateTotal() {
    const count = parseInt(cookieCountInput.value) || 0;
    
    if (count < 0) {
        totalPriceElement.textContent = '0원';
        return;
    }

    let totalCost = 0;

    ingredientsData.forEach(ing => {
        // 필요한 총 g수
        const totalGramsNeeded = ing.gramsPerCookie * count;
        // 100g 단위로 가격 책정되어 있으므로 비례 계산
        const cost = (totalGramsNeeded / 100) * ing.pricePerUnit;
        totalCost += cost;
    });

    // 10원 단위 반올림
    totalCost = Math.round(totalCost / 10) * 10;
    
    // Animation effect for numbers could be added here
    totalPriceElement.textContent = formatCurrency(totalCost);
}

// Utility: Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
}

// Run
document.addEventListener('DOMContentLoaded', init);
