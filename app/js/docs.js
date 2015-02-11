$(function() {
  var $image = $(".cropper"),
      $dataX = $("#dataX"),
      $dataY = $("#dataY"),
      $dataHeight = $("#dataHeight"),
      $dataWidth = $("#dataWidth"),
      console = window.console || {log:$.noop},
      cropper;

  $image.cropper({
    aspectRatio: 16 / 9,
    // autoCropArea: 1,
    data: {
      x: 420,
      y: 50,
      width: 640,
      height: 360
    },
    preview: ".preview",

    // multiple: true,
    // autoCrop: false,
    // dragCrop: false,
    // dashed: false,
    // modal: false,
    // movable: false,
    // resizable: false,
    // zoomable: false,
    // rotatable: false,
    // checkImageOrigin: false,

    // maxWidth: 480,
    // maxHeight: 270,
    // minWidth: 160,
    // minHeight: 90,

    done: function(data) {
      $dataX.val(data.x);
      $dataY.val(data.y);
      $dataHeight.val(data.height);
      $dataWidth.val(data.width);
    },

    build: function(e) {
      console.log(e.type);
    },

    built: function(e) {
      console.log(e.type);
    },

  });

  cropper = $image.data("cropper");

  $("#zoom").click(function() {
    $image.cropper("zoom", $("#zoomWith").val());
  });

  $("#zoomIn").click(function() {
    $image.cropper("zoom", 0.1);
  });

  $("#zoomOut").click(function() {
    $image.cropper("zoom", -0.1);
  });

  var $inputImage = $("#inputImage");

  if (window.FileReader) {
    $inputImage.change(function() {
      var fileReader = new FileReader(),
          files = this.files,
          file;

      if (!files.length) {
        return;
      }

      file = files[0];

      if (/^image\/\w+$/.test(file.type)) {
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
          $image.cropper("reset", true).cropper("replace", this.result);
          $inputImage.val("");
        };
      } else {
        showMessage("Please choose an image file.");
      }
    });
  } else {
    $inputImage.addClass("hide");
  }

  $("#setAspectRatio").click(function() {
    $image.cropper("setAspectRatio", $("#aspectRatio").val());
  });

  $("#downloadPdf").click(function() {
    var dataURL = $image.cropper("getDataURL", "image/jpeg", 1);
    var doc = new jsPDF('portrait', 'mm', 'a3');
    doc.addImage(dataURL, 'JPEG', 15, 40, 180, 160);
    // Optional - set properties on the document
    doc.setProperties({
      title: 'Around the bay - NAME?',
      subject: 'Helping the Smith Family',
      author: 'James Hall',
      keywords: 'generated, javascript, web 2.0, ajax',
      creator: 'NAME?'
    });
    doc.save('AroundTheBayPoster.pdf');
  });

});
