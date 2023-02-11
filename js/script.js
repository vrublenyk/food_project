window.addEventListener('DOMContentLoaded', () => {
   
   // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
         tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();
    
    tabsParent.addEventListener('click', (e) =>{
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item ){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    // Timer
    const deadline = '2023-02-10';  // создаем переменную в которой указываем дату до какого числа будет работать щетчик

    function getTimeRemaining(endtime){
        let days, hours, minutes, seconds; 
        const t = Date.parse(endtime) - Date.parse(new Date()); // получаем разницу в миллисекундах между датой переданной через аргумент и текущей датой

        if (t <= 0 ) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //сдесь делим полученное кол-во миллисекунд в переменной Т на (1000(колво миллисекунд в сек)*(60это колво секунд в минуте)*(60ь колво минут в часу)*24(колво часов в дне)) как результат получаем количество дней от текущей даты до дедлайна
            hours = Math.floor((t /(1000 * 60 * 60) % 24)), // тут мы получаем остаток деления количества часов на 24 и записываем в часы
            minutes = Math.floor((t / (1000 / 60) % 60)),
            seconds = Math.floor((t / 1000)% 60);
        }
 
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes':minutes,
            'seconds':seconds
        };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {     
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal Window
    
    const modalWindow = document.querySelector('.modal'),
          openModal = document.querySelectorAll("[data-modal]");
          


    openModal.forEach((btn) => {
        btn.addEventListener('click', openModalWindow)
    });

    function openModalWindow(){
        modalWindow.classList.add('show', 'fade');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
    function closeModalWindow(){
        modalWindow.classList.remove('show', 'fade');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';
    }

    modalWindow.addEventListener('click', (e) => {
        if(e.target === modalWindow ||e.target.getAttribute('data-close') == ''){
            closeModalWindow();
        } 
    });

    document.addEventListener('keydown', (e) => {
        if( e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModalWindow();
        }
    });

    const modalTimerId = setTimeout(openModalWindow, 15000);

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // используем классы для карточек

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = +this.price * this.transfer;
        }
        
        render() {
            const element = document.createElement('div');

            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    const getResources = async (url) => {
        const res = await fetch(url);
        
        if(!res.ok) {
           throw new Error(`Cold not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    // getResources('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) =>{
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) =>{
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // getResources('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // function createCard(data){
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const elem = document.createElement('div');
    //         price = price* 27;

    //         elem.classList.add('menu__item');
    //         elem.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>
    //         `;

    //         document.querySelector('.menu .container').append(elem)
    //     });
    // }

    // forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Спасибо! скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item =>{
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);
            

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data); 
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() =>{
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModalWindow();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
            <div data-close class="modal__close">x</div>
            <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModalWindow();
        }, 5000);
    }

    // slider
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    currentCouner();


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; 
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == deleteNoDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNoDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentCouner();

        dotsOpacity();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset =deleteNoDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNoDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentCouner();

        dotsOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNoDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            currentCouner();

            dotsOpacity();
        });
    });

    function currentCouner(){
        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
        return current.textContent;
    }

    function dotsOpacity(){
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
        return dots;
    }

    function deleteNoDigits(str){
        return  +str.replace(/\D/g, '');
    }
    



});