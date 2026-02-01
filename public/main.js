// Mock Data for Ingredients
// Data Source: 몬트쿠키 원조 레시피 기반 재구성
const ingredientsData = [
    // --- Core Ingredients (Filling) ---
    {
        id: 'kataifi',
        type: 'core',
        name: '카다이프 면',
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
        id: 'white-chocolate',
        type: 'core',
        name: '화이트 커버춰 (필링용)',
        unit: '100g',
        pricePerUnit: 2200, // 1kg 22,000원 가정
        gramsPerCookie: 5,
        emoji: '🍫',
        searchKeyword: '커버춰 화이트초콜릿',
        tip: '필링을 단단하게 굳히는 접착제 역할을 합니다. 코팅용(컴파운드)보다는 커버춰가 맛이 좋습니다.'
    },
    {
        id: 'butter',
        type: 'core',
        name: '무염 버터 (필링+반죽)',
        unit: '100g',
        pricePerUnit: 1888,
        gramsPerCookie: 4, // 필링볶음용 2g + 반죽용 2g
        emoji: '🧈',
        searchKeyword: '무염버터',
        tip: '카다이프를 볶을 때와 마시멜로를 녹일 때 모두 사용됩니다. 풍미 좋은 고메 버터를 추천합니다.'
    },
    // --- Dough Ingredients (Marshmallow Base) ---
    {
        id: 'marshmallow',
        type: 'dough',
        name: '마시멜로 (흰색)',
        unit: '100g',
        pricePerUnit: 1000, // 1kg 10,000원 가정
        gramsPerCookie: 13,
        emoji: '☁️',
        searchKeyword: '바비큐 마시멜로',
        tip: '구워 먹는 큰 마시멜로(바비큐용)가 잘 녹습니다. 반드시 약불에서 인내심을 갖고 녹여주세요.'
    },
    {
        id: 'skim-milk',
        type: 'dough',
        name: '탈지분유/전지분유',
        unit: '100g',
        pricePerUnit: 1500,
        gramsPerCookie: 1,
        emoji: '🥛',
        searchKeyword: '탈지분유',
        tip: '분유를 넣으면 고급스러운 우유 풍미와 쫀득한 점도가 생깁니다. 없으면 생략 가능하지만 넣는 것을 추천!'
    },
    {
        id: 'cocoa-powder',
        type: 'dough',
        name: '코코아 파우더',
        unit: '100g',
        pricePerUnit: 2500, // 발로나 등 고급 기준
        gramsPerCookie: 3, // 반죽용 + 겉면 코팅용
        emoji: '🍫',
        searchKeyword: '발로나 코코아파우더',
        tip: '색과 향을 내는 중요한 재료입니다. 무가당 코코아 파우더를 사용하세요.'
    },
    {
        id: 'cooking-oil',
        type: 'dough',
        name: '식용유 (성형용)',
        unit: '100ml',
        pricePerUnit: 500,
        gramsPerCookie: 1, // 소량 사용
        emoji: '🌻',
        searchKeyword: '카놀라유',
        tip: '마시멜로 반죽은 끈적임이 엄청납니다! 손과 도구에 기름을 충분히 발라야 모양을 잡을 수 있습니다.'
    }
];

// DOM Elements
const cookieCountInput = document.getElementById('cookie-count');
const totalPriceElement = document.getElementById('total-price');
const coreIngredientsContainer = document.getElementById('ingredients-core');
const doughIngredientsContainer = document.getElementById('ingredients-dough');

// Savings Panel Elements
const marketTotalDisplay = document.getElementById('market-total-display');
const homeTotalDisplay = document.getElementById('home-total-display');
const savingsAmountDisplay = document.getElementById('savings-amount');
const savingsRatioDisplay = document.getElementById('savings-ratio');
const homeCostBar = document.getElementById('home-cost-bar');
const unitCostDisplay = document.getElementById('unit-cost');
const copyListBtn = document.getElementById('copy-list-btn');

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
    initRecipeCheckboxes();
    initToolCheckboxes(); // New function call
    
    // Event Listeners
    cookieCountInput.addEventListener('input', calculateTotal);
    copyListBtn.addEventListener('click', copyShoppingList);
    
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

// Recipe Checkbox Logic
function initRecipeCheckboxes() {
    const checkboxes = document.querySelectorAll('.step-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const stepCard = e.target.closest('.recipe-step');
            if (e.target.checked) {
                stepCard.classList.add('completed');
            } else {
                stepCard.classList.remove('completed');
            }
        });
    });
}

// Tool Checkbox Logic
function initToolCheckboxes() {
    const checkboxes = document.querySelectorAll('.tool-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const toolItem = e.target.closest('.tool-item');
            if (e.target.checked) {
                toolItem.style.opacity = '0.5';
                toolItem.style.textDecoration = 'line-through';
                toolItem.style.backgroundColor = 'var(--color-gray-100)';
            } else {
                toolItem.style.opacity = '1';
                toolItem.style.textDecoration = 'none';
                toolItem.style.backgroundColor = '';
            }
        });
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
                <span class="price-tag">${formatCurrency(ing.pricePerUnit)} <small style="font-size:0.8rem; font-weight:normal;">/100g(ml)</small></span>
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

// Copy Shopping List
async function copyShoppingList() {
    const count = parseInt(cookieCountInput.value) || 0;
    if (count <= 0) return;

    let text = `[🍪 두쫀쿠 ${count}개 만들기 장보기 리스트]\n\n`;
    let totalCost = 0;

    // Core Ingredients
    text += `--- 필링 재료 ---\n`;
    ingredientsData.filter(i => i.type === 'core').forEach(ing => {
        const grams = ing.gramsPerCookie * count;
        text += `- ${ing.name}: ${grams}g\n`;
        totalCost += (grams / 100) * ing.pricePerUnit;
    });

    // Dough Ingredients
    text += `\n--- 반죽 재료 ---\n`;
    ingredientsData.filter(i => i.type === 'dough').forEach(ing => {
        const grams = ing.gramsPerCookie * count;
        text += `- ${ing.name}: ${grams}${ing.id === 'cooking-oil' ? 'ml' : 'g'}\n`;
        totalCost += (grams / 100) * ing.pricePerUnit;
    });

    totalCost = Math.round(totalCost / 10) * 10;
    text += `\n==========\n💰 예상 재료비: ${formatCurrency(totalCost)}\n🔗 https://duzzoncoo.pages.dev`;

    try {
        await navigator.clipboard.writeText(text);
        const originalText = copyListBtn.textContent;
        copyListBtn.textContent = "✅ 복사 완료!";
        copyListBtn.style.backgroundColor = "#4CAF50";
        
        setTimeout(() => {
            copyListBtn.textContent = originalText;
            copyListBtn.style.backgroundColor = "";
        }, 2000);
    } catch (err) {
        alert('클립보드 복사에 실패했습니다.');
    }
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

// Calculate Total Cost & Savings
function calculateTotal() {
    const count = parseInt(cookieCountInput.value) || 0;
    const MARKET_PRICE_PER_UNIT = 6000; // 시중 평균 판매가

    if (count <= 0) {
        totalPriceElement.textContent = '0원';
        marketTotalDisplay.textContent = '0원';
        homeTotalDisplay.textContent = '0원';
        savingsAmountDisplay.textContent = '0원';
        homeCostBar.style.width = '0%';
        return;
    }

    let totalCost = 0;

    ingredientsData.forEach(ing => {
        const totalGramsNeeded = ing.gramsPerCookie * count;
        // 일부 재료(식용유 등)는 ml 단위지만 가격계산 로직은 동일
        const cost = (totalGramsNeeded / 100) * ing.pricePerUnit;
        totalCost += cost;
    });

    // 10원 단위 반올림
    totalCost = Math.round(totalCost / 10) * 10;
    const unitCost = Math.round(totalCost / count);

    // Savings Logic
    const marketTotal = count * MARKET_PRICE_PER_UNIT;
    const savings = marketTotal - totalCost;
    const ratio = totalCost > 0 ? (marketTotal / totalCost).toFixed(1) : 0;
    const barWidth = Math.min((totalCost / marketTotal) * 100, 100); // 최대 100%

    // Update UI
    totalPriceElement.textContent = formatCurrency(totalCost);
    marketTotalDisplay.textContent = formatCurrency(marketTotal);
    homeTotalDisplay.textContent = formatCurrency(totalCost);
    unitCostDisplay.textContent = formatCurrency(unitCost);
    
    if (savings > 0) {
        savingsAmountDisplay.textContent = formatCurrency(savings);
        savingsRatioDisplay.textContent = `🎉 약 ${ratio}배 이득! (개당 ${formatCurrency(unitCost)})`;
    } else {
        savingsAmountDisplay.textContent = "0원";
        savingsRatioDisplay.textContent = "재료비가 더 비싸요 😅";
    }

    // Update Bar Graph
    // 약간의 딜레이를 주어 애니메이션 효과 극대화 (선택사항)
    requestAnimationFrame(() => {
        homeCostBar.style.width = `${barWidth}%`;
    });
}

// Utility: Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
}

// Run
document.addEventListener('DOMContentLoaded', init);
