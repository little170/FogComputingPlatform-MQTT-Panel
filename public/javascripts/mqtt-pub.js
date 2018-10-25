  //var client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt") // you add a ws:// url here
  var client = mqtt.connect("ws://140.114.79.61:9001/mqtt") // you add a ws:// url here
  var version = 0
  var isdeploy_v1 = false
  var isdeploy_v0 = false

  function start(){
  client.publish("iot/yolo/start",String(version));
  $.post('/test');
  }
  function upgrade(){
  version = 1
  if (isdeploy_v1){
    is_deploy_v1 = true

    $.alert({
    title: 'Alert!',
    content: 'You already have the latest the version.',
    });
  }
  else{
    client.publish("iot/k8s",'{"deploy":"1","delete":"0"}')
    is_deploy_v1 = true
    is_deploy_v0 = false 
  }
}
  function dwgrade(){
  version = 0
  if (isdeploy_v0){
    is_deploy_v0 = true

    $.alert({
    title: 'Alert!',
    content: 'You already have the oldest the version.',
    });
  }
  else{
    client.publish("iot/k8s",'{"deploy":"0","delete":"1"}')
    is_deploy_v0 = true
    is_deploy_v1 = false 
  }
}

  
