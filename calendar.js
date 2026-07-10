const btn = document.querySelector('.dropdown-btn');
const menu = document.querySelector('.dropdown-menu');

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
}

const filterBtn = document.querySelector('.filter-btn');
const filterMenu = document.querySelector('.filter-menu');

filterBtn.addEventListener('click', () => {
    filterMenu.style.display = filterMenu.style.display === 'block' ? 'none' : 'block';
});
