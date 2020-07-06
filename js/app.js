var status;
window.addEventListener('message', function (e) {
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
  document.getElementById('reason').innerHTML = e.data[0][10];
  if (e.data[0][10] == 'approved') {
    document.getElementById("status").src = "http://pngimg.com/uploads/approved/approved_PNG49.png";
  }
  else if (e.data[0][10] == 'rejected') {
    document.getElementById("status").src = "https://lh3.googleusercontent.com/proxy/8umepHvrj6qd-RqJwfwNs7wFj8mtiYzdXgYgBH43LZd4dAjXXV2JDhvI-LbVIGX_Mb60E0PXAGB_RplXO3SUgZjo7dgcbBCOywlYvqkm4PZ7e3yJCdwhiyAHiRBVotOWqNJ5IUoQ9bycCVoBN_uzvRLMEbOAEPA";
  }
  else {
    document.getElementById("status").src = "https://raw.githubusercontent.com/harpercham/status/master/images/pending.png";
  }
}, false);

