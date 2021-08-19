var filesPublicacion = [];
var fileAgronomia = [];

$(function () {
    // First register any plugins
    $.fn.filepond.registerPlugin(FilePondPluginImagePreview);
    $.fn.filepond.registerPlugin(FilePondPluginFileValidateType);

    // Pond de Add Publicacion
    $('.my-pond').filepond();
    $('.my-pond').filepond('allowImagePreview', true);

    $('.my-pond').filepond('imagePreviewMaxHeight', 82);

    // Set allowMultiple property to true
    $('.my-pond').filepond('allowMultiple', true);

    $('.my-pond').filepond({allowFileTypeValidation: true});
    $('.my-pond').filepond({acceptedFileTypes: ['image/*']});

    $('.my-pond').on('FilePond:addfile', function (e) {
        filesPublicacion = $('.my-pond').filepond('getFiles');
    });

    // Pond de Add Agronomia
    $('.my-pond2').filepond();
    $('.my-pond2').filepond('allowImagePreview', true);

    $('.my-pond2').filepond('imagePreviewMaxHeight', 82);

    $('.my-pond2').filepond({allowFileTypeValidation: true});
    $('.my-pond2').filepond({acceptedFileTypes: ['image/*']});



    // Set allowMultiple property to true
    $('.my-pond2').filepond('allowMultiple', false);

    $('.my-pond2').on('FilePond:addfile', function (e) {
        fileAgronomia = $('.my-pond2').filepond('getFiles');
    });

});