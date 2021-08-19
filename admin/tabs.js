
// Sidebar - Home
btnHome.addEventListener('click', function () {
    vistaHome();
})

// Sidebar - Publicaciones New
btnPublicacionNew.addEventListener('click', function () {
    vistaPublicaciones("new");
})

// Sidebar - Publicaciones Edit
btnPublicacionEdit.addEventListener('click', function () {
    vistaPublicaciones("edit");
})

// Sidebar - Agronomias New
btnAgronomiasNew.addEventListener('click', function () {
    vistaAgronomias("new");
})

// Sidebar - Agronomias Edit
btnAgronomiasEdit.addEventListener('click', function () {
    vistaAgronomias("edit");
})

/* ==============================================
                    Front stuff
   ============================================== 
*/
$('#btnAdd').click(function () {
    formLoading(1);
});

$('#submitEdit').click(function () {
    formLoading(4);
});

$("#checkboxProps").on('change', function () {
    if ($(this).is(':checked')) {
        $("#Propiedades").tagsinput('removeAll');
        document.getElementById("PropiedadesTexto").value = "";
        $('#Texto').attr('hidden', true);
        $('#Items').attr('hidden', false);

    } else {
        $("#Propiedades").tagsinput('removeAll');
        document.getElementById("PropiedadesTexto").value = "";
        $('#Texto').attr('hidden', false);
        $('#Items').attr('hidden', true);
    }
});

$("#checkbox1").on('change', function () {
    if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
    } else {
        $(this).attr('value', 'false');
    }
});

$("#checkbox2").on('change', function () {
    if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
    } else {
        $(this).attr('value', 'false');
    }
});

$("#Propiedades").on('change', function () {
    console.log($("#Propiedades").val());
})

$("#checkboxPropsEdit").on('change', function () {
    if ($(this).is(':checked')) {
        $("#PropiedadesEdit").tagsinput('removeAll');
        document.getElementById("PropiedadesTextoEdit").value = "";
        $('#TextoEdit').attr('hidden', true);
        $('#ItemsEdit').attr('hidden', false);

    } else {
        $("#PropiedadesEdit").tagsinput('removeAll');
        document.getElementById("PropiedadesTextoEdit").value = "";
        $('#TextoEdit').attr('hidden', false);
        $('#ItemsEdit').attr('hidden', true);
    }
});

$("#checkbox1Edit").on('change', function () {
    if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
    } else {
        $(this).attr('value', 'false');
    }
});

$("#checkbox2Edit").on('change', function () {
    if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
    } else {
        $(this).attr('value', 'false');
    }
});

$("#PropiedadesEdit").on('change', function () {
    // console.log($("#PropiedadesEdit").val());
})

