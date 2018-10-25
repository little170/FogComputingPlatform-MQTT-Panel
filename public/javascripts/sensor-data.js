var headCount = new Array();
var socket = io.connect();

function initializeChart(){
 console.log('initializeChart');
}

socket.on('connect', function () {
  socket.on('mqtt', function (msg) {
    var message = msg.topic.split('/');
    var sensor = message[4];

    //console.log('message: '+message);
    //console.log('sensor: '+sensor);
    //console.log(String.fromCharCode.apply(null, new Uint8Array(msg.payload)));

    var payload = String.fromCharCode.apply(null, new Uint8Array(msg.payload));
    var device = String.fromCharCode.apply(null, new Uint8Array(msg.payload));

    $('#topic').html(msg.topic);
    $('#message').html(msg.topic + ', ' + payload);
    var obj = JSON.parse(payload);
    payload = obj.d.value;
    device = obj.d.device;
    console.log('payload: '+payload+ ' device:'+device);

    switch (sensor+"|"+ device) {

      case 'yolo|pc1':
        $('#object_edge').text(payload);
        $('#object_edge').removeClass('label-danger').addClass('label-success');
        if (payload=="NotReady"){
         document.getElementById("edge-ready").style.color="#ff0066";
         document.getElementById("edge-transmission").style.color="#000000";
         document.getElementById("edge-analyze").style.color="#000000";
         document.getElementById("edge-deploy").style.color="#000000";
	}else if(payload=="Transcating"){
         document.getElementById("edge-ready").style.color="#000000";
         document.getElementById("edge-transmission").style.color="#ff0066";
         document.getElementById("edge-analyze").style.color="#000000";
         document.getElementById("edge-deploy").style.color="#000000";
	}else if(payload=="Analyzing"){
         document.getElementById("edge-ready").style.color="#000000";
         document.getElementById("edge-transmission").style.color="#000000";
         document.getElementById("edge-analyze").style.color="#ff0066";
         document.getElementById("edge-deploy").style.color="#000000";
	}else if(payload=="Deploy"){
         document.getElementById("edge-ready").style.color="#000000";
         document.getElementById("edge-transmission").style.color="#000000";
         document.getElementById("edge-analyze").style.color="#000000";
         document.getElementById("edge-deploy").style.color="#ff0066";
	}
        break;

      case 'yolo|server':
        $('#object_server').text(payload);
        $('#object_server').removeClass('label-danger').addClass('label-success');
        if (payload=="NotReady"){
         document.getElementById("cloud-ready").style.color="#ff0066";
         document.getElementById("cloud-transmission").style.color="#000000";
         document.getElementById("cloud-analyze").style.color="#000000";
         document.getElementById("cloud-deploy").style.color="#000000";
	}else if(payload=="Transcating"){
         document.getElementById("cloud-ready").style.color="#000000";
         document.getElementById("cloud-transmission").style.color="#ff0066";
         document.getElementById("cloud-analyze").style.color="#000000";
         document.getElementById("cloud-deploy").style.color="#000000";
	}else if(payload=="Analyzing"){
         document.getElementById("cloud-ready").style.color="#000000";
         document.getElementById("cloud-transmission").style.color="#000000";
         document.getElementById("cloud-analyze").style.color="#ff0066";
         document.getElementById("cloud-deploy").style.color="#000000";
	}else if(payload=="Deploy"){
         document.getElementById("cloud-ready").style.color="#000000";
         document.getElementById("cloud-transmission").style.color="#000000";
         document.getElementById("cloud-analyze").style.color="#000000";
         document.getElementById("cloud-deploy").style.color="#ff0066";
	}

        break;

      default: console.log('Error: Data do not match the MQTT topic.'); break;
    }
  }
);

socket.emit('subscribe', {topic : 'iot-1/d/+/evt/#'});
});

var interval = setInterval(function() {
    $('img').each(function() {
        var time = (new Date()).getTime();
        var oldurl = $(this).prop('src');
        var newurl = oldurl.split("?")[0]+'?'+ new Date().getTime();
        $(this).prop('src', newurl);
    });
}, 2000);

window.onload = function() {
  initializeChart();
};
