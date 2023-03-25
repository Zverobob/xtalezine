'use strict'
let fileName = "";
const locale = {

    data:[],

    buttons: [],

    //Extracting JSON data
    getData: function() {
        fileName = "scr/buy_data.json";
        fetch(fileName)
        .then(data => data.json())
        .then(json => {
            this.data = json;
            this.createLocaleButtons();
            this.buttons = document.querySelectorAll('.lang-btn'); 
            this.addHandlers(); 
            this.updText("English");
        })
        .catch(() => console.error("WHERE'S MY LOCALES MAN?!"))
    },

    //Creating fancy buttons
    createLocaleButtons: function(){
        const Section = document.querySelector('.lang-buttons');
        for ( const key in this.data){
            const locBtn = document.createElement('button');
            locBtn.textContent = key;
            locBtn.classList.add('lang-btn');
            if(key == "English"){
                locBtn.setAttribute("data-sel", 1);
                if(fileName == "scr/guidlines.json")
                    locBtn.classList.add('red');
                else locBtn.classList.add('active');
            }
            else locBtn.setAttribute("data-sel", 0);
            locBtn.setAttribute("data-lang", key);
            Section.appendChild(locBtn);        }
    },

    updText: function(lang){
        const Section = document.querySelector(".buy-flex-cont");
        Section.innerHTML = "";
        //image
        const img_container = document.createElement('div'); 
        img_container.classList.add('buy-flex-box');
        const image = document.createElement('img'); 
        image.classList.add('products');
        if(lang != "Russian"){
            image.src = "img/merch.png";
        }
        else{
            image.src = "img/merch_cis.png";
        }
        img_container.appendChild(image);
        Section.appendChild(img_container);
        //text
        console.log(locale.data[lang][0])
        const text_container = document.createElement('div'); 
        text_container.classList.add('buy-flex-box');
        for (let i = 0; i < 4; i++){
            const text = document.createElement('p'); 
            if (lang == "Russian"){
                text.classList.add('RUS');
            }
            if (lang == "Japanese"){
                text.classList.add('JAP');
            }
            let txtdata = "text" + (i+1);
            text.textContent = locale.data[lang][0][txtdata];
            text_container.appendChild(text);
        }
        
        const preorder_btn = document.createElement('button');
        preorder_btn.classList.add('buy-btn');
        if (lang == "Russian"){
            preorder_btn.classList.add('RUS');
            preorder_btn.classList.add('RUSbtn');
        }
        if (lang == "Japanese"){
            preorder_btn.classList.add('JAP');
        }
        preorder_btn.textContent = locale.data[lang][0]["button"];
        if (lang == "Russian){
             let loc = "window.open('" + locale.data[lang][0]["link"] + '\')';
        }
        else{
            let loc = "window.location='" + locale.data[lang][0]["link"] + '\'';
        }
        preorder_btn.setAttribute ("onclick", loc);
        text_container.appendChild(preorder_btn);

        for (let i = 0; i < 2; i++){
            const text = document.createElement('p'); 
            if (lang == "Russian"){
                text.classList.add('RUS');
            }
            text.classList.add('warning');
            let txtdata = "warn" + (i+1);
            text.textContent = locale.data[lang][0][txtdata];
            text_container.appendChild(text);
        }
        Section.appendChild(text_container);
    },

    handler: function (btn) {
        btn.preventDefault();
        const buttons = document.querySelectorAll('.lang-btn'); 
        if( btn.target.dataset.sel == 0){
            btn.target.classList.add('active');
            if(fileName == "scr/guidlines.json")
                btn.target.classList.add('red');
            console.log("Switching to", btn.target.dataset.lang);
            buttons.forEach(element => {
                if (element.dataset.sel == 1){
                    element.classList.remove('active');
                    element.classList.remove('red');
                    element.dataset.sel = 0;
                }
            }); 
            btn.target.dataset.sel = 1;

            const fadeOut = document.querySelectorAll('p, .buy-btn, img');
            fadeOut.forEach(element => {
                element.classList.add('fadeOut');
            });
            setTimeout(function(){ locale.updText(btn.target.dataset.lang) }, 1200);
        }
    },

    addHandlers: function(){
        this.buttons.forEach(btn => {
            btn.addEventListener('click', this.handler);
        });
    },
}


locale.getData();
