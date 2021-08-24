var config = {
    apiKey: "AIzaSyAO_RshYbaZtasQ9kYu--iiu5aWkP4gVsg",
    authDomain: "agroganas-5e529.firebaseapp.com",
    databaseURL: "https://agroganas-5e529.firebaseio.com",
    projectId: "agroganas-5e529",
    storageBucket: "agroganas-5e529.appspot.com",
    messagingSenderId: "776362086696",
    appId: "1:776362086696:web:d541b304ece51d46b0001d"
};
firebase.initializeApp(config);

var storage;
var db;

const btnHome = document.getElementById('btnHome');
// Botones de Publicaciones
const btnPublicacionNew = document.getElementById('btnPublicacionNew');
const btnPublicacionEdit = document.getElementById('btnPublicacionEdit');

// Botones de Agronomias
const btnAgronomiasNew = document.getElementById('btnAgronomiaNew');
const btnAgronomiasEdit = document.getElementById('btnAgronomiaEdit');

const containerHome = $('#home');

const productsContainer = document.getElementById("products-container");

const agrosContainer = document.getElementById("agronomias-edit-container");

var imgThums = document.getElementById('imgThums');
var imgSrcs = document.getElementById('imgSrcs');

// Formularios
var formEdit = document.getElementById("editForm");
var form = document.getElementById("myForm");

var agroSelectSearch = document.getElementById("select-agronomia-search");

// Box Imagenes
const archivos = document.getElementById("photo");

// Handle Form
function handleForm(event) { event.preventDefault(); }

form.addEventListener('submit', handleForm);
formEdit.addEventListener('submit', handleForm);

// Variables aisladas

var urlsToSave = [];

var datosGet;

var AgronomiasVirtuales;

//Login task
$('#loginForm').submit(
    function (event) {
        event.preventDefault();
        login();
        document.getElementById("loginForm").reset();
    });

// Login Firebase
function login() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
        .then(function (response) {
            console.log('Sesion Iniciada!');
        })
        .catch(function (error) {
            console.log('No se inicio sesion!');
        });
}

// Auth state change - Detecta cambios de sesion y si hay sesion existente
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

        $('#staticBackdrop').modal('hide');

        // Home view
        vistaHome();

        // Firebase init vars
        initAdmin();
    } else {
        // User is signed out.
        console.log('Sin Sesion!');
        $('#staticBackdrop').modal('show');
    }
});

var arrayPublicaciones;

function initAdmin() {

    // Iniciamos las funciones principales
    storage = firebase.storage();
    db = firebase.firestore();

    // Seteamos el contador de publicaciones
    db.collection("Productos").get()
        .then((res) => {
            document.getElementById('cant-publicaciones').innerHTML = res.size;
            arrayPublicaciones = res.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });
        })
        .then(() => {
            let result = arrayPublicaciones.map(a => a.Agronomia);
            let result2 = arrayPublicaciones.map(a => a.Categoria);
            updateTheCharts(doubleArray(result), doubleArray(result2))
        })
    // Obtenemos las Agronomias y cargamos la var AgronomiasVirtuales
    db.collection('Agronomias').get()
        .then(querySnapshot => {
            AgronomiasVirtuales = querySnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });
        })
        .then(() => {

            // Seteamos el contador con el array ya populado
            document.getElementById('cant-agronomias').innerHTML = AgronomiasVirtuales.length;

            // Seteamos las options del select
            var select = document.getElementById("select-agronomia");
            array = AgronomiasVirtuales;
            for (let i = 0; i < array.length; i++) {
                const opt = array[i].Nombre;
                var el = document.createElement("option");
                el.text = opt;
                el.value = opt;

                select.add(el);
                agroSelectSearch.add(el);
                $('#select-agronomia-search').selectpicker('refresh');
            }

            loadAgros(AgronomiasVirtuales);

        })

}

// Vista Home
function vistaHome() {
    $('.section-container').attr('hidden', true);
    containerHome.attr('hidden', false);
}

// Vistas managers
function vistaPublicaciones(action) {
    $('.section-container').attr('hidden', true);
    $('.sidebar-collapser').removeClass('show');

    switch (action) {
        case "new":
            $('#publicacionesNew').attr('hidden', false);
            break;
        case "edit":
            $('#publicacionesEdit').attr('hidden', false);
            break;
        default:
            console.log('Opcion no soportada!');
            break;
    }
}

function vistaAgronomias(action) {
    $('.section-container').attr('hidden', true);
    $('.sidebar-collapser').removeClass('show');

    switch (action) {
        case "new":
            $('#AgronomiasNew').attr('hidden', false);
            break;
        case "edit":
            $('#AgronomiasEdit').attr('hidden', false);
            break;
        default:
            console.log('Opcion no soportada!');
            break;
    }
}

// ----- Firebase Functions ----
// Agrega las propiedades a la card de la publicacion
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

// Agrega la vista del Vendedor a la card de la publicacion
function Publicante(dataSet) {
    if (dataSet == null) {
        return '';
    } else {
        return '<b> Vendedor: ' + dataSet + '</b>';
    }
}

var categoriaSearch;

// Inserta las publicaciones en la Card de Respuesta
async function getSearchCat(category, agro) {

    $('#modalLoading').modal('hide');

    productsContainer.innerHTML = '';

    categoriaSearch = category;

    if (Boolean(agro)) {
        var querySnapshot = await db.collection("Productos").where("Categoria", "==", categoriaSearch).where("Agronomia", "==", agro).get();
    } else {
        var querySnapshot = await db.collection("Productos").where("Categoria", "==", categoriaSearch).get();
    }

    if (querySnapshot.docs.length == 0) {
        productsContainer.innerHTML = `
                    <center>
                    <br>
                        <p>No hay Publicaciones para esta categoria!</p>
                    <br>
                    </center>
        `
    }

    querySnapshot.forEach(doc => {
        if (doc.data().Destacado != "false") {
            var Destac = '<span class="badge badge-danger"> Destacado </span>';
        } else {
            var Destac = '';
        }

        if (doc.data().Oferta != "false") {
            var Ofer = '<span class="badge badge-danger" style="left: revert; right: 10px;"> OFERTA </span>';
        } else {
            var Ofer = '';
        }

        var imgArray = doc.data().Imagen;

        productsContainer.innerHTML += `<article id="` + doc.id + `" class="card card-product-list">
<div class="row no-gutters">
    <aside class="col-md-3">
    <br>
    <hr>

    <center>
                `+ Publicante(doc.data().Publicante) + `
      </center>
        <div class="">
        <center>
            ${Destac}
            ${Ofer}
            <img onclick="OpenInNewTabWinBrowser('${imgArray}')" id="imageresource" style="margin-top: 31px;" src="${doc.data().Imagen}" class="img-fluid" alt="Responsive image">
            <hr>
                <button type="button" onclick="modalMedia('${doc.id}')" class="btn btn-primary" data-toggle="modal" data-target="#imgModal">
                    Ver más Imagenes
                </button>
            </center>
            <br>
        </div>
    </aside> <!-- col.// -->
    <div class="col-md-6">
        <div class="info-main">
            <p class="h5 title">${doc.data().Nombre}</p>
            <hr>
            <div>
            ${setPropiedades(doc.data().Propiedades, doc.data().PropiedadesTexto)}
            </div>
            <hr>
            <p>${doc.data().Descripcion}</p>
        </div> <!-- info-main.// -->
    </div> <!-- col.// -->
    <aside class="col-sm-3">
        <div class="info-aside">
            <div class="price-wrap">

            </div> <!-- info-price-detail // -->
            <!-- <p class="text-success">Disponible</p> -->
            <br>
            <p>
                        <button onclick='getOneProduct("`+ doc.id + `")' class="btn btn-warning btn-block"><i class="fa fa-edit"></i> Editar</button>
                        <a onclick="if(confirm('Quiere eliminar esta Publicacion?')) deleteByID('`+ doc.id + `');" class="btn btn-danger btn-block"><i class="fa fa-trash"></i> Eliminar</a>
            </p>
        </div> <!-- info-aside.// -->
    </aside> <!-- col.// -->
</div> <!-- row.// -->
            </article> <!-- card-product .// -->`

    });
}

// -- DELETE Publicacion --

// Elimina un documento por el ID y las imagenes enlazadas - Video pendiente
async function deleteByID(idToSearch) {

    var docToDelete = arrayPublicaciones[arrayPublicaciones.findIndex(item => item.id === idToSearch)];

    for (let index = 0; index < docToDelete.Imagen.length; index++) {
        const element = docToDelete.Imagen[index];
        deleteImg(element);
    }

    deleteDocument(idToSearch)
}

// Borrar una imagen por su url 
async function deleteImg(element) {
    var desertRef = firebase.storage().refFromURL(element);

    await desertRef.delete().then(function () {
        return
    }).catch(function (error) {
        // Uh-oh, an error occurred!
        console.error("Error al borrar imagen!", error);
    });
}

// Borrar doc por su ID
function deleteDocument(idparam) {
    // DELETE siempre da true aunque no exista el id, en caso de ser necesario, checkear existencia y despues borrar
    db.collection("Productos").doc(idparam).delete().then(() => {
        getSearchCat(categoriaSearch);
        console.log("Publicacion Borrada!");
        alert('Publicacion Borrada!')

        // Disminuimos el contador de publicaciones
        document.getElementById('cant-publicaciones').innerHTML = parseInt(document.getElementById('cant-publicaciones').innerHTML) - 1

        arrayPublicaciones = arrayPublicaciones.filter(function (obj) {
            return obj.id !== idparam;
        });

        var result = arrayPublicaciones.map(a => a.Agronomia);
        var result2 = arrayPublicaciones.map(a => a.Categoria);
        updateTheCharts(doubleArray(result), doubleArray(result2))

    }).catch((error) => {
        alert('Error al borrar la publicacion!')
        console.error("Error al eliminar el documento! ", error);
    });
}

var imgsToDelete = [];

// -- AGREGAR Publicacion --
form.addEventListener("submit", async (e) => {
    await uploadAll()
});

// Image upload all the images
async function uploadAll() {
    return new Promise(resolve => {
        if (filesPublicacion.length == 0) {
            alert('Debe cargar imagenes!')
        } else {
            for (let i = 0; i < filesPublicacion.length; i++) {
                console.log(filesPublicacion[i].filename);
                uploadNewDocImgs(filesPublicacion[i].file)
            }
        }
        resolve('second')
    })
}

// Image uploader - Firebase
function uploadNewDocImgs(imageFile) {
    var validar = 0;
    $('#modalLoading').modal('show')

    return new Promise(function (resolve, reject) {

        //Upload file
        var task = storage.ref().child('image/' + imageFile.name + '-' + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)).put(imageFile);

        //Update progress bar - en complete se usa validar para AddRegistro
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100.0;
                console.log(percentage);
            },
            function error(err) {
                console.error("Error adding document: ", err);
                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                toastr["error"]("El error puede deberse a un problema de permisos en Firebase con su Usuario.", "Error en la Carga!")
            },
            function complete() {
                task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    urlsToSave.push(downloadURL);
                    validar++;

                    if (validar == filesPublicacion.length) {
                        console.log(urlsToSave);
                        console.log('%c Imagenes subidas con exito! Guardando registro... ', ' color: #bada55');
                        $('.my-pond').filepond('removeFiles');
                        filesPublicacion = []

                        AddRegistro();
                    }
                });
            }
        );
    });
}

var test;

// Add Registro - Firebase
async function AddRegistro() {

    var Nombre = document.getElementById('Nombre').value;
    var Descripcion = document.getElementById('Descripcion').value;
    var Publicante = document.getElementById('Publicante').value;
    var Imagen = urlsToSave;
    var Provincia = document.getElementById('select-provincia').value;
    var Localidad = document.getElementById('select-localidad').value;
    var Propiedades = document.getElementById('Propiedades').value;
    var PropiedadesTexto = document.getElementById('PropiedadesTexto').value;
    var Categoria = document.getElementById('Categoria').value;
    var Destacado = document.getElementById('checkbox1').value;
    var Oferta = document.getElementById('checkbox2').value;
    var Agronomia = document.getElementById('select-agronomia').value;
    var Principal = Boolean($('#checkboxPrincipal').val())

    // Add a new document with a generated id.
    await db.collection("Productos").add({
        Agronomia,
        Nombre,
        Descripcion,
        Imagen,
        Publicante,
        Categoria,
        Propiedades,
        PropiedadesTexto,
        Provincia,
        Localidad,
        Destacado,
        Oferta,
        Principal
    })
        .then((doc) => {
            if (doc) {
                test = doc;
                console.log('%c Registro Guardado ! ', ' color: #bada55');

                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": true,
                    "progressBar": true,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": true,
                    "onclick": function () { window.open("https://agroganas.com/") },
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "9000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                toastr["success"]("Los datos se cargaron de forma exitosa! Click aqui para ir a la pagina", "Datos Cargados!")
                $("#Propiedades").tagsinput('removeAll');
                $('#modalLoading').modal('hide')

                document.getElementById('cant-publicaciones').innerHTML = parseInt(document.getElementById('cant-publicaciones').innerHTML) + 1

                form.reset();
                $('#checkboxPrincipal').bootstrapToggle('off');
                $('#checkbox1').bootstrapToggle('off');
                $('#checkbox2').bootstrapToggle('off');

                var newPublicacion = {
                    id: doc.id,
                    Agronomia,
                    Nombre,
                    Descripcion,
                    Imagen,
                    Provincia,
                    Localidad,
                    Categoria,
                    Destacado,
                    Oferta,
                    Principal,
                    Publicante,
                    Propiedades,
                    PropiedadesTexto
                };
                arrayPublicaciones.push(newPublicacion);

                var result = arrayPublicaciones.map(a => a.Agronomia);
                var result2 = arrayPublicaciones.map(a => a.Categoria);
                updateTheCharts(doubleArray(result), doubleArray(result2))
            } else {
                console.log("No hay referencia a la agronomia");
                $('#modalLoading').modal('hide')
            }
        })
        .then(urlsToSave = [])
        .catch((error) => {
            console.error("Error adding document: ", error);
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-center",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr["error"]("El error puede deberse a un problema de permisos en Firebase con su Usuario.", "Error en la Carga!")
        });
}

const activities = document.getElementById('select-agronomia');

activities.addEventListener('change', (e) => {

    if (e.target.value !== '') {
        $('#Vendedor').attr('hidden', true);
        $('#Publicante').val('');
    } else {
        $('#Vendedor').attr('hidden', false);
        $('#Publicante').val('');
    }

});

document.getElementById('select-agronomia-edit').addEventListener('change', (e) => {
    if (e.target.value !== '') {
        $('#VendedorEdit').attr('hidden', true);
        $('#PublicanteEdit').val('');
    } else {
        $('#VendedorEdit').attr('hidden', false);
        $('#PublicanteEdit').val('');
    }
});

agroSelectSearch.addEventListener('change', (e) => {
    const agro = e.target.value;

    if (Boolean(agro)) {
        var arrayTemp = arrayPublicaciones.filter(function (obj) {
            return obj.Agronomia == agro;
        });

        var temporal = doubleArray(arrayTemp.map(a => a.Categoria))

        $("#searchCat option").hide();

        temporal[0].forEach(element => {
            $("#searchCat option[value=" + element + "]").show();
        });
        $("#searchCat").val($('#searchCat option[style=""]:first').val());
        $('#searchCat').selectpicker('refresh');
    } else {
        $("#searchCat option").show();
        $("#searchCat").val($('#searchCat option[style=""]:first').val());
        $('#searchCat').selectpicker('refresh');
    }
})

// -- EDIT Publicacion --


// Muestra imagenes y Muestra el apartado video si corresponde
function modalMedia(productId) {
    $('#img-btn').attr('aria-expanded', 'true');
    var docRef = db.collection("Productos").doc(String(productId));

    imgSrcs.innerHTML = '';
    imgThums.innerHTML = '';

    var id = 0;

    docRef.get().then((doc) => {
        doc.data().Imagen.forEach(element => {
            console.log(element);
            id++
            if (id == 1) {
                var temp = 'tb-active'
                var temp2 = 'active'

            } else {
                var temp = '';
                var temp2 = '';
            }

            imgThums.innerHTML += `
            <div id="f`+ id + `" class="tb ` + temp + `"> <img class="thumbnail-img fit-image"
            src="`+ element + `"> </div>
            `
            imgSrcs.innerHTML += `
            <fieldset id="f`+ id + `1" class="` + temp2 + `">
                <div class="product-pic"> <img class="pic0" src="`+ element + `"> </div>
            </fieldset>
            `
        });

        if (doc.data().Video != undefined) {
            $('#video-view').attr('hidden', false);
        } else {
            $('#video-view').attr('hidden', true);
        }

        $(".tb").hover(function () {

            $(".tb").removeClass("tb-active");
            $(this).addClass("tb-active");

            //current_fs = $(".active");

            next_fs = $(this).attr('id');
            next_fs = "#" + next_fs + "1";

            $("fieldset").removeClass("active");
            $(next_fs).addClass("active");
        });
    })
        .catch((error) => {
            console.log("Error obteniendo el documento:", error);
        });

}

var idDocToEdit;

// Obtiene datos de un documento en concreto
function getOneProduct(idToSearch) {

    idDocToEdit = idToSearch;

    $('#select-agronomia-edit').empty()
    var $options = $("#select-agronomia > option").clone();
    $('#select-agronomia-edit').append($options);

    var docToEdit = arrayPublicaciones[arrayPublicaciones.findIndex(item => item.id === idDocToEdit)];

    fillEditForm(docToEdit);

}

var tempData;

// Completa el formulario para editar
async function fillEditForm(datos) {
    $('#modalPublicacionEdit').modal('show');

    tempData = datos;
    var formPublicacion = document.forms['editForm'];

    formPublicacion.elements['NombreEdit'].value = datos.Nombre;
    formPublicacion.elements['DescripcionEdit'].value = datos.Descripcion;
    formPublicacion.elements['PublicanteEdit'].value = datos.Publicante;
    formPublicacion.elements['CategoriaEdit'].value = datos.Categoria;
    formPublicacion.elements['AgronomiaEdit'].value = datos.Agronomia;

    formPublicacion.elements['PropiedadesEdit'].value = datos.Propiedades;
    formPublicacion.elements['PropiedadesTextoEdit'].value = datos.PropiedadesTexto;

    $('#CategoriaEdit').selectpicker('refresh');

    if (datos.PropiedadesTexto == '') {
        $('#checkboxPropsEdit').bootstrapToggle('on');
        document.getElementById('PropiedadesEdit').value = editItemsFill(datos.Propiedades.split(','));
    } else {
        formPublicacion.elements['PropiedadesTextoEdit'].value = datos.PropiedadesTexto;
        $('#checkboxPropsEdit').bootstrapToggle('off');
    }

    formPublicacion.elements['PropiedadesEdit'].value = datos.Propiedades;
    document.getElementById('PropiedadesTextoEdit').value = datos.PropiedadesTexto;

    if (datos.Destacado == 'true' || datos.Destacado == 'on') $('#checkbox1Edit').bootstrapToggle('on');
    else $('#checkbox1Edit').bootstrapToggle('off');

    if (datos.Oferta == 'true' || datos.Oferta == 'on') $('#checkbox2Edit').bootstrapToggle('on');
    else $('#checkbox2Edit').bootstrapToggle('off');

    if (datos.Principal) {
        $('#checkboxPrincipalEdit').bootstrapToggle('on');
    } else {
        $('#checkboxPrincipalEdit').bootstrapToggle('off');
    }

    if (datos.Agronomia !== "") {
        document.getElementById('VendedorEdit').setAttribute("hidden", "true")
        formPublicacion.elements['PublicanteEdit'].removeAttribute("required");
    }
    else {
        formPublicacion.elements['PublicanteEdit'].setAttribute("required", "required");
        document.getElementById('VendedorEdit').removeAttribute("hidden");
    }

    $("#select-provincia-publicacionEdit").val(datos.Provincia);
    $("#select-provincia-publicacionEdit").selectpicker('refresh');

    await cambiarLocalidadesPublicacionEdit();

    $("#select-localidad4").val(datos.Localidad);
    $("#select-localidad4").selectpicker('refresh');
}

// Agrega las props al form de editar
function editItemsFill(array) {
    $("#PropiedadesEdit").tagsinput('removeAll');

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        $("#PropiedadesEdit").tagsinput('add', element);
    }
}

formEdit.addEventListener('submit', async (e) => {
    $('#modalPublicacionEdit').modal('hide')
    var publicacionForm = document.forms['editForm'];
    $('#modalLoading').modal('show');

    db.collection("Productos").doc(idDocToEdit).update({
        Nombre: publicacionForm.elements['NombreEdit'].value,
        Descripcion: publicacionForm.elements['DescripcionEdit'].value,
        Categoria: publicacionForm.elements['CategoriaEdit'].value,
        Propiedades: publicacionForm.elements['PropiedadesEdit'].value,
        PropiedadesTexto: publicacionForm.elements['PropiedadesTextoEdit'].value,
        Agronomia: publicacionForm.elements['AgronomiaEdit'].value,
        Publicante: publicacionForm.elements['PublicanteEdit'].value,
        Provincia: publicacionForm.elements['Provincia'].value,
        Localidad: publicacionForm.elements['Localidad'].value,
        Destacado: publicacionForm.elements['Destacado'].value,
        Oferta: publicacionForm.elements['Oferta'].value,
        Principal: Boolean($('#checkboxPrincipalEdit').val())

    })
        .catch((error) => {
            console.error("Error adding document: ", error);
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-center",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr["error"]("El error puede deberse a un problema de permisos en Firebase con su Usuario.", "Error en la Carga!")
        })
        .then(() => {
            var docToEdit = arrayPublicaciones[arrayPublicaciones.findIndex(item => item.id === idDocToEdit)];
            docToEdit.Nombre = publicacionForm.elements['NombreEdit'].value;
            docToEdit.Descripcion = publicacionForm.elements['DescripcionEdit'].value;
            docToEdit.Categoria = publicacionForm.elements['CategoriaEdit'].value;
            docToEdit.Propiedades = publicacionForm.elements['PropiedadesEdit'].value;
            docToEdit.PropiedadesTexto = publicacionForm.elements['PropiedadesTextoEdit'].value;
            docToEdit.Agronomia = publicacionForm.elements['AgronomiaEdit'].value;
            docToEdit.Publicante = publicacionForm.elements['PublicanteEdit'].value;
            docToEdit.Provincia = publicacionForm.elements['Provincia'].value;
            docToEdit.Localidad = publicacionForm.elements['Localidad'].value;
            docToEdit.Destacado = publicacionForm.elements['Destacado'].value;
            docToEdit.Oferta = publicacionForm.elements['Oferta'].value;
            docToEdit.Principal = Boolean($('#checkboxPrincipalEdit').val());

            var result = arrayPublicaciones.map(a => a.Agronomia);
            var result2 = arrayPublicaciones.map(a => a.Categoria);
            updateTheCharts(doubleArray(result), doubleArray(result2))

            getSearchCat(categoriaSearch);

            setTimeout(() => {
                $('#modalLoading').modal('hide');
            }, 2000);
        })
});

// -- AGREGAR Agronomia --
document.getElementById('form-agronomias').addEventListener('submit', handleForm);

document.getElementById('form-agronomias').addEventListener('submit', async (e) => {
    await uploadAgronomia();
})

// Validacion de upload - show loading
async function uploadAgronomia() {
    const archivos1 = document.getElementById('photo-logo');
    return new Promise(resolve => {
        if (fileAgronomia.length == 0) {
            alert('Debe cargar un Logo para la Agronomia!')
        } else {
            $('#modalLoading').modal('show')
            for (let i = 0; i < fileAgronomia.length; i++) {
                console.log(fileAgronomia[i].filename);
                uploadNewAgroImgs(fileAgronomia[i].file)
            }
        }
    })
}

// Guardamos el Logo de la nueva Agronomia
function uploadNewAgroImgs(imageFile) {
    var validar = 0;
    var archivos1 = document.getElementById('photo-logo');

    return new Promise(function (resolve, reject) {

        //Upload file
        var task = storage.ref().child('agronomias-logos/' + imageFile.name + '-' + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)).put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100.0;
                console.log(percentage);
            },
            function error(err) {
                $('#modalLoading').modal('hide')
                console.error("Error adding document: ", err);
                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                toastr["error"]("El error puede deberse a un problema de permisos en Firebase con su Usuario.", "Error en la Carga!")
            },
            function complete() {
                task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    validar++;

                    if (validar == fileAgronomia.length) {
                        console.log('%c Logo subido con exito! Guardando registro... ', ' color: #bada55');
                        // Guardamos el registro con la URL de la imagen ya capturada
                        AddAgronomia(downloadURL);
                    }
                });
            }
        );
    });
}

//Agregar una Nueva Agronomia - Document
async function AddAgronomia(imageUrl) {

    var Nombre = document.getElementById('NombreAgro').value;
    var Descripcion = document.getElementById('DescripcionAgro').value;
    var Logo = imageUrl;
    var Provincia = document.getElementById('select-provincia2').value;
    var Localidad = document.getElementById('select-localidad2').value;

    // Add a new document with a generated id.
    await db.collection("Agronomias").add({
        Nombre,
        Descripcion,
        Logo,
        Provincia,
        Localidad
    })
        .then(docReference => {
            if (docReference) {
                var newAgroToPush = { id: docReference.id, Nombre, Descripcion, Logo, Provincia, Localidad };
                AgronomiasVirtuales.push(newAgroToPush);
                loadAgros(AgronomiasVirtuales);

                //Agregamos la Agronomia como opcion para Asignar una Publicacion a la misma
                var select = document.getElementById("select-agronomia");
                const opt = Nombre;
                var el = document.createElement("option");
                el.text = opt;
                el.value = opt;

                select.add(el);
            } else {
                console.log("No hay referencia a la agronomia");
                $('#modalLoading').modal('hide')
            }
        })
        .then(() => {
            $('#modalLoading').modal('hide')

            console.log('%c Agronomia Registrada ! ', ' color: #bada55');

            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": true,
                "positionClass": "toast-top-center",
                "preventDuplicates": true,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "9000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr["success"]("Los datos se cargaron de forma exitosa!", "Agronomia Guardada!")
            document.getElementById('form-agronomias').reset();
            document.getElementById('cant-agronomias').innerHTML = parseInt(document.getElementById('cant-agronomias').innerHTML) + 1

        })
        .catch((error) => {
            $('#modalLoading').modal('hide')

            console.error("Error adding document: ", error);
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-center",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr["error"]("El error puede deberse a un problema de permisos en Firebase con su Usuario.", "Error en la Carga!")
        });


}

// -- EDITAR Agronomia --

// Carga tarjetas para las Agronomias
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
                    aria-label="Placeholder: 140x140" style="max-height: 200px; max-width: 200px;"
                    src="` + doc.Logo + `" alt="Card image cap" id="img-` + doc.id + `">
            </center>
                <div class="card-body">
                    <h5 class="card-title">`+ doc.Nombre + `</h5>
                    <hr>
                    <p class="card-text">
                    <p><i class="fa fa-map-marker" aria-hidden="true"></i>  `+ doc.Provincia + `, ` + doc.Localidad + `</p>
                    </p>
                    <a class="btn btn-warning text-white" type="button" onclick="editAgronomia('`+ doc.id + `')" >Editar Agronomia</a>
                    <a class="btn btn-danger text-white" type="button" onclick="if(confirm('Quiere eliminar esta Agronomia y sus Publicaciones?')) deleteAgroByID('`+ doc.id + `','` + doc.Nombre + `');">Eliminar Agronomia</a>
                </div>
            </div>
        </div>`

        });
    } else {
        agrosContainer.innerHTML = `<p>No hay Agronomias disponibles en la zona!</p>`;
    }
}

// Delete Agronomia
function deleteAgroByID(agroId, agroNombre) {
    console.warn("ID de Agronomia a borrar: " + agroId);
    var url = document.getElementById('img-' + agroId).src;

    // Borramos el logo
    deleteImg(url)

    // Borramos el documento
    db.collection("Agronomias").doc(agroId).delete()
        .then(() => {
            alert('Agronomia eliminada!')
            document.getElementById('cant-agronomias').innerHTML = parseInt(document.getElementById('cant-agronomias').innerHTML) - 1

        }).catch((error) => {
            alert('Error al borrar la Agronomia!')
            console.error("Error al eliminar el documento! ", error);
        })
        .then(() => {
            AgronomiasVirtuales.splice(AgronomiasVirtuales.findIndex(item => item.Logo === url), 1);
            $("#select-agronomia option[value='" + agroNombre + "']").remove();

            loadAgros(AgronomiasVirtuales);
        })

}

var previousNameAgro;

// Modal Edit Agronomia
async function editAgronomia(agroId) {
    $('#modalAgronomiaEdit').modal('show')
    var agroForm = document.forms['editFormAgro'];
    const object = AgronomiasVirtuales.find(AgronomiasVirtuales => AgronomiasVirtuales.id == agroId);

    previousNameAgro = object.Nombre;

    agroForm.elements['ID'].value = agroId;
    agroForm.elements['Nombre'].value = object.Nombre;
    agroForm.elements['Descripcion'].value = object.Descripcion;

    $('#select-provincia3').val(object.Provincia);
    $('#select-provincia3').selectpicker('refresh');

    await cambiarLocalidadesAgroEdit();

    $('#select-localidad3').val(object.Localidad);
    $('#select-localidad3').selectpicker('refresh');

    $('#select-provincia3').selectpicker('refresh');
    $('#select-localidad3').selectpicker('refresh');


}

// Manejo del Form para Editar una Agronomia - Informacion
document.getElementById('editFormAgro').addEventListener('submit', handleForm);

document.getElementById('editFormAgro').addEventListener('submit', async (e) => {

    $('#modalAgronomiaEdit').modal('hide')
    var agroForm = document.forms['editFormAgro'];

    var agroId = agroForm.elements['ID'].value;

    db.collection("Agronomias").doc(agroId).update({
        Nombre: agroForm.elements['Nombre'].value,
        Descripcion: agroForm.elements['Descripcion'].value,
        Provincia: agroForm.elements['Provincia'].value,
        Localidad: agroForm.elements['Localidad'].value
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-center",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr["error"]("El error puede deberse a un problema de permisos en Firebase con su Usuario.", "Error en la Carga!")

        })
        .then(() => {
            if (agroForm.elements['Nombre'].value !== previousNameAgro) {
                db.collection("Productos").where("Agronomia", "==", previousNameAgro).get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            doc.ref.update({
                                Agronomia: agroForm.elements['Nombre'].value
                            });
                        });
                    })
                    .then(() => {
                        toastr.options = {
                            "closeButton": true,
                            "debug": false,
                            "newestOnTop": true,
                            "progressBar": true,
                            "positionClass": "toast-top-center",
                            "preventDuplicates": true,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "9000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        }
                        toastr["success"]("Los datos se Actualizaron de forma exitosa!", "Datos Guardados!")

                        objIndex = AgronomiasVirtuales.findIndex((obj => obj.id == agroId));

                        $("#select-agronomia option[value='" + AgronomiasVirtuales[objIndex].Nombre + "']").remove();

                        AgronomiasVirtuales[objIndex].Nombre = agroForm.elements['Nombre'].value;
                        AgronomiasVirtuales[objIndex].Descripcion = agroForm.elements['Descripcion'].value;
                        AgronomiasVirtuales[objIndex].Provincia = agroForm.elements['Provincia'].value;
                        AgronomiasVirtuales[objIndex].Localidad = agroForm.elements['Localidad'].value;

                        loadAgros(AgronomiasVirtuales);

                        var select = document.getElementById("select-agronomia");
                        const opt = agroForm.elements['Nombre'].value;
                        var el = document.createElement("option");
                        el.text = opt;
                        el.value = opt;

                        select.add(el);
                    });
            } else {
                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": true,
                    "progressBar": true,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": true,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "9000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                toastr["success"]("Los datos se Actualizaron de forma exitosa!", "Datos Guardados!")

                objIndex = AgronomiasVirtuales.findIndex((obj => obj.id == agroId));

                AgronomiasVirtuales[objIndex].Nombre = agroForm.elements['Nombre'].value;
                AgronomiasVirtuales[objIndex].Descripcion = agroForm.elements['Descripcion'].value;
                AgronomiasVirtuales[objIndex].Provincia = agroForm.elements['Provincia'].value;
                AgronomiasVirtuales[objIndex].Localidad = agroForm.elements['Localidad'].value;

                loadAgros(AgronomiasVirtuales);
            }
        })
})

function doubleArray(array) {
    let a = [],
        b = [],
        arr = [...array], // clone array so we don't change the original when using .sort()
        prev;

    arr.sort();
    for (let element of arr) {
        if (element !== prev) {
            a.push(element);
            b.push(1);
        }
        else ++b[b.length - 1];
        prev = element;
    }

    return [a, b];
}

var tempo;

var colorsCat = [];

var colorsAgros = [];

function updateTheCharts(arrays, arrays2) {

    tempo = arrays;

    console.log('Arrays de Categorias', arrays2);

    colorsCat = [];

    for (let i = 0; i < arrays2[1].length; i++) {
        colorsCat.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }

    colorsAgros = [];

    for (let i = 0; i < arrays[1].length; i++) {
        colorsAgros.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }

    var index = arrays[0].indexOf("");

    if (index !== -1) {
        arrays[0][index] = "Particular";
    }

    myPieChart2.data.datasets[0].data = arrays[1];
    myPieChart2.data.labels = arrays[0]
    myPieChart2.data.datasets[0].backgroundColor = colorsAgros;
    myPieChart2.update()

    myPieChart.data.datasets[0].data = arrays2[1];
    myPieChart.data.labels = arrays2[0]
    myPieChart.data.datasets[0].backgroundColor = colorsCat;
    myPieChart.update()

}