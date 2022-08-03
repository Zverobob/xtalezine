'use strict'
let fileName = "";
const locale = {

    data:[],

    buttons: [],

    //Extracting JSON data
    getData: function() {
        fileName = location.pathname.split("/").slice(-1);
        fileName = 'scr/' + fileName[0].replace('html', 'json');
        fetch(fileName)
        .then(data => data.json())
        .then(json => {
            this.data = json;
            console.log(fileName);
            this.createLocaleButtons();
            this.buttons = document.querySelectorAll('.lang-btn'); 
            this.addHandlers();
            if (fileName != 'scr/artapp.json')
                this.updText("English");
            else
                this.updApplication("English");
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
        const Section = document.querySelector('dl');
        Section.innerHTML = "";
        locale.data[lang].forEach(element => {
            const title = document.createElement('dt');
            if( lang == "Russian"){
                title.classList.add('RUS');
            }
            title.textContent = element["title"];
            Section.appendChild(title);
            for (const key in element["text"]){
                const text = document.createElement('dd');  
                if( lang == "Russian"){
                    text.classList.add('RUS');
                }
                text.textContent = element["text"][key];
                Section.appendChild(text);
            }
        });
    },

    updApplication: function(lang){
        const Section = document.querySelector('.pbox');
        Section.innerHTML = "";
        locale.data[lang].forEach(element => {
            if( lang == "Russian"){
                Section.classList.add('RUS');
            }
            let skip = 0;
            const link = document.createElement('a');
            link.classList.add("a_appl");
            link.setAttribute("onclick", "document.location='guidlines.html'");
            link.innerHTML = "";
            //Stupid method. Did just 4 lulz
            for (let i = 0; i < element["text"].length; i++){
                if (element["text"][i] == '^' && skip == 0){
                    skip = 1;
                    i++;
                }
                else if (element["text"][i] == '^' && skip == 1){
                    Section.appendChild(link);
                    skip = 0;
                    i++;
                }
                if (skip == 0)
                    Section.innerHTML += element["text"][i];
                if (skip == 1)
                    link.innerHTML += element["text"][i];
            }
            const btn = document.querySelector('.entry-button');
            btn.setAttribute("onclick","location.href='"+element["link"]+"'");
            console.log(btn);
        });
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

            const fadeOut = document.querySelectorAll('dt,dd');
            fadeOut.forEach(element => {
                element.classList.add('fadeOut');
            });
            if (fileName != 'scr/artapp.json')
                setTimeout(function(){ locale.updText(btn.target.dataset.lang) }, 400);
            else
                setTimeout(function(){ locale.updApplication(btn.target.dataset.lang) }, 400);
        }
    },
    
    addHandlers: function(){
        this.buttons.forEach(btn => {
            btn.addEventListener('click', this.handler);
        });
    },
}


locale.getData();