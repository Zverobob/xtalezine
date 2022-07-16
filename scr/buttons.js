'use strict'

const locale = {
    data:[],

    buttons: [],

    //Extracting JSON data
    getData: function() {
        fetch('scr/locale.json')
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
                locBtn.classList.add('active');
            }
            else locBtn.setAttribute("data-sel", 0);
            locBtn.setAttribute("data-lang", key);
            Section.appendChild(locBtn);
        }
    },

    updText: function(lang){
        const Section = document.querySelector('dl');
        Section.innerHTML = "";
        locale.data[lang].forEach(element => {
            const title = document.createElement('dt');
            title.textContent = element["title"];
            const text = document.createElement('dd');
            text.textContent = element["text"];
            if( lang == "Russian"){
                title.classList.add('RUS');
                text.classList.add('RUS');
            }
            Section.appendChild(title);
            Section.appendChild(text);
        });
    },

    handler: function (btn) {
        btn.preventDefault();
        const buttons = document.querySelectorAll('.lang-btn'); 
        if( btn.target.dataset.sel == 0){
            btn.target.classList.add('active');
            console.log("Switching to", btn.target.dataset.lang);
            buttons.forEach(element => {
                if (element.dataset.sel == 1){
                    element.classList.remove('active');
                    element.dataset.sel = 0;
                }
            }); 
            btn.target.dataset.sel = 1;

            const fadeOut = document.querySelectorAll('dt,dd');
            fadeOut.forEach(element => {
                element.classList.add('fadeOut');
            });
            setTimeout(function(){ locale.updText(btn.target.dataset.lang) }, 400);
        }
    },
    
    addHandlers: function(){
        this.buttons.forEach(btn => {
            btn.addEventListener('click', this.handler);
        });
    },
}


locale.getData();