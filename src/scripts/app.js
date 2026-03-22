//  en gros : le morceau ici sert à attribuer la classe show pour que le block actor s'affiche quand on tape sur acteur dans la nav 
//  suffit de copier coller ce morceau 2 fois et de mofifier les valeurs pour avoir ça avec genre et année aussi

const navActor = document.querySelector(".actor__btn");
const sectionActor = document.querySelector(".actor");

function actor() {
    sectionActor.classList.toggle("block--show");
}

navActor.addEventListener("click", actor);




// --------- 1 : recup les données json 

let allActors = [];
//  la j'ai fait un tableau pour mettre tous les noms des acteurs qui auront été recup avec le json dcp

let allFilms = [];


fetch ('assets/data_yasmine.json')
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
                console.log(allActors)

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
const search = document.getElementById('site-search');

search.addEventListener('input', function(){

    // je recup ce que l'utilisateur ecrit
    let userSearch = search.value.toLowerCase();

    // ça c'est pr nettoyer la liste 
    sugList.innerHTML = "";

    // filtrer la liste pr garder que les acteurs qui ont les mêmes lettres 
    let suggestions = allActors.filter(function(nom) {
        console.log(nom);
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
            return acteur.nom === nomChoisi
        });
    });

    console.log(filmsActeur);

});

