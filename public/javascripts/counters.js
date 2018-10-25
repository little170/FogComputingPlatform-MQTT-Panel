var flag = false;
var counter_edge, counter_server;
function timestart(){
     /*
     if (flag == true){
       delete startTime;
       var startTime;
       flag = false;
     }
     */
     console.log("counter: start")
       startTime = Date.now();

       counter_edge = setInterval(function() {
           var elapsedTime = Date.now() - startTime;
           var latency = (elapsedTime / 1000).toFixed(3);
           document.getElementById("edge-latency").innerHTML = "Latency: "+latency+" s";
     }, 100);
       counter_server = setInterval(function() {
           var elapsedTime = Date.now() - startTime;
           var latency = (elapsedTime / 1000).toFixed(3);
           document.getElementById("cloud-latency").innerHTML = "Latency: "+latency+" s";
     }, 100);
   }


client.subscribe("iot/deploy")

var d = 0;
client.on("message", function (topic, payload) {
    var msg = JSON.parse(payload);
    if (msg.stage == "finish"){
       if (msg.device == "pc1"){
          clearInterval(counter_edge);
	  d = d + 1;
       }
       else if (msg.device == "server"){
          clearInterval(counter_server);
	  d = d + 1;
       }
       console.log('get message: '+payload);
       if (d == 2){
          flag = true;
       }
    //client.end()
    }
  })

