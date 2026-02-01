// Mock Data for Ingredients
// Data Source: https://github.com/hellomynam3/dubaizzon (ingredients.ts)
const ingredientsData = [
    {
        id: 'kataifi',
        name: '카다이프 면 (Kataifi)',
        unit: '100g', // 기준 단위 통일
        pricePerUnit: 2580, // 500g 12,900원 기준
        gramsPerCookie: 15,
        emoji: '🍝',
        link: 'https://search.shopping.naver.com/search/all?query=카다이프+면'
    },
    {
        id: 'pistachio-spread',
        name: '피스타치오 스프레드',
        unit: '100g',
        pricePerUnit: 9250, // 200g 18,500원 기준
        gramsPerCookie: 20,
        emoji: '🥜',
        link: 'https://search.shopping.naver.com/search/all?query=피스타치오+스프레드'
    },
    {
        id: 'dark-chocolate',
        name: '커버춰 다크 초콜릿',
        unit: '100g',
        pricePerUnit: 990, // 1kg 9,900원 기준
        gramsPerCookie: 30,
        emoji: '🍫',
        link: 'https://search.shopping.naver.com/search/all?query=커버춰+다크초콜릿'
    },
    {
        id: 'butter',
        name: '무염 버터',
        unit: '100g',
        pricePerUnit: 1888, // 450g 8,500원 기준
        gramsPerCookie: 10,
        emoji: '🧈',
        link: 'https://search.shopping.naver.com/search/all?query=무염버터'
    }
];

// DOM Elements
const cookieCountInput = document.getElementById('cookie-count');
const totalPriceElement = document.getElementById('total-price');
const ingredientsListContainer = document.getElementById('ingredients-list');

// Initialize
function init() {
    renderIngredients();
    calculateTotal();
    
    // Event Listeners
    cookieCountInput.addEventListener('input', calculateTotal);
}

// Render Ingredient Cards
function renderIngredients() {
    ingredientsListContainer.innerHTML = ingredientsData.map(ing => `
        <article class="ingredient-card">
            <div class="card-image-placeholder">
                ${ing.emoji}
            </div>
            <div class="card-content">
                <h3>${ing.name}</h3>
                <p class="unit-price">기준: ${ing.unit}</p>
                <span class="price-tag">${formatCurrency(ing.pricePerUnit)}</span>
                <a href="${ing.link}" class="buy-btn" target="_blank" rel="noopener noreferrer">
                    최저가 검색하기
                </a>
            </div>
        </article>
    `).join('');
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
