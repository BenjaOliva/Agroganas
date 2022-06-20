var fireBase = fireBase || firebase;
var hasInit = false;

//  Array donde guardamos la info traida de forma local para manejar
var arrayToFilter;

var imgThums = document.getElementById("imgThums");
var imgSrcs = document.getElementById("imgSrcs");

const videoPlayer = document.getElementById("videoPlayer");
const prevVideo = document.getElementById("prevVideo");
const nextVideo = document.getElementById("nextVideo");

const productsContainer = document.getElementById("products-container");

$("#search-form").attr("hidden", true);

var config = {
  apiKey: "AIzaSyAO_RshYbaZtasQ9kYu--iiu5aWkP4gVsg",
  authDomain: "agroganas-5e529.firebaseapp.com",
  databaseURL: "https://agroganas-5e529.firebaseio.com",
  projectId: "agroganas-5e529",
  storageBucket: "agroganas-5e529.appspot.com",
  messagingSenderId: "776362086696",
  appId: "1:776362086696:web:d541b304ece51d46b0001d",
};
if (!hasInit) {
  firebase.initializeApp(config);
  hasInit = true;
  // Get a reference to the database service
  var database = firebase.firestore();
}

var url_string = window.location.href;
var currentUrl = new URL(url_string);
var categoria = currentUrl.searchParams.get("cat");
var productIdDetails = currentUrl.searchParams.get("id");

if (typeof categoria === "undefined") {
  var categoria = "No recibido";
}

const db = firebase.firestore();

switch (categoria) {
  case "Agroinsumos":
    $("#first-title").html("Insumos Agricolas");
    break;
  case "AgriculturaPresicion":
    $("#first-title").html("Agricultura de Presición");
    break;
  case "Tanques":
    $("#first-title").html("Tanques");
    break;
  case "Maquinaria":
    $("#first-title").html("Maquinaria");
    break;
  case "CamposInmuebles":
    $("#first-title").html("Campos e Inmuebles");
    break;
  case "Forrajes":
    $("#first-title").html("Forrajes");
    break;
  default:
    $("#first-title").html(categoria);
    break;
}

const getProducts = () =>
  db.collection("Productos").where("Categoria", "==", categoria).get();

function setPropiedades(PropiedadesRecibidas, PropiedadesText) {
  if (PropiedadesRecibidas != "") {
    let result = PropiedadesRecibidas.split(",").join("<br>");
    return (
      `<pre class="card-text" >
              <h5></h5>` +
      result +
      `<br></pre>`
    );
  } else {
    if (PropiedadesText != "") {
      let result = PropiedadesText.split(".").join("<br>");
      return (
        `<pre class="card-text">
  <h5></h5>` +
        result +
        `<br></pre>`
      );
    } else return "";
  }
}

function Publicante(dataSet, dataAgro) {
  if (dataSet == "") {
    return (
      '<a href="../agronomias-virtuales/profile.html?agr=' +
      dataAgro +
      '" type="button" class="btn btn-sm btn-outline-dark"> Ver más de ' +
      dataAgro +
      " </a>"
    );
  } else {
    return "<b> Anunciante: " + dataSet + "</b>";
  }
}

function loadProducts(array) {
  productsContainer.innerHTML = "";

  const getAnunciante = (vendedor, agronomia) => {
    if (Boolean(vendedor)) {
      return vendedor;
    } else {
      return agronomia;
    }
  };

  if (array.length > 0) {
    array.forEach((doc) => {
      if (doc.Destacado != "false") {
        var Destac = '<span class="badge badge-danger"> Destacado </span>';
      } else {
        var Destac = "";
      }

      if (doc.Oferta != "false") {
        var Ofer =
          '<span class="badge badge-danger" style="left: revert; right: 10px;"> OFERTA </span>';
      } else {
        var Ofer = "";
      }

      productsContainer.innerHTML +=
        `<article id="` +
        doc.id +
        `" class="card card-product-list" style="margin-bottom: 3vh;">
    <div class="row" style="padding: 1%">
        <aside class="col-md-3">
        <br>
        <hr>
        <center>
        ` +
        Publicante(doc.Publicante, doc.Agronomia) +
        `
          </center>
            <div class="">
                ${Destac}
                ${Ofer}
                <center>
                <img onclick="OpenInNewTabWinBrowser('${
                  doc.Imagen
                }')" id="imageresource" style="margin-top: 31px;" src="${
          doc.Imagen
        }" class="img-fluid" alt="Responsive image">
                <button type="button" hidden onclick="modalMedia('${
                  doc.id
                }')" class="btn btn-primary" data-toggle="modal" data-target="#imgModal">
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
                <p><i class="fa fa-map-marker" aria-hidden="true"></i>  ` +
        doc.Provincia +
        `, ` +
        doc.Localidad +
        `</p>
            </div> <!-- info-main.// -->
        </div> <!-- col.// -->
        <aside class="col-sm-3">
            <div class="info-aside">
                <div class="price-wrap">
    
                </div> <!-- info-price-detail // -->
                <!-- <p class="text-success">Disponible</p> -->
                <br>
                <p>
                <a href="producto.html?id=${
                  doc.id
                }" class="btn btn-primary btn-block">Ver Detalles</a>
                <a target="_blank" href="https://form.jotform.com/210891397728670?productoA=${
                  doc.Nombre
                }&anunciante=${getAnunciante(
          doc.Publicante,
          doc.Agronomia
        )}" class="btn btn-success btn-block">Consultar</a>
                </p>
            </div> <!-- info-aside.// -->
        </aside> <!-- col.// -->
    </div> <!-- row.// -->
    </article> <!-- card-product .// -->`;
    });
  } else {
    productsContainer.innerHTML = `<center><p>No hay Publicaciones disponibles en la zona!</p></center>`;
  }
}

window.addEventListener("DOMContentLoaded", async (e) => {
  const querySnapshot = await getProducts();

  // Guardamos los datosen un array local para poder filtrar
  arrayToFilter = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  // llamada a la funcion que carga los datos del array
  loadProducts(arrayToFilter);
});

function OpenInNewTabWinBrowser(url) {
  var win = window.open(url, "_blank");
  win.focus();
}

function modalMedia(productId) {
  var docRef = db.collection("Productos").doc(String(productId));

  imgSrcs.innerHTML = "";
  imgThums.innerHTML = "";

  var id = 0;

  docRef
    .get()
    .then((doc) => {
      doc.data().Imagen.forEach((element) => {
        id++;
        if (id == 1) {
          var temp = "tb-active";
          var temp2 = "active";
        } else {
          var temp = "";
          var temp2 = "";
        }

        imgThums.innerHTML +=
          `
            <div id="f` +
          id +
          `" class="tb ` +
          temp +
          `"> <img class="thumbnail-img fit-image"
            src="` +
          element +
          `"> </div>
            `;
        imgSrcs.innerHTML +=
          `
            <fieldset id="f` +
          id +
          `1" class="` +
          temp2 +
          `">
                <div class="product-pic"> <img class="pic0" src="` +
          element +
          `"> </div>
            </fieldset>
            `;
      });

      if (doc.data().Videos != undefined) {
        console.log("Hay video");
      } else {
        console.log("No hay video");
      }

      $(".tb").click(function () {
        $(".tb").removeClass("tb-active");
        $(this).addClass("tb-active");

        //current_fs = $(".active");

        next_fs = $(this).attr("id");
        next_fs = "#" + next_fs + "1";

        $("fieldset").removeClass("active");
        $(next_fs).addClass("active");
      });
    })
    .catch((error) => {
      console.log("Error obteniendo el documento:", error);
    });
}

function getOneProduct(idToSearch) {
  console.log("ID a buscar:" + idToSearch);

  var docRef = db.collection("Productos").doc(String(idToSearch));

  docRef
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        document.title = "Agroganas | " + doc.data().Nombre;
        const getAnunciante = (vendedor, agronomia) => {
          if (Boolean(vendedor)) {
            return vendedor;
          } else {
            return agronomia;
          }
        };

        datosGet = doc.data();
        console.log(datosGet);
        $("#detail-card").attr("hidden", false);
        $("#video-section").attr("hidden", datosGet.Videos?.length === 0);

        document.getElementById("details-first-image").src = datosGet.Imagen[0];
        document
          .getElementById("btnDetailsPhotos")
          .setAttribute("onclick", 'modalMedia("' + productIdDetails + '")');
        $("#btnDetailsPhotos").html(
          datosGet.Videos?.length > 0
            ? "Ver Imagenes y Videos"
            : "Ver más Imagenes"
        );

        var currentVideo = 0;

        $("#controls").attr(
          "hidden",
          datosGet.Videos?.length === 1 || datosGet.Videos === undefined
        );

        if (datosGet.Videos != undefined) {
          document.getElementById("videoPlayer").src =
            "https://youtube.com/embed/" + getId(datosGet.Videos[currentVideo]);
          prevVideo.addEventListener("click", () => {
            console.log(currentVideo);
            if (datosGet.Videos?.length > 1) {
              if (currentVideo > 0) {
                currentVideo--;
                $("#videoPlayer").attr(
                  "src",
                  "https://youtube.com/embed/" +
                    getId(datosGet.Videos[currentVideo])
                );
              }
            }
          });
          nextVideo.addEventListener("click", () => {
            console.log(currentVideo);
            if (datosGet.Videos?.length > 1) {
              if (currentVideo < datosGet.Videos.length - 1) {
                currentVideo++;
                $("#videoPlayer").attr(
                  "src",
                  "https://youtube.com/embed/" +
                    getId(datosGet.Videos[currentVideo])
                );
              }
            }
          });
        } else {
          $("#video-section").attr("hidden", true);
        }

        document.getElementById("section-title").innerHTML =
          "Agroganas · " + datosGet.Categoria;
        document.getElementById("detail-title").innerHTML = datosGet.Nombre;
        document.getElementById("detail-description").innerHTML =
          datosGet.Descripcion;
        document.getElementById("detail-category").innerHTML =
          datosGet.Categoria;
        document.getElementById("detail-publicante").innerHTML =
          datosGet.Publicante;

        document.getElementById("detail-propiedades").innerHTML =
          setPropiedades(datosGet.Propiedades, datosGet.PropiedadesTexto);

        document.getElementById("detail-ubicacion").innerHTML =
          `<p><i class="fa fa-map-marker" aria-hidden="true"></i>  ` +
          datosGet.Provincia +
          `, ` +
          datosGet.Localidad +
          `</p> `;
        document.getElementById("detail-consultar").href =
          "https://form.jotform.com/210891397728670?productoA=" +
          datosGet.Nombre +
          "&anunciante=" +
          getAnunciante(datosGet.Publicante, datosGet.Agronomia);
      } else {
        // doc.data() will be undefined in this case
        console.log("No se encuentra el documento!");
      }
    })
    .catch((error) => {
      console.log("Error obteniendo el documento:", error);
    });
}

function filtrarArray() {
  const provincia = document.getElementById("select-provincia").value;
  const localidad = document.getElementById("select-localidad").value;
  console.log(provincia, localidad);

  var newArray = arrayToFilter.filter(function (el) {
    return el.Provincia == provincia && el.Localidad == localidad;
  });

  loadProducts(newArray);
}

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}
