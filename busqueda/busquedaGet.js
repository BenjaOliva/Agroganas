var fireBase = fireBase || firebase;
var hasInit = false;

var config = {
    apiKey: "AIzaSyAO_RshYbaZtasQ9kYu--iiu5aWkP4gVsg",
    authDomain: "agroganas-5e529.firebaseapp.com",
    databaseURL: "https://agroganas-5e529.firebaseio.com",
    projectId: "agroganas-5e529",
    storageBucket: "agroganas-5e529.appspot.com",
    messagingSenderId: "776362086696",
    appId: "1:776362086696:web:d541b304ece51d46b0001d"
};
if (!hasInit) {
    firebase.initializeApp(config);
    hasInit = true;
    // Get a reference to the database service
    var database = firebase.firestore();
}

const db = firebase.firestore();

var elementosCategoria = document.getElementsByClassName('category');
var todasCategorias = document.getElementById('all');
var barraBusqueda = document.getElementById('barraBusqueda');
var navBar = document.getElementById('navbarCollapse');
const productsContainer = document.getElementById('results-body');
var Oferta = "false";
var Destacado = "false"

//Busqueda en cuestion
var search = getParameterByName('search')
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
console.log(search);

async function getProductsComplete(option) {
    switch (option) {
        case 1:
            return await db.collection("Productos").where("Nombre", "==", search).get();
            break;
        case 2:
            return await db.collection("Productos").where("Categoria", "==", search).get();
            break;
        default:
            console.log("Opcion no soportada!");
            break;
    }
}

function setPropiedades(PropiedadesRecibidas, PropiedadesText) {
    if (PropiedadesRecibidas != "") {
        let result = PropiedadesRecibidas.split(',').join("<br>");
        return `<pre class="card-text">
                <h5>Propiedades:</h5><br>` +
            result +
            `<br></pre>`;
    } else {
        if (PropiedadesText != "") {
            let result = PropiedadesText.split('.').join("<br>");
            return `<pre class="card-text">
    <h5>Propiedades:</h5><br>` +
                result +
                `<br></pre>`;
        } else return "";
    }
}

var docsArray = [];

window.addEventListener("DOMContentLoaded", async (e) => {
    let option = 0;
    do {
        option++;
        var querySnapshot = await getProductsComplete(option);
        querySnapshot.forEach(doc => {
            docsArray.push(doc.data())
        });
    } while (docsArray.length == 0);

    $(".contador").text(querySnapshot.size + " productos encontrados");
    showTheData();
});

function showTheData() {
    for (let i = 0; i < docsArray.length; i++) {
        if (docsArray[i].Destacado != "false") {
            var Destac = '<span class="badge badge-danger"> Destacado </span>';
        } else {
            var Destac = '';
        }

        if (docsArray[i].Oferta != "false") {
            var Ofer = '<span class="badge badge-danger" style="left: revert; right: 10px;"> OFERTA </span>';
        } else {
            var Ofer = '';
        }

        productsContainer.innerHTML += `<article class="card card-product-list">
        <div class="row no-gutters">
        <aside class="col-md-3">
        <br>
        <hr>
    
        <center>
          <b> Anunciante: ${docsArray[i].Publicante}</b>
          </center>
            <div class="">
                ${Destac}
                ${Ofer}
                      <img style="margin-top: 31px;" src="${docsArray[i].Imagen}" class="hoverZoomLink">
                  </a>
              </aside> <!-- col.// -->
              <div class="col-md-6">
                  <div class="info-main">
                      <p class="h5 title">${docsArray[i].Nombre}</p>
                      <hr>
                      <div>
                      ${setPropiedades(docsArray[i].Propiedades, docsArray[i].PropiedadesTexto)}
                      </div>
                      <hr>
                      <p>${docsArray[i].Descripcion}</p>
                  </div> <!-- info-main.// -->
              </div> <!-- col.// -->
              <aside class="col-sm-3">
                  <div class="info-aside">
                      <div class="price-wrap">
          
                      </div> <!-- info-price-detail // -->
                      <!-- <p class="text-success">Disponible</p> -->
                      <br>
                      <p>
                      <a href="https://form.jotform.com/210891397728670?productoA=${docsArray[i].Nombre}" class="btn btn-primary btn-block">Consultar</a>
                      </p>
                  </div> <!-- info-aside.// -->
              </aside> <!-- col.// -->
          </div> <!-- row.// -->
          </article> <!-- card-product .// -->`

    }
}

for (var i = 0; i < elementosCategoria.length; i++) elementosCategoria[i].disabled = true;

//Variables de intercambio - filtro
var categoryFilter = [];
var categoryFilterNotAll = [];

// Categorias a filtrar
todasCategorias.onchange = function () {
    if (todasCategorias.checked == true) {
        for (var i = 0; i < elementosCategoria.length; i++) elementosCategoria[i].disabled = true;
        categoryFilterNotAll = categoryFilter;
        categoryFilter = ["Agoinsumos", "Seguros", "Maquinaria", "AgriculturaPresicion", "Insumos", "NucleosCorrectoresSuplementos", "InstalacionesAgroganaderas", "Forrajes", "InsumosVeterinarios", "Instalaciones", "Generadores", "BalanzasBasculas", "Tanques", "CamposEstancias", "Herramientas", "HerramientasJardin", "ArticulosRurales", "OleoHidraulica"];
    } else {
        for (var i = 0; i < elementosCategoria.length; i++) elementosCategoria[i].disabled = false;
        categoryFilter = [];
        categoryFilter = categoryFilterNotAll;
    }
}

function newSearch() {
    navBar.classList.add("show")
    barraBusqueda.focus();
}

$('.category').click(function () {
    let newItem = $(this).val();
    const index = categoryFilter.indexOf(newItem);
    if (index > -1) {
        categoryFilter.splice(index, 1);
    } else {
        categoryFilter.push(newItem)
    }
    console.log(categoryFilter);
})

$('.Oferta').change(function () {
    if (this.checked) {
        Oferta = "on";
    } else {
        Oferta = "false";
    }
})

$('.Destacado').change(function () {
    if (this.checked) {
        Destacado = "on";
    } else {
        Destacado = "false";
    }
})

function useFilters() {
    document.getElementById("results-body").innerHTML = "";

    console.log();

}