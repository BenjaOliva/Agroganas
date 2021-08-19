
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
        array_filtrado = e["provincia"].nombre == value;
        return array_filtrado;
    });
}

async function cambiarLocalidades() {
    var itemSelectorOption = $('#select-localidad option');
    itemSelectorOption.remove();
    var provincia = document.getElementById('select-provincia').value;

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

async function cambiarLocalidadesAgro() {
    var itemSelectorOption = $('#select-localidad2 option');
    itemSelectorOption.remove();
    var provincia = document.getElementById('select-provincia2').value;

    array = await getLocalidades(datos, provincia);

    select = document.getElementById('select-localidad2');

    array.forEach(element => {

        optionText = element.nombre;
        optionValue = element.nombre;

        $('#select-localidad2').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
    });
    $('#select-localidad2').selectpicker('refresh');

}

async function cambiarLocalidadesAgroEdit() {
    var itemSelectorOption = $('#select-localidad3 option');
    itemSelectorOption.remove();
    var provincia = document.getElementById('select-provincia3').value;

    array = await getLocalidades(datos, provincia);

    select = document.getElementById('select-localidad3');

    array.forEach(element => {

        optionText = element.nombre;
        optionValue = element.nombre;

        $('#select-localidad3').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
    });
    $('#select-localidad3').selectpicker('refresh');

}

cambiarLocalidades();
cambiarLocalidadesAgro();
cambiarLocalidadesAgroEdit();
