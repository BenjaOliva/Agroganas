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

const agrosContainer = document.getElementById("agronomias-container");

// Consulta a la DB
const getAgros = () => db.collection("Agronomias").get();

function loadAgros(array) {
    agrosContainer.innerHTML = "";

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
    
            agrosContainer.innerHTML += `<div class="col-lg-4">
            <div class="card shadow p-3 mb-5 bg-white rounded">
            <center>
                <img class="card-img-top img-fluid "
                    preserveAspectRatio="xMidYMid slice" focusable="false" role="img"
                    aria-label="Placeholder: 140x140" style="max-width: 200px; max-height: 200px;"
                    src="` + doc.Logo + `" alt="Card image cap">
                    </center>
                <div class="card-body">
                    <h5 class="card-title">`+ doc.Nombre +`</h5>
                    <hr>
                    <p class="card-text">
                    <p><i class="fa fa-map-marker" aria-hidden="true"></i>  `+ doc.Provincia +`, `+ doc.Localidad +`</p>
                    </p>
                    <a class="btn btn-success text-white stretched-link" href="profile.html?id=`+ doc.id +`">Ir a la Agronomia</a>
                </div>
            </div>
        </div>`
    
        }); 
    }else{
        agrosContainer.innerHTML = `<p>No hay Agronomias disponibles en la zona!</p>`;
    }

    
}

window.addEventListener("DOMContentLoaded", async (e) => {
    const querySnapshot = await getAgros();
    
    // Guardamos los datosen un array local para poder filtrar
    arrayToFilter = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      });

    // llamada a la funcion que carga los datos del array
    loadAgros(arrayToFilter);
});

function filtrarArray() {
    const provincia = document.getElementById('select-provincia').value;
    const localidad = document.getElementById('select-localidad').value;
    console.log(provincia, localidad);

    var newArray = arrayToFilter.filter(function (el) {
        return el.Provincia == provincia &&
               el.Localidad == localidad;
      });

      loadAgros(newArray);
}