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

var data;

const productsContainer = document.getElementById('container-publicaciones');

initAll();

function initAll() {
    if (!hasInit) {
        firebase.initializeApp(config);
        hasInit = true;
        // Get a reference to the database service
        var db = firebase.firestore();
    }
    
    db.collection("Productos")
    .where("Principal", "==", true)
    .get()
    .then((querySnapshot) => {
        data = querySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
          });

        setContainer(data)
    })
}

function Publicante(dataSet, dataAgro) {
    if (dataSet == '') {
        return '<a href="../agronomias-virtuales/profile.html?agr=' + dataAgro +'" type="button" class="btn btn-sm btn-outline-dark"> Ver más de ' + dataAgro + ' </a>';
    } else {
        return '<b> Vendedor: ' + dataSet + '</b>';
    }
}

function setContainer(array) {
    productsContainer.innerHTML = "";

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
    
            productsContainer.innerHTML += `<article id="` + doc.id + `" class="card card-product-list">
    <div class="row no-gutters">
        <aside class="col-md-3">
        <br>
        <hr>
        <center>
        `+ Publicante(doc.Publicante, doc.Agronomia) + `
          </center>
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
                <p>${doc.Descripcion}</p>
                <hr>
                <p><i class="fa fa-map-marker" aria-hidden="true"></i>  `+ doc.Provincia +`, `+ doc.Localidad +`</p>
            </div> <!-- info-main.// -->
        </div> <!-- col.// -->
        <aside class="col-sm-3">
            <div class="info-aside">
                <div class="price-wrap">
    
                </div> <!-- info-price-detail // -->
                <!-- <p class="text-success">Disponible</p> -->
                <br>
                <p>
                <a href="sections/producto.html?id=${doc.id}" class="btn btn-primary btn-block">Ver Detalles</a>
                <a href="https://form.jotform.com/210891397728670?productoA=${doc.Nombre}" class="btn btn-success btn-block">Consultar</a>
                </p>
            </div> <!-- info-aside.// -->
        </aside> <!-- col.// -->
    </div> <!-- row.// -->
    </article> <!-- card-product .// -->`
    
        }); 
    }else{
        productsContainer.innerHTML = ``;
    }

}