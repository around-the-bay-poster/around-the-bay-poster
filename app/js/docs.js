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
    var posterTemplateDataURL = getImageDataURL($(".poster-template img")[0])
    var doc = new jsPDF('portrait', 'mm', 'a3');
    doc.addImage(posterTemplateDataURL, 'JPEG', 0, 0, 297, 420);
    doc.addImage(dataURL, 'JPEG', 0, 132, 297, 160);
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

  $("#preview").click(function() {
    var dataURL = $image.cropper("getDataURL", "image/jpeg", 1);
    var posterTemplateDataURL = getImageDataURL($(".poster-template img")[0])
    var doc = new jsPDF('portrait', 'mm', 'a3');
    doc.addImage(posterTemplateDataURL, 'JPEG', 0, 0, 297, 420);
    doc.addImage(dataURL, 'JPEG', 0, 132, 297, 160);
    // Optional - set properties on the document
    doc.setProperties({
      title: 'Around the bay - NAME?',
      subject: 'Helping the Smith Family',
      author: 'James Hall',
      keywords: 'generated, javascript, web 2.0, ajax',
      creator: 'NAME?'
    });
    $(".result-preview iframe").attr('src', doc.output('bloburi'));
    $(".result-preview").show();
    $("#downloadPdf").show();
  });

  mergeImages = function() {
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var resultPreview = $(".result-preview")
    ctx.canvas.width  = resultPreview.width();
    ctx.canvas.height = resultPreview.height();
    var imageObj1 = new Image();
    var imageObj2 = new Image();
    imageObj1.src = "images/individual_poster.jpg"
    imageObj2.src = "images/team_poster.jpg";
    imageObj1.onload = function() {
      ctx.drawImage(imageObj1, 0, 0, 425, 300);
      imageObj2.onload = function() {
        ctx.drawImage(imageObj2, 15, 85, 300, 300);
        var img = c.toDataURL("image/png");
        document.write('<img src="' + img + '" width="328" height="526"/>');
      }
    };
  };
  function getImageDataURL(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Copy the image contents to the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Get the data-URL formatted image
      return dataURL = canvas.toDataURL("image/jpeg");
  };

});
