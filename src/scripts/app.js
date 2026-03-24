//  en gros : le morceau ici sert à attribuer la classe show pour que le block actor s'affiche quand on tape sur acteur dans la nav 
//  suffit de copier coller ce morceau 2 fois et de mofifier les valeurs pour avoir ça avec genre et année aussi


// --------------------- menu -----------------------------------

// acteur
const navActor = document.querySelector(".selector__actor");
const sectionActor = document.querySelector(".actor");

function actor() {
    sectionActor.classList.toggle("block--show");
    navActor.classList.toggle("selector__actor--active")
}

navActor.addEventListener("click", actor);

// genre
const navGenre = document.querySelector(".selector__genre");
const sectionGenre = document.querySelector(".genre");

function genre() {
    sectionGenre.classList.toggle("block--show");
    navGenre.classList.toggle("selector__genre--active")
}

navGenre.addEventListener("click", genre);

// year
const navYear = document.querySelector(".selector__year");
const sectionYear = document.querySelector(".year");

function year() {
    sectionYear.classList.toggle("block--show");
    navYear.classList.toggle("selector__year--active")
}

navYear.addEventListener("click", year);




// --------------------- calcul data pour la partie acteur -----------------------------------

// --------- 1 : recup les données json 

let allActors = [];
//  la j'ai fait un tableau pour mettre tous les noms des acteurs qui auront été recup avec le json dcp

let allFilms = [];


fetch ('assets/data.json')
//  la dcp on charge le fichier json 
.then(function(response){
    return response.json();
})
.then(function(json){

    allFilms = json;

    json.forEach(function(film){
        film.acteur.forEach(function(myActor){
            if (myActor.nom && !allActors.includes(myActor.nom)){

            
                // le ! c'est pour dire l'inverse, donc if not includes le nom => alors on push le nom de l'acteur
                allActors.push(myActor.nom);

            }
        })
    })

});


// la barre de recherche a proprement parler :
// 1- On sélectionne ta barre de recherche (l'élément <input>) en JavaScript.
// 2- On lui dit : "Dès que l'utilisateur appuie sur une touche (input), lance une fonction".
// 3- Dans cette fonction, on regarde ce qui est écrit et on filtre notre liste d'acteur

// je recupere la liste html 
const sugList = document.getElementById('suggestions');
// je cherche mon input via l'id 
const search = document.getElementById('search-actor');

search.addEventListener('input', function(){

    // je recup ce que l'utilisateur ecrit
    let userSearch = search.value.toLowerCase();

    // ça c'est pr nettoyer la liste 
    sugList.innerHTML = "";

    // filtrer la liste pr garder que les acteurs qui ont les mêmes lettres 
    let suggestions = allActors.filter(function(nom) {
        return nom.toLowerCase().includes(userSearch);
    });

    if (userSearch.length > 2) {
        console.log(suggestions);

        suggestions.forEach(function(proposition){
            let laProposition = document.createElement('li')
            laProposition.textContent = proposition
            laProposition.addEventListener('click', function(autoSearch){
                search.value = proposition ;
            })

            sugList.appendChild(laProposition);
            // en gros ça me crée un li a chaque fois que j'ai UNE proposition dans ma liste de suggestions
            // suggestions -> c'est un paqut de carte trié en petit paquet 
            // ma fonction propistion et donc le tableau laProposition -> une carte par li dans le paquet déjà trié
        })
    
    }
})




// --------------------------- PARTIE AFFICHAGE


// click sur valider -> filtre les données pour que le js reprenne tous les films ou les acteurs sont là 


const btnValider = document.querySelector('.btn__valider')

btnValider.addEventListener('click', function() {

    nomChoisi = search.value ;

    let filmsActeur = allFilms.filter(function(film){
        return film.acteur.some(function(acteur){
            // some = en gros au moins 1 des acteurs correspond a l'acteur choisi 

            return acteur.nom === nomChoisi
        });
    });

    //  la le but ça va etre de compté les données années et genre 

    statsAnnees = {};
    statsGenres = {};

    filmsActeur.forEach(function(donnees){

        // ----------- la c'est la part 1 les années 

        let annee = donnees.date;

        if(statsAnnees[annee]){
            statsAnnees[annee] = statsAnnees[annee] + 1;
        }else{
            statsAnnees[annee] = 1;
        };

        

        // ------------ part 2 les genres

        donnees.genre.forEach(function(unGenre){

            if(statsGenres[unGenre]){
                statsGenres[unGenre] = statsGenres[unGenre] + 1;
            }else{
                statsGenres[unGenre] = 1;
            }

        });
        
    });

    // --------------- part 3 : transfo des deux stats en tableau pr faciliter l'affichage apres

    let tableauAnnees = Object.entries(statsAnnees);
    let tableauGenres = Object.entries(statsGenres);

    let topDates = tableauAnnees.slice(0, 4);
    let topGenres = tableauGenres.slice(0, 4);

    const infoGenres = document.querySelector('#section-acteur .result-block--opposite .result-block__list');
    infoGenres.innerHTML = "";

    const infoDates = document.querySelector('#section-acteur .result-block--line .result-block__list');
    infoDates.innerHTML = "";

    let maxScoreGenre = topGenres[0][1];
    let maxScoreDate = topDates[0][1];

    infoGenres.innerHTML = "";
    topGenres.forEach(function(unGenre){
        const pourcentage = (unGenre[1] / maxScoreGenre * 100);
        infoGenres.innerHTML += `
            <div class="result-block__item stat-item" style="--progress: ${pourcentage}%">
                <span class="stat-name">${unGenre[0]}</span>
                <span class="stat-count">${unGenre[1]}</span>
            </div>
        `;

    });

    infoDates.innerHTML = "";
    topDates.forEach(function(uneDate) {
        const pourcentage = (uneDate[1] / maxScoreDate * 100);
        infoDates.innerHTML += `
            <div class="result-block__item stat-item" style="--progress: ${pourcentage}%">
                <span class="stat-name">${uneDate[0]}</span>
                <span class="stat-count">${uneDate[1]}</span>
            </div>
        `;
    });

});


// --------------------- calcul data pour la partie annee -----------------------------------

const listeDesAnnees = document.querySelector('.year__list');
const tableauYear = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

tableauYear.forEach(function(ligneDuTemps){

    const yearItem = document.createElement('li');
    yearItem.classList.add("year__item");
    yearItem.textContent = ligneDuTemps;

    yearItem.addEventListener('click', function() {

        this.classList.toggle("year__item--active");

    });

    listeDesAnnees.appendChild(yearItem);

});

const btnValiderAnnee = document.querySelector('.year .btn__valider--year');


btnValiderAnnee.addEventListener('click', function(){

    const choixUserYear = document.querySelectorAll('.year__item--active');
    
    let listeChoix = [];

    choixUserYear.forEach(function(item) {
        listeChoix.push(item.textContent);
    });

    const filmsTrouves = allFilms.filter(function(unFilm) {
        let yearInText = unFilm.date.toString();

        return listeChoix.includes(yearInText);

    });

    console.log(filmsTrouves);

    let yearSearchActor = [];
    let yearSearchGenre = [];


    filmsTrouves.forEach(function(donneesYear){

        donneesYear.acteur.forEach(function(nomActeur) {
            yearSearchActor.push(nomActeur);
        });

        donneesYear.genre.forEach(function(nomGenre) {
            yearSearchGenre.push(nomGenre);
        });


    });

    // là c exactement pareil que dans la boucle au dessus 

    let statsActeur = {};

    yearSearchActor.forEach(function(acteurJson) {

        let nom = acteurJson.nom; 

        if (statsActeur[nom]) {
            // ça c si l'acteur est deja dans la liste bah on rajoute + 1 au nbr de fois ou il apparait
            statsActeur[nom].score++;
        } else {
            // si l'acteur est nv on garde toutes les infos
            statsActeur[nom] = {
                nom: nom,
                image: acteurJson.image,
                score: 1
            };
        }
    });

    let statsGenre = {};

    yearSearchGenre.forEach(function(genre) {
        if (statsGenre[genre]) {
            statsGenre[genre] += 1; 
        } else {
            statsGenre[genre] = 1; 
        }
    });

    console.log(statsGenre, statsActeur)

    let tableauActeurs = Object.values(statsActeur); 

    tableauActeurs.sort(function(a, b) {
        return b.score - a.score;
    });

    let topActeurs = tableauActeurs.slice(0, 4);

    const containerActeurs = document.querySelector('.boite__acteur'); 
    containerActeurs.innerHTML = "";

    topActeurs.forEach(function(acteur) {
        console.log("Objet acteur complet :", acteur); 
        
        containerActeurs.innerHTML += `
            <div class="result-block__item">
                <img src="${acteur.image}" alt="${acteur.nom}">
            </div>
        `;

    });

    let topGenres = Object.entries(statsGenre);

    topGenres.sort(function(a, b) {
        return b[1] - a[1];
    });

    const maxScoreGenre = topGenres[0][1];

    const infoGenres = document.querySelector('.boite__genre');
    infoGenres.innerHTML = "";

    topGenres.slice(0, 4).forEach(function(unGenre) {
        const pourcentage = (unGenre[1] / maxScoreGenre * 100);
        
        infoGenres.innerHTML += `
            <div class="result-block__item stat-item" style="--progress: ${pourcentage}%">
                <span class="stat-name">${unGenre[0]}</span>
                <span class="stat-count">${unGenre[1]}</span>
            </div>
        `;
    });

});

// Partie de Dylan //

//ici ce sont mes boutons mais il y a que le "genre" qui marche et c'est normal //

const filterDisplay = document.querySelector("#filter-display");

let dataFilms = [];

fetch("assets/data.json")
    .then(response => response.json())
    .then(data => {
        dataFilms = data;
        console.log("Données chargées :", dataFilms);
    })
    .catch(error => console.error('Erreur au chargement du JSON:', error));

const diagramContainer = document.querySelector("#diagram-container");
const mainSelectGenre = document.querySelector(".select__list");

function afficherDiagramme(filmsFiltres) {
    const template = document.querySelector("#bar-template");

    if (!diagramContainer || !template) return;

    diagramContainer.innerHTML = ""; 

    const anneeDebut = 2000;
    const anneeFin = 2025;

    const comptageParAnnee = {};
    filmsFiltres.forEach(film => {
        comptageParAnnee[film.date] = (comptageParAnnee[film.date] || 0) + 1;
    });
    
    const scores = Object.values(comptageParAnnee);
    const maxFilms = scores.length > 0 ? Math.max(...scores) : 1;

    for (let annee = anneeDebut; annee <= anneeFin; annee++) {
        const nbFilms = comptageParAnnee[annee] || 0;
        const pourcentage = (nbFilms / maxFilms) * 100;

        const clone = template.content.cloneNode(true);
        clone.querySelector(".bar-year").textContent = annee;
        
        const barFill = clone.querySelector(".bar-fill");
        barFill.style.width = pourcentage + "%"; 

        const countSpan = clone.querySelector(".bar-count");
        if (nbFilms > 0) {
            countSpan.textContent = nbFilms;
        } else {
            countSpan.remove(); 
        }

        diagramContainer.appendChild(clone);
    }
}

if (mainSelectGenre) {
    mainSelectGenre.addEventListener("change", function(event) {
        const genreChoisi = event.target.value;
        const filmsFiltres = allFilms.filter(f => 
            f.genre.some(g => g.toLowerCase() === genreChoisi.toLowerCase())
        );
        
        afficherDiagramme(filmsFiltres);
    });
}
// fin de la partie de Dylan //
