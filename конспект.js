//------------------------------------------------------------------------------Типы данных


//-------------------------------------------------------------------------------

const box = document.getElementById('box'),  //выбор елемента с HTML документа по ID
      buttons = document.getElementsByTagName('button'), //выбор елементов с HTML документа по тегуб как результат получаем псевдо массив, для обращения к конкретному элементу массива синтаксис buttons[1]
      circles = document.getElementsByClassName('circles'), ///выбор елементов с HTML документа по названию класса. в скобках класс пишеться без точки
      hearts = document.querySelectorAll('.heart'), //выбор елементов с HTML документа по любому css селектору(.класс #айди тег  ) как результат получаем псевдомассив который имеет метод forEach
      oneHeart = document.querySelector('.heart'); //позволят получить только один элемент со страницы причем он берет первый элемент с данным классом

Element.style.width = '300px';  //добавление CSS стилей при помощи JS+ добавляет инлайн стили в HTML
buttons[1].style.backgroundColor = 'red'; //так задавать стиль конкретному элементу из массива. в этом случае второму
box.style.cssText = `width: 300px; height: 100px; font-size: ${someConst}`;//добавление сразу несколько css стилей. синтаксис как в css, можно подставлять значение переменный используя косые кавычки и конструкцию ${}

for (let i = 0; i <hearts.length;i++){//цікл которій перебирает элементы массива hearts и перекрашивает все в другой цвет.
    hearts[i].style.backgroundColor = 'red';
}

hearts.forEach(item => {// тоже самое только используя forEach
    item.style.backgroundColor = 'red';
});

const div = document.createElement('div');//создание єлемента при помощи скрипта. в данній момент он существует только в файле скрипта, пока не біл помещен в HTML документ другим методом
div.classList.add('black')// этот метод добавляет класс элементу
div.innerHTML = '<h1>hello world</h1>';//метод позволяет помещать HTML структуру
div.textContent = 'Hello';//метод добавляет только текст. не позволяя добавлять никаких тегов и структур, обычно используеться при работе с введенным текстом от пользователя чтоб он мог пердать только текст.
div.insertAdjacentElement('beforebegin', '<h2>Hello</h2>')// вставляет HTML код перед выбранным элементом(перед div снаружи). метод позволяет вставлять целые куски HTML кода
div.insertAdjacentElement('afterbegin', '<h2>Hello</h2>')// вставляет HTML код в начало выбранногго элемента. метод позволяет вставлять целые куски HTML кода
div.insertAdjacentElement('beforeend', '<h2>Hello</h2>')// вставляет HTML код в конец выбранного элемента. метод позволяет вставлять целые куски HTML кода
div.insertAdjacentElement('afterend', '<h2>Hello</h2>')// вставляет HTML код после выбранного элемента(после div снаружи). метод позволяет вставлять целые куски HTML кода
const text = document.createTextNode('some text');//создает текст редко используеться



document.body.append(div);// добавляет созданій скриптом элемент div в конец тега body
document.body.prepend(div);// добавляет созданій скриптом элемент div в начало тега body
hearts[0].before(div);//вставляет div перед первым элементом из массива hearts
hearts[0].after(div);//вставляет div после первого элемента из массива hearts
circles[1].remove();//удаляет второй элемент из масиива circles и со страницы
hearts[2].replaceWith(circles[1]);//метод заменяет третье сердце вторым кружочком 

//-------------------------------------события и их обработчики----------------------------------------------------------------------------------------------------------

const btn = document.querySelector('button');//выбираем кнопку с HTML файла

btn.onclick = function() {  // при нажатии на BTN onclick вызывает функцию(старый метод так лучше не делать)
    alert('warning');
};


btn.addEventListener('click', () =>{ // addEventListener метод который следит за событиями (click' название обытия а дальше коллбэк функция ()=>{} )
    alert('warning');
})


btn.addEventListener('mouseenter', (event) =>{ // addEventListener метод который следит за событиями (mouseenter' название события при наведении мышки а дальше коллбэк функция (event )=>{} ) event objekt sobytija kotoryj peredayut v аргумент callback function. 
    alert('warning');
    event.target.remove();// udaliajet objekt na kotoryj naveli myshku;
});


let i = 0;
const deleteElement = (event) => {
    console.log(event.target);
    i++
    if(i == 1){
        btn.deleteEventListener('click', deleteElement);// metod kotoryj udaliajet obrabotchik sobytij kogda znaczenie i = 1
    }
};

btn.addEventListener('click', deleteElement, {once: true});// varian gde v kachestve argumenta propisana function deleteElement argument {once: true} znaczit czto obrabotchik sobytij srabotaet tolko odin raz
btn.deleteEventListener('click', deleteElement);// metod kotoryj udaliajet obrabotchik sobytij


const link = document.querySelector('a');

link.addEventListener('click', (e) => { // e === event
    e.preventDefault(); //preventDefault otmeniajet standartnoe povedenie brauzera, w dannom primere otmeniajet perechod po ssylke posle klika na nee
});

btns.forEach(item => {  // sposob naznachit obrabotchik sobytij addEventListener dla vsech elementov massiva btns pri pomoschi metoda forEach
   item.addEventListener('click', (e) => {
    console.log(e.target);
   });
});



console.log(document.querySelector('.promo__title').parentElement); // vybiraet roditelskij element klassa .promo__title. w dannom sluczaje eto.promo__bg
console.log(document.querySelector('.promo__title').parentElement.parenElement); // vybiraet roditelskij element klassa .promo__title. a zatem roditelia .promo__bg w dannom sluczaje eto .promo__content
.nextElemenSibling// sled. sosed
.previousElementSibling//pred. sosed
.document.body.firstElementChild// pelwyj element w tege body
.document.body.lastElementChild/// poslednij element w tege body
.document.body.childNodes// vse uzly w tege body, wkluczaja perenosy probely i t.d

for( let node of document.body.childNodes){ // cykle kotoryj perebirajet vse uzly i wywodit tolko elementy a text nodes probely i t.d propuskaet
    if (node.nodeName == '#text'){
        continue;
    }
    console.log(node);
}

//---------------------------------------------------REKURSIJA----------------------------------------------------------------

// obycznaja function realizovannaja czerez cykl
let pow = function(x, n) { // function kotoraja vozvodit argument X v stepen N
    let result = 1;  // tech peremennaja result = 1 

    for( let i = 0; i < n; i++) {  // cycle v kotorom kol-vo iteration = arg N
        result *= x;  // w kazdoj iteration umnozajem X na 1 sootwetswenno znaczenie zapisywaetsia w peremennuju result
    }
    return result; // otdajet naruzu peremennuju result
};

console.log(pow(2, 4));

// funkcyja realizovannaja czerez rekursiju

function pow(x, n) {// vse tochno takze
    if (n === 1) { // jesli arg N (stepen) = 1 to otdajem znaczenie X(naprimer pow(2,1) 2*1 = 2)
        return x;
    } else {
        return x * pow(x, n - 1 ); //zdes znaczenie x my umnozaem na x vozwedennuju w stepen n - 1 (primer pow(2, 2) = x(2)* ( x(2) * N(2) - 1 (2 -1=1) ) )
         // funkcija zapuskajet funkcujy eto i jest rekursija
    }
}



let students = {
    js: [{
        name: 'John',
        progress: 100
    },{
        name: 'Ivan',
        progress: 60
    }],
    html:{
        basic:[{
            name: 'Peter',
            progress: 20
        },{
            name: 'Ann',
            progress: 18
        }],
        pro:[{
                name: 'Sam',
                progress: 10
        }]
    }
};
//Object.values()  metod kotoryj beret vse znaczenija iz objekta i vozvraszczaet v vide massiva v kotorom oni pereczisleny po poriadku
//Array.isArray() metod kotoryj vozwraszczaet true esli elemnt eto massiv
function getTotalProgressByIteration(data) {
    let total = 0; //poka pustaja peremennajz dla podsczeta progressa
    let students = 0; // poka pustaja peremennaja dla podszczeta koliczestva studentov

    for ( let course of Object.values(data)){  //ojavliaej course kotoraja budet imet znaczenie kotoroje nam vernet metodObject.values
        if ( Array.isArray(course)){ // uslovie esli to czto po[alo w course pri perebore objekta students massiv to..
            students += course.length; // my prisvajewajem dlinnu massiva peremennoj students(w massive 2 objecta so studentami tak czto studentow 2)

            for (i = 0; i < course.length; i++) { //dalee nado perebrat massiv i vyianut znaczenie progress i pomestit v total, delaem czerez cykl,
                total += course[i].progress; // pri kazdoj iteracii cykla peredaem znaczenie course[i].progress( gde i nomer po poriadku) v total
            }
        } else  {
            for ( let subCourse of Object.values(course)) {// tut perebor uze objekta priczem ne data a course, tak kak my ego znaczenie uze poluczili vysze
                students += subCourse.length;

                for (i = 0; i < subCourse.length; i++) { //dalee nado perebrat massiv i vyianut znaczenie progress i pomestit v total, delaem czerez cykl,
                    total += subCourse[i].progress; // pri kazdoj iteracii cykla peredaem znaczenie course[i].progress( gde i nomer po poriadku) v total
                }
            }
        }
    }

    return total / students  // function otdaet sredniy uroven progressa, dlia etogo obszczij progress delim na kol-vo studentov
}

console.log(getTotalProgressByIteration(students));

function getTotalProgressByRecursion(data) {
    if ( Array.isArray(data)) {
        let total = 0;

        for (i = 0; i < data.length; i++) { 
            total += data[i].progress; 
        }

        return [total, data.length];
    } else {
        let total = [0,0];
        
        for ( let subData of Object.values(data)){
            const subDataArr = getTotalProgressByRecursion(subData);
            total[0] += subDataArr[0];
            total[1] += subDataArr[1];
        }
        return total;
    }
}

const result = getTotalProgressByRecursion(students)

console.log(result[0]/result[1]);


function factorial(n) {
    n * factorial(n - 1);

}
console.log(factorial(5));

//-----------------------------------------------------------------------------------------------------------события в мобильных браузерах------------------------------------------------------------------------------------------------------
touchstart //событие начинаеться при касании
touchmove// когда прикасаешься и проводишь по экрану не отрывая пальца
touchend //когда казание заканчиваеться
touchenter// срабатывает когда ведешь пальцем по экрану и попадаешь на елемент на который навешенно это событие
touchcancel//возникает тогда когжа точка соприкосновения боьше не регистрируеться на поверхности екрана
//------------------------------------------------------------------------------------------------- Class list-------------------------------------------------------------------------------


const btns =  document.querySelectorAll('button');

console.log(btns[0].classList)  //косанда classList  показывает список классов которые есть у этого ДОМ дерева. внимание на синтаксис [0] без этого ничего не выйдет так как у псевдомасива нет этого метода. но у элемента в массиве есть
classList.length //показывает количество классов у тега button 
classList.item(0) //возвращает первый класс у тега button
classList.add('red','afaf') // добавляет класс ред тегу баттон
classList.remove('classname') // удаляет класс с именем classname
classList.toggle('blue')// если у елемента есть класс блю метод его убирает. а если нет метод его добавляет.

if (btns[1].classList.contains('blue')){ //метода conrtains возвращает булиновое значение  true/falce в зависимости от того есть ли у элемента такой класс

}

btns[0].addEventListener('click', () => {  // накидываем обработчик на первую кнопку. при нажатии на нее проверяем
    if (!btns[1].classList.contains('active')){ // проверяем вторую кнопку если у нее НЕТ(!..) класса ред
        btns[1].classList.add('active'); // мы его добавляем
    } else {
        btns[1].classList.remove('active'); // в противном случае сле он был мы его убираем
    }
    // вариант через .toggle
    btns[1].classList.toggle('active')// делает все тоже самое и работает по тому же принцыпу но в одну строку но иногда надо пользоваться первым случаем
});


//------------------------------------------------------ и делегирование событий---------------------------------------------------------
const wrapper =  document.querySelector('.btn-block');

wrapper.addEventListener('click', (e) => {   //навешиваем счетчик на родительский елемент в котором есть несколько кнопок чтоб делегирговать ьсобытие на кнопки которые внутри
    if (e.taget && e.target.tagName == "BUTTON"){  // e target это то за чем конкретно следит событие.  e.target.tagName == "BUTTON"(вместо tagName можно использовать .classList.contains(название класса)) это уточнение что таргет попал именно на кнопку

    } 
});

//----------------------------------------------------------------settimeOut()---------------------------------------------------------------
const timerId = setTimeout(function(){   // обьявляем перемнную timerId которая имеет значение setTimeout() это таймер который принимет в себя ту функцию которая должна будет запуститься через определенное время, она принимает в себя обьявление функции либо ее название
    console.log('Hello'); // выводит в консоль что то
},2000); // 2000 это промежуток времени через котоорый эта функция запуститься в милисекундах


const btn = document.querySelector('.button');//получам кнопку со страницы
let timerrId;
    i = 0;

btn.addEventListener('click', () =>{
    timerrId = setTimeout(logger, 2000);// после клика будет запускаться таймер
    timerrId = setInterval(logger, 2000);// после клика на кнопку каждые 2 секунды будет вызываться функция логгер. setInterval постоянно повторяет себя через заданный интервал
});


const timerrId = setTimeout(logger, 2000); //ысе тоже самое только вместо создания анонимной функции передаем название функции как аргумент для setTimeout

clearInterval(timerId);//  отменяет выполнение setTimeout

function logger(){
    if(i === 3){
        clearInterval(timerrId);
    }
    console.log('Hello');
    i++;
}

let id = setTimeout(function log (){  //пример рекурсивного тай аутаб его особенность в том что он запустит функцию внутри себя строго после интервалаб вне зависимости от того сколько времени нужно на выполнение функции
    console.log('hello');
    id = setTimeout(log, 500);
}, 500);



function myAnimation() {
    const elem = document.querySelector('.box'); // получаем елемент с которым будем аботать
    let pos = 0; // счетчик который будет меняться

    const id = setInterval(frame, 10);// интервал для функции frame с интервалом в 10мс
    function frame () { ///создаем функцию frame
       if (pos === 300){ // условие есзи значение пос 300
        clearInterval(id);// очищаем интервал
       } else {// если нет то 
         pos++;// инкремент для пос
         elem.style.top = pos + 'px';// берем стиль top у едемента '.box' и передаем ему значение пос которое после инкремента стало 1 и добавляем px. по умолчанию там было 0 
         elem.style.left = pos + 'px';//// берем стиль left у едемента '.box' и передаем ему значение пос которое после инкремента стало 1 и добавляем px. по умолчанию там было 0 
       }//каждые 10мс будет запускаться функция frame пока значение pos не будет равно 300. тогда clearInterval прервет цикл
    }
}
btn.addEventListener('click', myAnimation);// триггер который запускает при клике на кнопку функцию myAnimation

//-------------------------------------------------------------------работа с датами--------------------------------------------------------------------------------
const now = new Date(); ///new Date(); записывает в переменную now текущую дату и время

console.log(now.getFullYear());//getFullYear() метод обьекта даты который показывает отлько год
console.log(now.getMonth());//getMonth()метод обьекта даты который показывает отлько месяц
console.log(now.getDate());//getDate() показывает год месяц и день
console.log(now.getDay());// возвращает номер дня недели отсчет идет от воскресенья

console.log(now.getTimezoneOffset());// возвращает разницу между часовыми поясами( между моим и UTC0) в минутах
console.log(now.getTime());//возвращает количество милисекунд от 1970 года(отсчет времени в JS начинаеться именно с 1970 года)


// все эти методы можно использовать для установки времени, даты и т.д только надо поемнять get na set


let start = new Date();

for (let i = 0; i < 1000000; i++){
    let some = i ** 3;
}

let end = new Date();

alert(`Цикл отработал за ${end - start} миллисекунд`); // эта конструкция покажет за сколько отработал цикл. 


//--------------------------------------------------------------------------------------------параметры документа. окна и работа с ними----------------------------------------------

const box = document.querySelector('.box');

const width = box.clientWidth;// вовзращает значение ширины блока без учета 15 пикселей на скроллбар
const height = box.clientHeight;//вовзращает значение высоты блока без учета 15 пикселей на скроллбар
const width = box.offsettWidth;// вовзращает значение ширины блока c учета 15 пикселей на скроллбар
const height = box.offsetHeight;//вовзращает значение высоты блока c учета 15 пикселей на скроллбар
const height = box.scrollHeight;// возыращает всю высоту блока
const height = box.scrollTop;// показывает сколько пикселей уже прокручено 

box.getBoundingClientRect();// метод который покаывает полность все координаты

btn.addEventListener('click', () => {
    box.style.height = box.scrollHeight + 'px';  // при клике на кнопку изменяет высоту блока на полную высоту прокрутки
});

const style = window.getComputedStyle(box);// метод getComputedStyle возвращает все стили которые применились к бокс

//-------------------------------------------------mutationObserver-------------------------------------------------------
const box = document.querySelector('.box');

let observer = new MutationObserver(MutationRecords => {  // переменной назначаем метод который следжит за изменениями

});

observer.observe(box, {  // теперь обсервер следит за бокс
    childList: true
});

observer.disconnect(); // теперь обсервер перестает следить за бокс

//-------------------------------------------------------- функции конструкторы---------------------------------------------

function User(name, id){ // эта функция создает новый обьект 
    this.name = name; // благодаря  this каждому ключу в лбьекте будет передававться уникальное значение которое мы передаем в аргументе при вызове функции
    this.id = id;
    this.human = true;
}

const vovan = new User('Vovan', 28);// сдесь функция юзер создает новый обьект который мы записываем в переменную вован. ключевое это синтаксис New именно так функция будет создавать новый обьект

//-------------------------------------------------------------------------------------еонтекст вызова This---------------------------------------------------------------------------------------

//1 обычная функция this = window
function showThis(){
    console.log(this);
}
showThis()

//2 контекст у методов обькста - сам обьект
const obj = {
    a:20,
    b:15,
    sum: function(){
        console.log(this);
    }
};
obj.sum();

//3 конструкторах и классах это новый екземпляр объекта
function User(name, id){ //  
    this.name = name; //
    this.id = id;
    this.human = true;
}

const vovan = new User('Vovan', 28)ж

//4 это ручня привязка this call() apply() bind()

function sayName(){
    console.log(this);
    console.log(this.name);
}


const iser = {
    name:'John'
}

sayName.call(iser);
sayName.apply(iser);

function count(n){
    return this*n;
}

const double = count.bind(2);

const btn = document.querySelector('button');

btn.addEventListener('click', function(){ // при класическом выхове функции через function() контекст вызова this всегда будет елемент с которым происходит событие со стрелочной функцией не саботает 
    console.log(this);
    this.style.backgroundColor = 'red'; // перекрасит кнопку в красный после клика
})

// стрелочная функция всегда бере контекст у своего родителя  


//----------------------------------------------------------Классы в ES6--------------------------------------------------]

class Rectangle {
    constructor (height, width) {
        this.height = height;
        this.width = width;
    }

    calcArea() {
        return this.height * this.width;
    }
}

class ColoredRectangleWithText extends Rectangle {
    constructor(height,width,text, bgColor) {
        super();
        this.text = text;
        this.bgColor = bgColor;
    }

    showMyProps() {
        console.log(`Текст:${this.text}, цвет:${this.bgColor}`);
    }
}

const dov = new ColoredRectangleWithText(25, 10, 'Hello World', 'red');

dov.showMyProps();
console.log(dov.calcArea());



const square = new Rectangle(10,10);

console.log(square.calcArea());

//---------------------------------------------------------------------------rest оператор-----------------------------------------------------

const log = function(a,b, ...rest){
    console.log(a , b , rest);
};


//---------------------------------------------------------------------------Json формат передачи данных-------------------------------------
const persone = {
    name: 'Alex',
    tel: '+7890000000',
    parents: {
        mom: 'Ann',
        dad: 'Lui'
    }
};


const clone = JSON.parse(JSON.stringify(persone));// делает глубокую копию обьекта. коирует и клонирует все даже вложенные обьекты и копия не зависит от оригинала

console.log(JSON.parse(JSON.stringify(persone)));  // JSON имеет 2 метода stringify() форматирует обьект в формат в котором его можно отправлять на сервер. parse() форматирует в обычный обьект например если этот файл пришел с сервера

//---------------------------------------------------------------------AJAX--------------------------------------------------------------------
const inputRub = document.querySelector("#rub");
const inputUsd = document.querySelector("#usd");

inputRub.addEventListener('input', () => {
    const  request = new XMLHttpRequest();  // создаем переменную которая будет делать запрос на сервер XMLHttpRequest имеет множество методов

    request.open('GET', "js/curren.json");// метод который собирает настрой которые нужны для отправки запроса имеет такие аргументы .open(method, url, async, login , pass)
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('load', () => { // событие кторое следит за статусом запроса
        if(request.status === 200){ //(request.readyState === 4 4 это статус Done,request.status === 200 200 это http протокол 200+ это успешно учил это на тестировщика не тупи
            console.log(request.responce);  // в консоль выводит ответ от сервера
            const data = JSON.parse(request.response);
            inputUsd.value = (inputRub.value / data.current.usd).toFixed(2);
        } else {
            inputUsd.value = 'Some thing going wrong';
        }
    });

    //status  протоколы. 404 и тд
    //statusText 
    // response ответ
    //reaadyState cтатус -запроса


});

//----------------------------------------------------------------промисы-------------------------------------------------------------------------------------------------
console.log('запрос данных'); //этот код асинхронный


const req = new Promise(function(resolve, reject){
    setTimeout(() =>{
        console.log('подготовка данных');
    
        const product = {
            name: 'TV',
            price: 2000
        };
        resolve(product);
    }, 2000);
});

req.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product. status = 'ordered';
            resolve(product);
        }, 2000);
    }); 
}).then(data => {
    data.modify = true;
    return data;
}).then(data => {
    console.log(data);
}).catch(() => {
    console.log('error')
}).finally(() => {
    console.log('finnaly');
});



const test = time => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), time);
    });
};

// test(1000).then(() => console.log('1000ms'));
// test(3000).then(() => console.log('3000ms'));

Promise.all([test(1000, test(3000))]).then(() => {
    console.log('all');
});

Promise.race([test(1000, test(3000))]).then(() => {
    console.log('all');
});

fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))

//-------------------------------------------------------------------------------- методи перебора массивов-----------------------

//filter

const names = ['vova', 'ivan', 'sasha', 'stepan', 'nikolay'];

const shortNames = names.filter(function(name) {
    return name.length < 5;
});

console.log(shortNames);

// map

const answers = ['IvANN', 'AniAmn', 'hellO'];

const answerResult = answers.map(item => item.toLocaleLowerCase());


reduce() // служит чтоб складивать . умножать все элементы массива




const obg = {
    iva: 'persone',
    an:'persone',
    dog:'animal',
    cat:'animal'
};

const nwRarg = Object.entries(obg)
.filter(item => item[1] === 'persone')
.map(item => item[0]);
console.log(nwRarg);


const films = [
    {
        name: 'Titanic',
        rating: 9
    },
    {
        name: 'Die hard 5',
        rating: 5
    },
    {
        name: 'Matrix',
        rating: 8
    },
    {
        name: 'Some bad film',
        rating: 4
    }
];



function showGoodFilms(arr) {
    const gootFilms = films.filter(item => item.rating > 7);
    return console.log(gootFilms); 
}
showGoodFilms(films);

function showListOfFilms(arr) {
    const bestFilmsName = films.map(item => item.name).reduce((item, i) =>  `${item}, ${i}`);
    return console.log(bestFilmsName);
}
showListOfFilms(films);

function setFilmsIds(arr) {
 let newFilmArr = [...arr];
 newFilmArr.forEach((item, i) => item.id = i + 1);
 return console.log(newFilmArr);
}
setFilmsIds(films);

const tranformedArray = setFilmsIds(films);

function checkFilms(arr) {
    return arr.every(film => film.id || film.id === 0);
}
checkFilms(tranformedArray);

const funds = [
    {amount: -1400},
    {amount: 2400},
    {amount: -1000},
    {amount: 500},
    {amount: 10400},
    {amount: -11400}
];

const getPositiveIncomeAmount = (data) => {
    let newArra = data.filter(item => item.amount > 0);
    return console.log(newArra);
};
getPositiveIncomeAmount(funds);


const getTotalIncomeAmount = (data) => {
    if(data.some(item => item.amount < 0)){ 
        return data.map(item => item.amount).reduce((sum, curr)=> sum+curr.amount);
    } else {
       getPositiveIncomeAmount(data);
    }
    return console.log(data)
};

getTotalIncomeAmount(funds);


let qq = '500px';

console.log(parseInt(qq))

//--------------------------------------------- local storage----------------------------------------------------------
localStorage.setItem('number', 5);//записываем в локальное зранилище новый ключб первый аргумант это сам ключь. а второй его значение
localStorage.getItem('number');// получаем элемент с хранилищаб только один аргумент это название ключа
localStorage.removeItem('number');//удаляет элемент с хранилищаб один аргумент название элемента
localStorage.clear()// удаляет все элементы с хранилища



checkbox.addEventListener('change', () =>{
    localStorage.setItem('isChecked', true); //навшиваем обработчик события на чек бокс. и как только юзер отмечет чекбокс это записываеться в хранилище.
});

if(localStorage.getItem('isCheked')){ // теперь когда пользователь заходит на страницу скриптпроверяет хранилище на налищее элемента чекбокс. если получаем правду то брузер автоматически сам устанавливает флажок в чекбоксе и юзер не должен будет делать это снова
    checkbox.checked = true;
}

if (localStorage.getItem(bg) === 'changed') { //теперь при каждом входе на страницу скрипт проверяет хранилище на элм bg. и если он там есть то страница будет перекрашенна сама. бракзер это запомнит 
    localStorage.removeItem(bg);              /// удаляем его из хранилища 
    form.style.backgroundColor = 'white'; 
}
ChannelMergerNode.addEventListener('click', () => { // кнопка отвечает за изменение фона например страницы
    if (localStorage.getItem(bg) === 'changed') { // если в хранилище уже есть элем bg и его значение changed
        localStorage.removeItem(bg);              /// удаляем его из хранилища 
        form.style.backgroundColor = 'white';   // и добавляем в стили цвет фона белый
    } else {                                    // если в хранилище нет элемента bg
        localStorage.setItem('bg', 'changed') // создаем такой элемент в храниище. и его значение  ставим changed
        form.style.backgroundColor = 'red'; // после этого в стили добавляем другой цыет фона
    }
});


// в локально хранилище можно добавлять обьекты и массивы, но сначала их нужно конвертировать в JSON иначе хранилище просто не примет этот формат и запишет просто строку 'обьект'. сообтвественно чтоб получить обьект с хранилища надо его распарсить с JSONа в обычный обьект
const persone = {
    namr: 'Joe',
    age: 105,
    phone: '576776990'
};

const serializedPersone = JSON.stringify(persone);
localStorage.setItem('alex', serializedPersone);

//-------------------------------------------------------------------- регулярные выражения--------------------------------------

new RegExp('pattern', 'flags'); // полный синтаксис создания регулярных выражений. редко используемый

/pattern/flags; // короткий синтаксис
// классические флаги
i// sвне зависимости от регистра
g // глобально
m // многострочный режим



const ans = prompt('введите ваше имя');
const reg = /n/;
console.log(ans.search(reg));
console.log(ans.match(reg));


const pass = prompt('entert your password');

pass.replace(/./g, '*');  // сдесь заменяем все символы в введнном промпте на звездочки при помощи регулярных выражений

// классы в регулярных выражениях
// \d ищем цифры
// \w буквы
// \s  пробелы

// \D ищем нецифры
// \W  небуквы