'use strict'
let fileName = "";
const artists = {

    data:[],

    //Extracting JSON data
    getData: function() {
        fileName = location.pathname.split("/").slice(-1);
        fileName = 'scr/' + fileName[0].replace('html', 'json');
        fetch(fileName)
        .then(data => data.json())
        .then(json => {
            this.data = json;
            artists.addPep();
        })
    },

    addPep: function() { 
        const Section = document.querySelectorAll('.section-artists')[1];
        Section.innerHTML = "";
        
        //add title
        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = "Meet our Artists!";
        Section.appendChild(title);
        
        //adding people
        this.data["artists"].forEach(element => {
            //creating subcetion
            const subsection = document.createElement('section');
            subsection.classList.add('artistSect');
            //create image
            const image = document.createElement('img');
            image.setAttribute("src",element["img"]);
            image.setAttribute("alt",element["name"]);
            subsection.appendChild(image);
            //create description
            const desc = document.createElement('div');
            desc.classList.add('contacts');
            const name = document.createElement('p');
            name.classList.add("contacts-name");
            name.textContent = element["name"];
            desc.appendChild(name);
            const quote = document.createElement('p');
            quote.textContent = element["description"];
            desc.appendChild(quote);
            
            const social = document.createElement('p');
            element.social.forEach(element => {
                if(element["link"] != ""){
                    social.innerHTML += "<a href=" + element["link"] + ">" + element["name"] +"</a> ";
                }
                console.log(element["name"]);
            });
            desc.appendChild(social);

            subsection.appendChild(desc);
            //Combine
            Section.appendChild(subsection);
            
        });
    },
}


artists.getData();