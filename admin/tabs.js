
// Sidebar - Home
btnHome.addEventListener('click', function () {
    vistaHome();
})

// Sidebar - Slides
btnSlides.addEventListener('click', function () {
    vistaSlides();
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
    $('#modalLoading').modal('show')
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

$("#checkboxPrincipal").on('change', function () {
    if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
    } else {
        $(this).attr('value', '');
    }
});

$("#checkboxPrincipalEdit").on('change', function () {
    if ($(this).is(':checked')) {
        $(this).attr('value', true);
    } else {
        $(this).attr('value', '');
    }
});

$("#PropiedadesEdit").on('change', function () {
    // console.log($("#PropiedadesEdit").val());
})


var timer;
$('#modalLoading').on('show.bs.modal', function (e) {
    timer = setTimeout(() => {

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
            "timeOut": "8500",
            "extendedTimeOut": "2000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        toastr["warning"]("Parece que la operación tardo más de lo usual, verifique se haya concretado la tarea", "Advertencia!")

        $('#modalLoading').modal('hide');
    }, 14500);
})

$('#modalLoading').on('hide.bs.modal', function (e) {
    clearTimeout(timer)
})
