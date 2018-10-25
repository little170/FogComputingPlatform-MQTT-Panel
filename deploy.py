import os
import json
import paho.mqtt.publish as publish
import paho.mqtt.client as mqtt

host = "140.114.79.61"

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("iot/k8s")

def on_message(client, userdata, msg):
   content = json.loads(msg.payload)
   print content
   deploy_ver = content["deploy"]
   delete_ver = content["delete"]

   # delete pods
   if delete_ver == '0':
       publish.single('iot-1/d/1/evt/deploy', '{"d":{"value":"delete-v0"}}', qos=1, hostname=host)
       publish.single("iot-1/d/1/evt/yolo",'{"d":{"value":"NotReady","device":"server"}}' , qos=1,hostname=host)
       publish.single("iot-1/d/1/evt/yolo",'{"d":{"value":"NotReady","device":"pc1"}}' , qos=1,hostname=host)
       os.system("kubectl delete pods yolo-tf-server")
       os.system("kubectl delete pods yolo-tf-pc1")
   elif delete_ver == '1':
       publish.single('iot-1/d/1/evt/deploy', '{"d":{"value":"delete-v1"}}', qos=1, hostname=host)
       publish.single("iot-1/d/1/evt/yolo",'{"d":{"value":"NotReady","device":"server"}}' , qos=1,hostname=host)
       publish.single("iot-1/d/1/evt/yolo",'{"d":{"value":"NotReady","device":"pc1"}}' , qos=1,hostname=host)
       os.system("kubectl delete pods yolo-kera-server")
       os.system("kubectl delete pods yolo-kera-pc1")
   # deploy pods
   if deploy_ver == '0':
       publish.single("iot-1/d/1/evt/yolo",'{"d":{"value":"NotReady","device":"server"}}' , qos=1,hostname=host)
       publish.single("iot-1/d/1/evt/yolo",'{"d":{"value":"NotReady","device":"pc1"}}' , qos=1,hostname=host)
       os.system("kubectl create -f yolo-tf.yaml")
   elif deploy_ver == '1':
       publish.single("iot-1/d/1/evt/yolo",'{"d":{"value":"NotReady","device":"server"}}' , qos=1,hostname=host)
       publish.single("iot-1/d/1/evt/yolo",'{"d":{"value":"NotReady","device":"pc1"}}' , qos=1,hostname=host)
       os.system("kubectl create -f yolo-kera.yaml")

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(host, 1883, 60)
client.loop_forever()
