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

var db;

function initFirebase() {
    firebase.initializeApp(config);
    db = firebase.firestore();
}

const url_string = window.location.href;
const currentUrl = new URL(url_string);
const idAgroDoc = currentUrl.searchParams.get("id");
const nameAgro = currentUrl.searchParams.get("agr");

const imgProfile = document.getElementById('imgProfile');
const NombreAgro = document.getElementById('Nombre-agro');
const ProvinciaAgro = document.getElementById('Provincia-agro');
const LocalidadAgro = document.getElementById('Localidad-agro');

const publicacionesContainer = document.getElementById('publicaciones-container');
const publicacionesContainer2 = document.getElementById('publicaciones-container-filter');

const ofertasContainer = document.getElementById('ofertasTab');

var datosAgro;

initAll();

async function initAll() {
    var docRef;
    // Iniciamos las variables de conexion
    initFirebase()

    if (idAgroDoc !== null) {
        docRef = db.collection("Agronomias").doc(String(idAgroDoc));
    } else {
        await db.collection("Agronomias")
            .where("Nombre", "==", nameAgro).get()
            .then((querySnapshot) => {
                docRef = db.collection("Agronomias").doc(querySnapshot.docs[0].id);
            })
            .catch((err) => {
                //alert('No se identifico la Agronomia!')
                console.error(err);
            })
    }

    docRef.get().then((doc) => {
        if (doc.exists) {
            datosAgro = doc.data();
            loadAgro(doc.data());
        } else {
            // doc.data() will be undefined in this case
            alert('No existe la Agronomia!')
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

var arrayToFilter;

var arrayOfertas;

var result;

var selectobject = document.getElementById("CategoriaProd");

async function loadAgro(object) {
    NombreAgro.innerHTML = object.Nombre;
    ProvinciaAgro.innerHTML += object.Provincia;
    LocalidadAgro.innerHTML += object.Localidad;

    imgProfile.src = object.Logo;

    document.getElementById('agronomia-page-title').innerHTML += object.Nombre;

    await db.collection("Productos")
        .where("Agronomia", "==", object.Nombre)
        .get()
        .then((querySnapshot) => {
            // Guardamos los datosen un array local para poder filtrar
            arrayToFilter = querySnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });

            arrayOfertas = arrayToFilter.filter(function (el) {
                return el.Destacado == "true" ||
                    el.Oferta == "on";
            });

            result = arrayToFilter.map(a => a.Categoria);
        })
        .then(() => {
            jQuery("select[id*='CategoriaProd'] > option").each(function () {
                if (jQuery.inArray(jQuery(this).val(), result) === -1) {
                    jQuery(this).remove();
                }
            });

            jQuery("select[id*='Categoria'] > option").each(function () {
                if (jQuery.inArray(jQuery(this).val(), result) === -1) {
                    jQuery(this).remove();
                }
            });
            $('#CategoriaProd').selectpicker('refresh');
            $('#Categoria').selectpicker('refresh');
        })


    setOfertas(arrayOfertas);

    setAll(arrayToFilter);

}

// Mostrar en "Ofertas y Desta"
function setOfertas(array) {
    ofertasContainer.innerHTML = "";

    if (array.length > 0) {
        array.forEach(doc => {

            if (doc.Destacado != "false") {
                var Destac = '<span class="badge badge-danger"> Destacado </span>';
            } else {
                var Destac = '';
            }

            if (doc.Oferta != "false") {
                var Ofer = '<span class="badge badge-danger" style="left: revert; right: 10px;"> OFERTA </span>';
            } else {
                var Ofer = '';
            }

            ofertasContainer.innerHTML += `<article id="` + doc.id + `" class="card card-product-list">
    <div class="row no-gutters">
        <aside class="col-md-3">
        <br>
        <hr>
            <div class="">
                ${Destac}
                ${Ofer}
                <center>
                <img onclick="OpenInNewTabWinBrowser('${doc.Imagen}')" id="imageresource" style="margin-top: 31px;" src="${doc.Imagen}" class="img-fluid" alt="Responsive image">
                <button type="button" hidden onclick="modalMedia('${doc.id}')" class="btn btn-primary" data-toggle="modal" data-target="#imgModal">
                    Ver más Imagenes
                </button>
                </center>
                <br>
            </div>
        </aside> <!-- col.// -->
        <div class="col-md-6">
            <div class="info-main">
                <p class="h5 title">${doc.Nombre}</p>
                <hr>
                <!--
                <div>
                ${setPropiedades(doc.Propiedades, doc.PropiedadesTexto)}
                </div>
                <hr>
                -->
                <p>${doc.Descripcion}</p>
                <hr>
                <p><i class="fa fa-map-marker" aria-hidden="true"></i>  `+ doc.Provincia + `, ` + doc.Localidad + `</p>
            </div> <!-- info-main.// -->
        </div> <!-- col.// -->
        <aside class="col-sm-3">
            <div class="info-aside">
                <div class="price-wrap">
    
                </div> <!-- info-price-detail // -->
                <!-- <p class="text-success">Disponible</p> -->
                <br>
                <p>
                <a href="../sections/producto.html?id=${doc.id}" class="btn btn-primary btn-block">Ver Detalles</a>
                <a href="https://form.jotform.com/210891397728670?productoA=${doc.Nombre}" class="btn btn-success btn-block">Consultar</a>
                </p>
            </div> <!-- info-aside.// -->
        </aside> <!-- col.// -->
    </div> <!-- row.// -->
    </article> <!-- card-product .// -->`

        });
    } else {
        ofertasContainer.innerHTML = `<center><p>No hay Publicaciones Destacadas o en Oferta!</p></center>`;
    }

}

// Mostrar en "Mas publicaciones"
function setAll(array) {
    publicacionesContainer.innerHTML = "";

    if (array.length > 0) {
        array.forEach(doc => {

            if (doc.Destacado != "false") {
                var Destac = '<span class="badge badge-danger"> Destacado </span>';
            } else {
                var Destac = '';
            }

            if (doc.Oferta != "false") {
                var Ofer = '<span class="badge badge-danger" style="left: revert; right: 10px;"> OFERTA </span>';
            } else {
                var Ofer = '';
            }

            publicacionesContainer.innerHTML += `<article id="` + doc.id + `" class="card card-product-list">
    <div class="row no-gutters">
        <aside class="col-md-3">
        <br>
        <hr>
            <div class="">
                ${Destac}
                ${Ofer}
                <center>
                <img onclick="OpenInNewTabWinBrowser('${doc.Imagen}')" id="imageresource" style="margin-top: 31px;" src="${doc.Imagen}" class="img-fluid" alt="Responsive image">

                <button type="button" hidden onclick="modalMedia('${doc.id}')" class="btn btn-primary" data-toggle="modal" data-target="#imgModal">
                    Ver más Imagenes
                </button>
                </center>
                <br>
            </div>
        </aside> <!-- col.// -->
        <div class="col-md-6">
            <div class="info-main">
                <p class="h5 title">${doc.Nombre}</p>
                <hr>
                <!--
                <div>
                ${setPropiedades(doc.Propiedades, doc.PropiedadesTexto)}
                </div>
                <hr>
                -->
                <p>${doc.Descripcion}</p>
                <hr>
                <p><i class="fa fa-map-marker" aria-hidden="true"></i>  `+ doc.Provincia + `, ` + doc.Localidad + `</p>
            </div> <!-- info-main.// -->
        </div> <!-- col.// -->
        <aside class="col-sm-3">
            <div class="info-aside">
                <div class="price-wrap">
    
                </div> <!-- info-price-detail // -->
                <!-- <p class="text-success">Disponible</p> -->
                <br>
                <p>
                <a href="../sections/producto.html?id=${doc.id}" class="btn btn-primary btn-block">Ver Detalles</a>
                <a href="https://form.jotform.com/210891397728670?productoA=${doc.Nombre}" class="btn btn-success btn-block">Consultar</a>
                </p>
            </div> <!-- info-aside.// -->
        </aside> <!-- col.// -->
    </div> <!-- row.// -->
    </article> <!-- card-product .// -->`

        });
    } else {
        publicacionesContainer.innerHTML = `<center><p>No hay Publicaciones disponibles!</p></center>`;
    }
}

// Mostrar en "Prod. por Cat."
function setAll2(array) {
    publicacionesContainer2.innerHTML = "";

    if (array.length > 0) {
        array.forEach(doc => {

            if (doc.Destacado != "false") {
                var Destac = '<span class="badge badge-danger"> Destacado </span>';
            } else {
                var Destac = '';
            }

            if (doc.Oferta != "false") {
                var Ofer = '<span class="badge badge-danger" style="left: revert; right: 10px;"> OFERTA </span>';
            } else {
                var Ofer = '';
            }

            publicacionesContainer2.innerHTML += `<article id="` + doc.id + `" class="card card-product-list">
    <div class="row no-gutters">
        <aside class="col-md-3">
        <br>
        <hr>
            <div class="">
                ${Destac}
                ${Ofer}
                <center>
                <img onclick="OpenInNewTabWinBrowser('${doc.Imagen}')" id="imageresource" style="margin-top: 31px;" src="${doc.Imagen}" class="img-fluid" alt="Responsive image">

                <button type="button" hidden onclick="modalMedia('${doc.id}')" class="btn btn-primary" data-toggle="modal" data-target="#imgModal">
                    Ver más Imagenes
                </button>
                </center>
                <br>
            </div>
        </aside> <!-- col.// -->
        <div class="col-md-6">
            <div class="info-main">
                <p class="h5 title">${doc.Nombre}</p>
                <hr>
                <!--
                <div>
                ${setPropiedades(doc.Propiedades, doc.PropiedadesTexto)}
                </div>
                <hr>
                -->
                <p>${doc.Descripcion}</p>
                <hr>
                <p><i class="fa fa-map-marker" aria-hidden="true"></i>  `+ doc.Provincia + `, ` + doc.Localidad + `</p>
            </div> <!-- info-main.// -->
        </div> <!-- col.// -->
        <aside class="col-sm-3">
            <div class="info-aside">
                <div class="price-wrap">
    
                </div> <!-- info-price-detail // -->
                <!-- <p class="text-success">Disponible</p> -->
                <br>
                <p>
                <a href="../sections/producto.html?id=${doc.id}" class="btn btn-primary btn-block">Ver Detalles</a>
                <a href="https://form.jotform.com/210891397728670?productoA=${doc.Nombre}" class="btn btn-success btn-block">Consultar</a>
                </p>
            </div> <!-- info-aside.// -->
        </aside> <!-- col.// -->
    </div> <!-- row.// -->
    </article> <!-- card-product .// -->`

        });
    } else {
        publicacionesContainer2.innerHTML = `<center><p>No hay Publicaciones disponibles!</p></center>`;
    }
}

function setPropiedades(PropiedadesRecibidas, PropiedadesText) {
    if (PropiedadesRecibidas != "") {
        let result = PropiedadesRecibidas.split(',').join("<br>");
        return `<pre class="card-text" >
              <h5></h5>` +
            result +
            `<br></pre>`;
    } else {
        if (PropiedadesText != "") {
            let result = PropiedadesText.split('.').join("<br>");
            return `<pre class="card-text">
  <h5></h5>` +
                result +
                `<br></pre>`;
        } else return "";
    }
}

function Publicante(dataSet) {
    if (dataSet == null) {
        return '';
    } else {
        return '<b> Vendedor: ' + dataSet + '</b>';
    }
}

function filtrarArray() {
    const provincia = document.getElementById('select-provincia').value;
    const localidad = document.getElementById('select-localidad').value;
    console.log(provincia, localidad);

    var newArray = arrayToFilter.filter(function (el) {
        return el.Provincia == provincia &&
            el.Localidad == localidad;
    });

    setAll(newArray);
}

function filtrarCategoria(category) {
    var newArray = arrayToFilter.filter(function (el) {
        return el.Categoria == category;
    });

    setAll(newArray);
}

function filtrarCategoria2(category) {
    var newArray = arrayToFilter.filter(function (el) {
        return el.Categoria == category;
    });

    setAll2(newArray);
}