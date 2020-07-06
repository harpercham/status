var wrapper = document.getElementById("signature-pad");
var clearButton = wrapper.querySelector("[data-action=clear]");
var canvas = wrapper.querySelector("canvas");
var signaturePad = new SignaturePad(canvas, {
  // It's Necessary to use an opaque color when saving image as JPEG;
  // this option can be omitted if only saving as PNG or SVG
  backgroundColor: 'rgb(255, 255, 255)'
});

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
  // When zoomed out to less than 100%, for some very strange reason,
  // some browsers report devicePixelRatio as less than 1
  // and only part of the canvas is cleared then.
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);

  // This part causes the canvas to be cleared
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);

  // This library does not listen for canvas changes, so after the canvas is automatically
  // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
  // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
  // that the state of this library is consistent with visual state of the canvas, you
  // have to clear it manually.
  signaturePad.clear();
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
  if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
    window.open(dataURL);
  } else {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }
}

// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});


function genPDF(){
var img = new Image()
img.src =  'https://raw.githubusercontent.com/harpercham/status/master/images/Form-%20Leave%20Form.png'
 var doc = new jsPDF()
 doc.addImage(img, 'png', 0,0 , 210, 297);
 doc.setFontSize(10);
 doc.text(document.getElementById('name').innerHTML+'  ( '+document.getElementById('wp').innerHTML+' )', 60, 45);
 doc.text(document.getElementById('date').innerHTML, 158, 59);
 doc.text(document.getElementById('from').innerHTML, 80, 92);
 doc.text(document.getElementById('to').innerHTML, 145, 92);
 doc.text(document.getElementById('reason').innerHTML, 60, 104);
 doc.text(document.getElementById('phon').innerHTML, 60, 124);
 doc.setFontSize(6);

 doc.save('leave form-'+document.getElementById('name').innerHTML)

}




var status;
	window.addEventListener('message', function(e) {	
		var origin = e.origin;
			//if(origin !== 'https://scriptverse.academy')
				//return;
			document.getElementById('name').innerHTML = e.data[0][0];
			document.getElementById('wp').innerHTML = e.data[0][1];
			document.getElementById('pos').innerHTML = e.data[0][2];
			document.getElementById('phon').innerHTML = e.data[0][3];
			document.getElementById('date').innerHTML = e.data[0][4];
			document.getElementById('type').innerHTML = e.data[0][5];
			document.getElementById('from').innerHTML = e.data[0][6];
			document.getElementById('to').innerHTML = e.data[0][7];
			document.getElementById('reason').innerHTML = e.data[0][8];
			if(e.data[0][9]=='approved'){ 
				document.getElementById("status").src ="http://pngimg.com/uploads/approved/approved_PNG49.png";
				status=1}
			else{document.getElementById("status").src ="https://raw.githubusercontent.com/harpercham/status/master/images/pending.png";
				status=0}
		}, false);
		function download() {
		if(status==1){return genPDF()}
		else{alert('Your leave application is still pending. Please wait patiently and you could only download the form after getting approval.')}
}

