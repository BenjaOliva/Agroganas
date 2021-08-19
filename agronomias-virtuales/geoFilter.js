
// Inicializador

$(function () {
    $('.selectpicker').selectpicker();
});

getAllData();
var datos;
var localidades;

function getAllData() {
    $.ajax({
        url: '../sections/datos.json',
        async: false,
        dataType: 'json',
        success: function (json) {
            datos = json.localidades;
        }
    });
}


function getFilteredByKey(array, key, value, value2, value3) {
    return array.filter(function (e) {
        return e[key] == value && e["provincia"].nombre == value2 && e["localidad_censal"].nombre == value3;
    });
}

function getLocalidades(array, value) {
    return array.filter(function (e) {
        var array_filtrado = {};
        array_filtrado = e["categoria"] == "Localidad simple" && e["provincia"].nombre == value;
        return array_filtrado;
    });
}

async function cambiarLocalidades() {
    var itemSelectorOption = $('#select-localidad option');
    itemSelectorOption.remove();
    var provincia = document.getElementById('select-provincia').value;
    $('#select-localidad').selectpicker('refresh');

    array = await getLocalidades(datos, provincia);

    select = document.getElementById('select-localidad');

    array.forEach(element => {

        optionText = element.nombre;
        optionValue = element.nombre;

        $('#select-localidad').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
    });
    $('#select-localidad').selectpicker('refresh');

}

function removeOptions() {
    document.getElementById('select-localidad').innerHTML = "";
}

cambiarLocalidades();
