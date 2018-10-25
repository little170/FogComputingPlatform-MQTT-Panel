import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish

host = '140.114.79.61'
# The callback for when the client receives a CONNACK response from the server.
print 'Object Detection Demo'

def on_connect(client, userdata, flags, rc):
  print "Connected with result code "+str(rc)
# Subscribing in on_connect() means that if we lose the connection and
# reconnect then subscriptions will be renewed.
  client.subscribe('yolo-result-server')
  client.subscribe('yolo-result-pc1')
# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
  print 'Loading Image...'
  PATH = '/home/master/FogComputingPlatform-MQTT-Panel/public/images/'

  if msg.topic == 'yolo-result-server':
     f = open(PATH+'result_server.jpg','w')
     f.write(msg.payload)
     f.close()
     publish.single("iot/deploy",'{"device":"server","stage":"finish"}' ,qos=1,hostname=host)
     publish.single("iot-1/d/1/evt/yolo",'{"d":{"value":"Complete","device":"server"}}',qos=1,hostname=host)
     print 'panel receive server image'

  if msg.topic == 'yolo-result-pc1':
     f = open(PATH+'result.jpg','w')
     f.write(msg.payload)
     f.close()
     publish.single("iot/deploy",'{"device":"pc1","stage":"finish"}' ,qos=1,hostname=host)
     publish.single("iot-1/d/1/evt/yolo",'{"d":{"value":"Complete","device":"pc1"}}',qos=1,hostname=host)
     print 'panel receive pc image'

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(host, 1883, 60)
# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()
