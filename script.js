
let multiCurrentIndex = 0;
let isScrolling = false;
const multiTrack = document.getElementById('multiCarouselTrack');
const multiVisibleItems = 4;

// Исходные данные элементов
const itemsData = [
    { 
        image: 'images/1Z5A6084.png' 
    },
    { 
        image: 'images/1Z5A6121.png' 
    },
    { 
        image: 'images/1Z5A6181.png' 
    },
    { 
        image: 'images/1Z5A6346.png' 
    },
    { 
        image: 'images/1Z5A6413.png' 
    },
    { 
        image: 'images/1Z5A6526.png' 
    }
];

// Инициализация бесконечной карусели
function initInfiniteCarousel() {
    multiTrack.innerHTML = '';
    
    // Дублируем элементы в начале и конце для бесконечности
    const totalItems = itemsData.length;
    
    // Добавляем копии последних элементов в начало
    for (let i = totalItems - multiVisibleItems; i < totalItems; i++) {
        createCarouselItem(itemsData[i]);
    }
    
    // Добавляем основные элементы
    itemsData.forEach(item => {
        createCarouselItem(item);
    });
    
    // Добавляем копии первых элементов в конец
    for (let i = 0; i < multiVisibleItems; i++) {
        createCarouselItem(itemsData[i]);
    }
    
    // Устанавливаем начальную позицию (на первые основные элементы)
    multiCurrentIndex = multiVisibleItems;
    updateMultiForMobile();
    updateMultiCarousel();
}

function createCarouselItem(item) {
    const carouselItem = document.createElement('div');
    carouselItem.className = 'multi-carousel-item';
    carouselItem.innerHTML = `
        <div class="multi-demo-card">
            <img src="${item.image}" alt="Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
        </div>
    `;
    multiTrack.appendChild(carouselItem);
}

function scrollMultiCarousel(direction) {
    if (isScrolling) return;
    
    isScrolling = true;
    const items = document.querySelectorAll('.multi-carousel-item');
    const totalOriginalItems = itemsData.length;
    const totalDisplayedItems = items.length;
    
    if (direction === 'next') {
        multiCurrentIndex++;
        
        // Если дошли до конца дублированных элементов в конце
        if (multiCurrentIndex >= totalDisplayedItems - multiVisibleItems) {
            // Быстро перескакиваем на начало (без анимации)
            setTimeout(() => {
                multiTrack.style.transition = 'none';
                multiCurrentIndex = multiVisibleItems;
                updateMultiCarousel();
                
                // Возвращаем анимацию
                setTimeout(() => {
                    multiTrack.style.transition = 'transform 0.8s ease';
                }, 50);
            }, 800);
        }
    } else {
        multiCurrentIndex--;
        
        // Если дошли до начала дублированных элементов в начале
        if (multiCurrentIndex < 0) {
            // Быстро перескакиваем на конец (без анимации)
            setTimeout(() => {
                multiTrack.style.transition = 'none';
                multiCurrentIndex = totalOriginalItems;
                updateMultiCarousel();
                
                // Возвращаем анимацию
                setTimeout(() => {
                    multiTrack.style.transition = 'transform 0.8s ease';
                }, 50);
            }, 800);
        }
    }
    
    updateMultiCarousel();
    
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

function updateMultiCarousel() {
    const items = document.querySelectorAll('.multi-carousel-item');
    if (items.length === 0) return;
    
    const itemWidth = items[0].offsetWidth + 20;
    multiTrack.style.transform = `translateX(-${multiCurrentIndex * itemWidth}px)`;
}

// Обработчик скролла мыши
document.querySelector('.multi-carousel-container').addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if (isScrolling) return;
    
    if (e.deltaY > 0) {
        scrollMultiCarousel('next');
    } else {
        scrollMultiCarousel('prev');
    }
});

// Адаптивность
function updateMultiForMobile() {
    const items = document.querySelectorAll('.multi-carousel-item');
    
    if (window.innerWidth < 768) {
        items.forEach(item => {
            item.style.flex = '0 0 calc(50% - 10px)';
        });
    } else if (window.innerWidth < 480) {
        items.forEach(item => {
            item.style.flex = '0 0 calc(100% - 10px)';
        });
    } else {
        items.forEach(item => {
            item.style.flex = '0 0 calc(25% - 15px)';
        });
    }
    
    setTimeout(() => {
        updateMultiCarousel();
    }, 100);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initInfiniteCarousel();
    window.addEventListener('resize', updateMultiForMobile);
});



// Инициализация всех подсказок на странице
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
