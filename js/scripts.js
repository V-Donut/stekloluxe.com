// Sticky header
var currentScroll = window.pageYOffset;
var header = document.querySelector('.site-header');
var headerHeight = header ? header.clientHeight : 0;
var headerFixed = document.querySelector('.header__bottom');
var stickyPanel = document.querySelector('.sticky-panel');

function stickyHeader() {
    currentScroll = window.pageYOffset;

    if (currentScroll > headerHeight) {
        headerFixed.classList.add('nav-down');

        stickyPanel.classList.remove('bottom-panel--static');
        stickyPanel.classList.add('bottom-panel--fixed');
        stickyPanel.classList.add('compensate-for-scrollbar');
        stickyPanel.classList.add('active');
    } else {
        headerFixed.classList.remove('nav-down');

        stickyPanel.classList.remove('bottom-panel--fixed');
        stickyPanel.classList.remove('compensate-for-scrollbar');
        stickyPanel.classList.remove('active');
        stickyPanel.classList.add('bottom-panel--static');
    }
}

stickyHeader();

window.onscroll = function() {
    stickyHeader();
};

window.addEventListener('resize', function() {
    stickyHeader();
});

// Hamburger
var hamburger = document.querySelector('.navigation-toggler');
var nav = document.querySelector('.nav');
hamburger.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        nav.setAttribute('style', 'display: none;');
    } else {
        hamburger.classList.add('active');
        for (var i = 0; i < 60; i++) {
            nav.setAttribute('style', 'display: block; overflow: hidden; height: ' + i + 'px; padding-top: 0; padding-bottom: 0; margin-top: 0; margin-bottom: 0');
        }
        nav.setAttribute('style', 'display: block;');
    }
});

// Smooth navigation
var scrollLinks = document.querySelectorAll('.scroll-link');
for (var i = 0; i < scrollLinks.length; i++) {
    var scrollLink = scrollLinks[i];

    scrollLink.addEventListener('click', function (evt) {
        evt.preventDefault();

        var dataHref = this.getAttribute('data-href');
        var attrHref = this.getAttribute('href');
        var link = dataHref || attrHref;
        var linkElem = document.querySelector(link);
        var offset = linkElem.getBoundingClientRect().top + pageYOffset - 71;

        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.setAttribute('style', 'display: none;');
        }

        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    });
}

// Modal window
function closeModal() {
    var modalWindow = document.getElementById('modal-window');
    if (modalWindow) {
        modalWindow.parentNode.removeChild(modalWindow);
    }
    var body = document.body;
    body.classList.remove('has-modal');
}

function showModal(baseClass, title, message, onCloseCallback) {
    onCloseCallback = onCloseCallback ? onCloseCallback : 'closeModal()';
    title = title ? title : false;

    var modal = '';
    modal += '<div class="modal" id="modal-window">';
    modal += '<div class="modal__wrapper">';
    modal += '<div class="modal__overlay" onclick="' + onCloseCallback + ';"></div>';
    modal += '<div class="modal__box ' + baseClass + '">';
    if (title) {
        modal += '<div class="modal__header"><h2 class="modal__title">' + title + '</h2></div>';
    }
    modal += '<div class="modal__body">' + message + '</div>';
    modal += '<button class="modal__close" onclick="' + onCloseCallback + ';" title="Закрыть"></button>';
    modal += '</div>';
    modal += '</div>';
    modal += '</div>';

    var body = document.body;
    body.classList.add('has-modal');

    var elem = document.createElement('div');
    elem.innerHTML = modal;
    document.body.appendChild(elem);

    return false;
}

// Services modal
var modalLinks = document.querySelectorAll('.modal-link');
var serviceList = JSON.parse(document.getElementById('service-list').innerText || '{}');
for (var i = 0; i < modalLinks.length; i++) {
    var modalLink = modalLinks[i];

    modalLink.addEventListener('click', function (evt) {
        evt.preventDefault();

        var postId = Number(this.getAttribute('data-post-id'));

        var selectedService = {};
        for (var key in serviceList) {
            if (serviceList[key].post_id == postId) {
                selectedService = serviceList[key];
            }
        }

        showModal('service-modal', selectedService.title, selectedService.content);
    });
}

// Manager modal
var managerLinks = document.querySelectorAll('.manager-link');
for (var i = 0; i < managerLinks.length; i++) {
    var managerLink = managerLinks[i];

    managerLink.addEventListener('click', function (evt) {
        evt.preventDefault();

        var htmlBlock = '';
        htmlBlock += '<p>Оставьте заявку и наш менеджер поможет Вам с выбором, расскажет все детали и нюансы</p>';
        htmlBlock += '<form id="manager-form" name="manager" method="post">';
        htmlBlock += '<input name="name" type="text" class="client-name" value="" placeholder="Как Вас зовут?">';
        htmlBlock += '<input name="phone" type="tel" class="client-phone" value="" placeholder="Телефон">';
        htmlBlock += '<textarea name="comment" class="client-comment" placeholder="Комментарий"></textarea>';
        htmlBlock += '<p class="agreement">Нажимая на кнопку, я принимаю <a href="#" target="_blank">условия соглашения</a>.</p>';
        htmlBlock += '<p id="form-error" class="form-error form-error--hidden">Нужно заполнить обязательные поля!</p>';
        htmlBlock += '<button type="button" class="form-submit" onclick="sendRequest(\'manager\');">Получить консультацию</button>';
        htmlBlock += '</form>';

        showModal('request-modal', 'Бесплатная консультация', htmlBlock);
    });
}

// Measurer modal
var measurerLinks = document.querySelectorAll('.measurer-link');
for (var i = 0; i < measurerLinks.length; i++) {
    var measurerLink = measurerLinks[i];

    measurerLink.addEventListener('click', function (evt) {
        evt.preventDefault();

        var htmlBlock = '';
        htmlBlock += '<p>Оставьте заявку и наш менеджер согласует с Вами дату и время замера</p>';
        htmlBlock += '<form id="measurer-form" name="manager" method="post">';
        htmlBlock += '<input name="name" type="text" class="client-name" value="" placeholder="Ваше имя">';
        htmlBlock += '<input name="phone" type="tel" class="client-phone" value="" placeholder="Телефон">';
        htmlBlock += '<textarea name="comment" class="client-comment" placeholder="Комментарий"></textarea>';
        htmlBlock += '<p class="agreement">Нажимая на кнопку, я принимаю <a href="#" target="_blank">условия соглашения</a>.</p>';
        htmlBlock += '<p id="form-error" class="form-error form-error--hidden">Нужно заполнить обязательные поля!</p>';
        htmlBlock += '<button type="button" class="form-submit" onclick="sendRequest(\'measurer\');">Оставить заявку</button>';
        htmlBlock += '</form>';

        showModal('request-modal', 'Вызов замерщика', htmlBlock);
    });
}

// Order modal
var orderLink = document.querySelector('.order-link');
orderLink.addEventListener('click', function (evt) {
    evt.preventDefault();

    var orderName = document.getElementById('shower-name').innerHTML.trim();
    var orderPrice = document.getElementById('shower-price').innerHTML.trim();

    var htmlBlock = '';
    htmlBlock += '<p>Оставьте заявку и наш менеджер свяжется с Вами для подтверждения заказа</p>';
    htmlBlock += '<form id="order-form" name="manager" method="post">';
    htmlBlock += '<input name="order" type="text" class="client-name client-order" value="' + orderName + ' за ' + orderPrice + ' руб.' + '" disabled>';
    htmlBlock += '<input name="name" type="text" class="client-name" value="" placeholder="Ваше имя">';
    htmlBlock += '<input name="phone" type="tel" class="client-phone" value="" placeholder="Телефон">';
    htmlBlock += '<textarea name="comment" class="client-comment" placeholder="Комментарий"></textarea>';
    htmlBlock += '<p class="agreement">Нажимая на кнопку, я принимаю <a href="#" target="_blank">условия соглашения</a>.</p>';
    htmlBlock += '<p id="form-error" class="form-error form-error--hidden">Нужно заполнить обязательные поля!</p>';
    htmlBlock += '<button type="button" class="form-submit" onclick="sendRequest(\'order\');">Оставить заявку</button>';
    htmlBlock += '</form>';

    showModal('request-modal', 'Заказ под ключ', htmlBlock);
});

// Partners modal
var partnersLinks = document.querySelectorAll('.partners-link');
for (var i = 0; i < partnersLinks.length; i++) {
    var partnersLink = partnersLinks[i];

    partnersLink.addEventListener('click', function (evt) {
        evt.preventDefault();

        var htmlBlock = '';
        htmlBlock += '<p>Оставьте заявку и наш менеджер свяжется с Вами, чтобы обсудить детали</p>';
        htmlBlock += '<form id="partners-form" name="manager" method="post">';
        htmlBlock += '<input name="name" type="text" class="client-name" value="" placeholder="Ваше имя">';
        htmlBlock += '<input name="phone" type="tel" class="client-phone" value="" placeholder="Телефон">';
        htmlBlock += '<textarea name="comment" class="client-comment" placeholder="Комментарий"></textarea>';
        htmlBlock += '<p class="agreement">Нажимая на кнопку, я принимаю <a href="#" target="_blank">условия соглашения</a>.</p>';
        htmlBlock += '<p id="form-error" class="form-error form-error--hidden">Нужно заполнить обязательные поля!</p>';
        htmlBlock += '<button type="button" class="form-submit" onclick="sendRequest(\'partners\');">Оставить заявку</button>';
        htmlBlock += '</form>';

        showModal('request-modal', 'Стать партнером компании', htmlBlock);
    });
}

// Send request
function sendRequest(type) {
    var form = document.getElementById(type + '-form');
    if (form) {
        var formError = document.getElementById('form-error');

        var nameElem = form.elements.name;
        var phoneElem = form.elements.phone;
        var commentElem = form.elements.comment;
        if (!nameElem || !phoneElem || !commentElem) {
            return false;
        }

        var name = nameElem.value.trim();
        var phone = phoneElem.value.trim();
        var comment = commentElem.value.trim();

        if (name && phone && !formError.classList.contains('form-error--hidden')) {
            formError.classList.add('form-error--hidden');
        }
        if (!name) {
            nameElem.classList.add('field-error');
        } else {
            nameElem.classList.remove('field-error');
        }
        if (!phone) {
            phoneElem.classList.add('field-error');
        } else {
            phoneElem.classList.remove('field-error');
        }

        if (!name || !phone) {
            formError.classList.remove('form-error--hidden');
            return false;
        }

        var formData = new FormData();

        if (type === 'order') {
            var orderElem = form.elements.order;
            var order = orderElem.value.trim();
            formData.append('order', order);
        }

        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('comment', comment);
        formData.append('type', type);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/ajax/sendRequest.php');
        xhr.send(formData);

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                closeModal();

                var response = JSON.parse(this.responseText);
                if (response.success) {
                    showModal('request-modal', 'Спасибо!', 'Ваша заявка успешно отправлена!');
                } else {
                    showModal('request-modal', 'Что-то пошло не так...', 'При отправке произошла ошибка. Попробуйте написать нам позднее.');
                }
            }
        };
    }

    return false;
}

// Init gallery
var galleryParams = {
    selector: '.gallery__link',
    thumbnail: true,
    hash: false,
    download: false,
    closable: false
};
lightGallery(document.getElementById('lightgallery'), galleryParams);

// Change gallery
var galleryArea = document.getElementById('lightgallery');
var galleryLinks = document.querySelectorAll('.js-filter-gallery');
var galleryList = JSON.parse(document.getElementById('gallery-list').innerText || '{}');

for (var i = 0; i < galleryLinks.length; i++) {
    var galleryLink = galleryLinks[i];

    galleryLink.addEventListener('click', function (evt) {
        evt.preventDefault();

        var gallery = this.getAttribute('data-filter');
        var currentGallery = this;

        var photos = galleryList[0][gallery];
        if (photos) {
            var activeGallery = document.querySelector('.js-filter-gallery.active');
            activeGallery.classList.remove('active');
            currentGallery.classList.add('active');

            var galleryHtml = '';
            for (var i = 0; i < photos.length; i++) {
                var photo = photos[i];
                galleryHtml += '<div class="mix ' + photo.photo_id + ' gallery__item">';
                galleryHtml += '<div class="gallery__item-wrapper">';
                galleryHtml += '<a class="gallery__link septa-category" data-title="' + photo.title + '" data-src="' + photo.path + '" data-sub-html="#photo-desc' + photo.photo_id + '">';
                galleryHtml += '<img class="gallery__img" src="' + photo.path + '" alt="' + photo.title + '">';
                galleryHtml += '</a>';
                galleryHtml += '<div id="photo-desc' + photo.photo_id + '" class="gallery__item-short-name">' + photo.title + '</div>';
                galleryHtml += '</div>';
                galleryHtml += '</div>';
            }

            galleryArea.innerHTML = '';
            galleryArea.innerHTML = galleryHtml;

            var lightgallery = document.getElementById('lightgallery');
            window.lgData[lightgallery.getAttribute('lg-uid')].destroy(true);
            lightGallery(lightgallery, galleryParams);

            var offset = document.getElementById('our-works').getBoundingClientRect().top - 45;
            if (offset < 1) {
                offset = currentScroll;
            }

            window.scrollTo({
                top: offset
            });
        };
    }, false);
}

// Change product
var productLinks = document.querySelectorAll('.js-show-product');
var products = JSON.parse(document.getElementById('products').innerText || '{}');
for (var i = 0; i < productLinks.length; i++) {
    var productLink = productLinks[i];

    productLink.addEventListener('click', function (evt) {
        evt.preventDefault();

        var productId = Number(this.getAttribute('data-product-id'));

        var activeProduct = document.querySelector('.js-show-product.active');
        if (activeProduct.classList.contains('active')) {
            activeProduct.classList.remove('active');
        }

        var bullets = document.querySelectorAll('[data-product-id="' + productId + '"]');
        for (var j = 0; j < bullets.length; j++) {
            var bullet = bullets[j];
            if (bullet.classList.contains('visible')) {
                bullet.classList.add('active');
            }
        }

        var selectedProduct = {};
        for (var key in products) {
            if (products[key].product_id == productId) {
                selectedProduct = products[key];
            }
        }

        var showerName = document.getElementById('shower-name');
        var showerPrice = document.getElementById('shower-price');
        var showerDesc = document.getElementById('shower-desc');
        var showerShortDesc = document.getElementById('shower-short-desc');
        var showerImage = document.getElementById('shower-image');

        showerName.innerHTML = selectedProduct.title;
        showerPrice.innerHTML = selectedProduct.price;
        showerDesc.innerHTML = selectedProduct.description;
        showerShortDesc.innerHTML = selectedProduct.short_desc;
        showerImage.setAttribute('src', selectedProduct.image);

        var productPrev = document.getElementById('product-prev');
        var productNext = document.getElementById('product-next');

        productPrev.setAttribute('data-product-id', selectedProduct.prev);
        productNext.setAttribute('data-product-id', selectedProduct.next);
    }, false);
}

// Types of glass
var glassLinks = document.querySelectorAll('.js-glass-link');
for (var i = 0; i < glassLinks.length; i++) {
    var glassLink = glassLinks[i];

    glassLink.addEventListener('click', function (evt) {
        evt.preventDefault();

        var mirrorsParams = {
            selector: '.glass__link',
            thumbnail: true,
            hash: false,
            download: false,
            closable: false
        };
        lightGallery(document.getElementById('glass-gallery'), mirrorsParams);

        var glassLinks = document.querySelectorAll('.glass__link');
        if (glassLinks.length) {
            glassLinks[0].click();
        }
    });
}

// Types of mirrors
var mirrorsLinks = document.querySelectorAll('.js-mirrors-link');
for (var i = 0; i < mirrorsLinks.length; i++) {
    var mirrorsLink = mirrorsLinks[i];

    mirrorsLink.addEventListener('click', function (evt) {
        evt.preventDefault();

        var mirrorsParams = {
            selector: '.mirror__link',
            thumbnail: true,
            hash: false,
            download: false,
            closable: false
        };
        lightGallery(document.getElementById('mirrors-gallery'), mirrorsParams);

        var mirrorLinks = document.querySelectorAll('.mirror__link');
        if (mirrorLinks.length) {
            mirrorLinks[0].click();
        }
    });
}
