export default function mobileShare(link, topic, more, file) {
  // is Web Share API supported?

  fetch(file)
    .then(function (response) {
      return response.blob();
    })
    .then(function (blob) {
      var file = new File([blob], "product.jpg", { type: "image/jpeg" });
      var filesArray = [file];

      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        // share page information
        navigator.share({
          files: filesArray,
          url: link,
          title: topic,
          text: more,
        });
      } else {
        // alert error
        signal("Not supported");
      }
    });
}
