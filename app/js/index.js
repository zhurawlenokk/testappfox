const accordeonItems = document.querySelectorAll('.accordeon_item');

function closeAllAccs() {
    accordeonItems.forEach(item => {
        item.classList.remove('accordeon_item--active');
    });
}

accordeonItems.forEach(item => {
    item.addEventListener('click', function () {
        if (item.classList.contains('accordeon_item--active')) {
            item.classList.remove('accordeon_item--active');
        } else {
            closeAllAccs();
            item.classList.add('accordeon_item--active');
        }
    });
});

const closeButtons = document.querySelectorAll('.accordeon_arrow');
closeButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        e.stopPropagation();
        const activeAcc = button.closest('.accordeon_item');
        if (activeAcc.classList.contains('accordeon_item--active')) {
            activeAcc.classList.remove('accordeon_item--active');
        } else {
            closeAllAccs();
            activeAcc.classList.add('accordeon_item--active');
        }
    });
});

const scrollToFooter = function scrollToFooter() {
    const footer = document.querySelector('.footer')
    footer.scrollIntoView({
        behavior: "smooth"
    });
};

const scrollButton = document.querySelector('.scroll_button');

scrollButton.addEventListener('click', function (e) {
    e.preventDefault;
    scrollToFooter();
})



new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    autoHeight: true,
    pagination: {
        el: '.reviews_slider_pagination',
        clickable: true,
    },
});