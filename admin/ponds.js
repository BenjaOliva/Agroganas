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

    $('.my-pond').filepond('allowFileTypeValidation', true);
    $('.my-pond').filepond({acceptedFileTypes: ['image/*']});

    $('.my-pond').filepond('labelIdle', 'Arrastre las iamgenes o <span class="filepond--label-action"> Busquelas aqui </span>');

    // Set allowMultiple property to true
    $('.my-pond').filepond('allowMultiple', true);
    
    $('.my-pond').on('FilePond:addfile', function (e) {
        filesPublicacion = $('.my-pond').filepond('getFiles');
    });

    // Pond de Add Agronomia
    $('.my-pond2').filepond();
    $('.my-pond2').filepond('allowImagePreview', true);

    $('.my-pond2').filepond('imagePreviewMaxHeight', 82);

    $('.my-pond2').filepond('allowFileTypeValidation', true);
    $('.my-pond2').filepond({acceptedFileTypes: ['image/*']});
    $('.my-pond2').filepond('labelIdle', 'Arrastre el Logo o <span class="filepond--label-action"> Busquelo aqui </span>');
    // Set allowMultiple property to true
    $('.my-pond2').filepond('allowMultiple', false);

    $('.my-pond2').on('FilePond:addfile', function (e) {
        fileAgronomia = $('.my-pond2').filepond('getFiles');
    });

    //Pond imagenes Edit Publicacion
    $('.my-pond-edit').filepond();
    $('.my-pond-edit').filepond('allowImagePreview', true);

    $('.my-pond-edit').filepond('imagePreviewMaxHeight', 82);

    $('.my-pond-edit').filepond('allowFileTypeValidation', true);
    $('.my-pond-edit').filepond('dropValidation', true);
    $('.my-pond-edit').filepond({acceptedFileTypes: ['image/*']});
    $('.my-pond-edit').filepond('labelIdle', 'Arrastre las iamgenes o <span class="filepond--label-action"> Busquelas aqui </span>');
    $('.my-pond-edit').filepond('allowMultiple', true);

    $('.my-pond-edit').on('FilePond:addfile', function (e) {
        filesPublicacion = $('.my-pond-edit').filepond('getFiles');
    });

});