$(document).ready(function(){
    $('.btn-question-collapse').click(function(){
        $(this).parent('.post-block').find('#post-content-inner').slideToggle();
        $(this).parent('.post-block').toggleClass('hideEl');
    });
    
    $('.addAnswer').click(function(){
        $('.addAnswerSection').show();
        $('.btn-question-collapse').click();
    });

    $('.notification .bell-icon').click(function(){
        $(this).parent('.notification').toggleClass('activeAlert');
    });

    $('.notification .user-icon').click(function(){
        $(this).parent('.notification').toggleClass('activeAlert');
    });
});

function discardAnswer() {
    $('.addAnswerSection').hide();
}

function navToggle() {
    $('body').toggleClass('activeNav');
}

function initEditor(tergetId) {
    if (tergetId) {
        CKEDITOR.replace(tergetId, {
        customConfig: '/config.js',
    // filebrowserBrowseUrl: 'lib/ckfinder/ckfinder.html',
    // filebrowserImageBrowseUrl: 'lib/ckfinder/ckfinder.html?Type=Images',
    // filebrowserUploadUrl: 'lib/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
    // filebrowserImageUploadUrl: 'lib/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
    // filebrowserBrowseUrl: 'lib/ckeditor/plugins/imagebrowser/browser/browser.html',
    // filebrowserUploadUrl: '/upload_url?Type=File',
    // filebrowserImageUploadUrl: '/upload_url?Type=Image',
    // filebrowserFlashUploadUrl: '/upload_url?Type=Flash',
    // filebrowserWindowWidth : '1000',
    // filebrowserWindowHeight : '700'
});
    }

    // $('#exportHtml').click(function() {
    //     var editorData = CKEDITOR.instances.textEditor.getData();
    //     var filename = 'test',
    //         mimeType = 'text/html';
    //     //$('#preview').html(editorData);
    //     //alert(editorData);
    //     //var elHtml = document.getElementById(elId).innerHTML;
    //     if (navigator.msSaveBlob) { // IE 10+ 
    //         navigator.msSaveBlob(new Blob([editorData], {
    //         type: mimeType + ';charset=utf-8;'
    //         }), filename);
    //     } else {
    //         var link = document.getElementById('fileDownload');
    //         mimeType = mimeType || 'text/plain';
    //         link.setAttribute('download', filename);
    //         link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(editorData));
    //         link.click();
    //     }
    // });
}

function  goBackToEditor() {
    $('.firstView').show();
    $('.secondView').hide();
    return false;
}
function goAdditional() {
    var messageLength =CKEDITOR.instances.textEditor.getData().replace(/<[^>]*>/gi, '').length;
    if ((document.getElementById('questionHeading').value).localeCompare('Type your question')==0 || !document.getElementById('questionHeading').value) {

        $(".errmsg").html('You must provide a question heading.');

        return false;
    }
    else if( !messageLength ) {

        $(".errmsg").html('You must provide the question description.');

        return false;
    }
     
    else{
        $('.questiondesc').html(CKEDITOR.instances.textEditor.getData());
        $('#questionDescription').val(CKEDITOR.instances.textEditor.getData());
        $('.questionhdr').html($('#questionHeading').val());
        $('.firstView').hide();
        $('.secondView').show();
        return false;
    }
}

function autocompleteInit(trgtId, data) {
    $(trgtId).autocomplete({
        source: data,
        select: showLabel
    }); 
}