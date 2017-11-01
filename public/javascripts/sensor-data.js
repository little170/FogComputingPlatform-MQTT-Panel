var mq5 = new Array();
var mq7 = new Array();
var mq131 = new Array();
var mq135 = new Array();
var headCount = new Array();
var socket = io.connect();
//var socket = io.connect('http://localhost:5000');
    socket.on('connect', function () {
        socket.on('mqtt', function (msg) {
            // iot-1/d/b827ebdf52bd/evt/pollution_air_mq135/json
            var message = msg.topic.split('/');

            var sensor = message[4];

            console.log('message: '+message);
            console.log('sensor: '+sensor);
            //console.log(String.fromCharCode.apply(null, new Uint8Array(msg.payload)));

            var payload = String.fromCharCode.apply(null, new Uint8Array(msg.payload));


            var timestamp = Math.round((new Date()).getTime() / 1000);

            $('#topic').html(msg.topic);
            $('#message').html(msg.topic + ', ' + payload);
            var obj = JSON.parse(payload);
            payload = obj.d.value;
            console.log('payload: '+payload);

            switch (sensor) {

                case 'audio':
                    $('#audio_result').html('(Sound: ' + payload + ')');

                    $('#sound').text(payload);
                    $('#sound').removeClass('label-danger').addClass('label-success');

                    break;

                case 'yolo':
                    $('#yolo_result').html('(Object: ' + payload + ')');

                    $('#object').text(payload);
                    $('#object').removeClass('label-danger').addClass('label-success');

                    break;

                case 'motion':

                    $('#pir_value').html('(Sense value: ' + payload + ')');
                    console.log("which"+message[2])
                    if (payload == '0') {
                      switch (message[2]){
                        case '0242ac100302':
                          $('#pir3').text('Nothing');
                          $('#pir3').removeClass('label-danger').addClass('label-success');
                          break;
                        case '0242ac101202':
                          $('#pir2').text('Nothing');
                          $('#pir2').removeClass('label-danger').addClass('label-success');
                          break;
                        case '0242ac106002':
                          $('#pir1').text('Nothing');
                          $('#pir1').removeClass('label-danger').addClass('label-success');
                          break;
                      }
                    } else {
                      switch (message[2]){
                        case '0242ac100302':
                          $('#pir3').text('Motion detected');
                          $('#pir3').removeClass('label-success').addClass('label-danger');
                          break;
                        case '0242ac101202':
                          $('#pir2').text('Motion detected');
                          $('#pir2').removeClass('label-success').addClass('label-danger');
                          break;
                        case '0242ac106002':
                          $('#pir1').text('Motion detected');
                          $('#pir1').removeClass('label-success').addClass('label-danger');
                          break;
                        }
                    }
                    break;

                case 'pollution_air_mq5':
                    var mq5_value = (parseFloat(payload))+"";
                    $('#mq5Sensor').html('(Sensor value: ' + mq5_value + ')');
                    $('#mq5Label').text(mq5_value);
                    $('#mq5Label').removeClass('').addClass('label-default');

                    var entry = new Array();
                    entry.push(timestamp);
                    entry.push(parseFloat(payload));
                    mq5.push(entry);
                    // Show only 20 values
                    if (mq5.length >= 20) {
                        mq5.shift()
                    }

                    var mq5Plot = $.jqplot ('mq5Chart', [mq5], {
                        axesDefaults: {
                            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                            tickOptions: {
                                showMark: false,
                                showGridline: false,
                                show: false,
                                showLabel: false,
                            }
                          },
                        grid: {
                            gridLineColor: '#FFFFFF',
                            borderWidth: 0,
                            shadow: false,
                        },
                        seriesDefaults: {
                            rendererOptions: {
                                smooth: true
                            },
                            showMarker: false,
                            lineWidth: 2,
                          },
                          axes: {
                            xaxis: {
                              renderer:$.jqplot.DateAxisRenderer,
                              tickOptions:{
                                formatString:'%T'
                              },
                              pad: 0
                            },
                            yaxis: {
                                tickOptions:{
                                    formatString: '%.1f'
                                }
                            }
                        }
                    });
                    break;

                case 'pollution_air_mq7':
                    var mq7_value = (parseFloat(payload))+"";
                    $('#mq7Sensor').html('(Sensor value: ' + mq7_value + ')');
                    $('#mq7Label').text(mq7_value);
                    $('#mq7Label').removeClass('').addClass('label-default');

                    var entry = new Array();
                    entry.push(timestamp);
                    entry.push(parseFloat(payload));
                    mq7.push(entry);
                    // Show only 20 values
                    if (mq7.length >= 20) {
                        mq7.shift()
                    }

                    var mq7Plot = $.jqplot ('mq7Chart', [mq7], {
                        axesDefaults: {
                            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                            tickOptions: {
                                showMark: false,
                                showGridline: false,
                                show: false,
                                showLabel: false,
                            }
                          },
                        grid: {
                            gridLineColor: '#FFFFFF',
                            borderWidth: 0,
                            shadow: false,
                        },
                        seriesDefaults: {
                            rendererOptions: {
                                smooth: true
                            },
                            showMarker: false,
                            lineWidth: 2,
                          },
                          axes: {
                            xaxis: {
                              renderer:$.jqplot.DateAxisRenderer,
                              tickOptions:{
                                formatString:'%T'
                              },
                              pad: 0
                            },
                            yaxis: {
                                tickOptions:{
                                    formatString: '%.1f'
                                }
                            }
                        }
                    });
                    break;

                case 'pollution_air_mq131':
                        var mq131_value = (parseFloat(payload))+"";
                        $('#mq131Sensor').html('(Sensor value: ' + mq131_value + ')');
                        $('#mq131Label').text(mq131_value);
                        $('#mq131Label').removeClass('').addClass('label-default');

                        var entry = new Array();
                        entry.push(timestamp);
                        entry.push(parseFloat(payload));
                        mq131.push(entry);
                        // Show only 20 values
                        if (mq131.length >= 20) {
                            mq131.shift()
                        }

                        var mq131Plot = $.jqplot ('mq131Chart', [mq131], {
                            axesDefaults: {
                                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                                tickOptions: {
                                    showMark: false,
                                    showGridline: false,
                                    show: false,
                                    showLabel: false,
                                }
                              },
                            grid: {
                                gridLineColor: '#FFFFFF',
                                borderWidth: 0,
                                shadow: false,
                            },
                            seriesDefaults: {
                                rendererOptions: {
                                    smooth: true
                                },
                                showMarker: false,
                                lineWidth: 2,
                              },
                              axes: {
                                xaxis: {
                                  renderer:$.jqplot.DateAxisRenderer,
                                  tickOptions:{
                                    formatString:'%T'
                                  },
                                  pad: 0
                                },
                                yaxis: {
                                    tickOptions:{
                                        formatString: '%.1f'
                                    }
                                }
                            }
                        });
                        break;

                case 'pollution_air_mq135':
                        var mq135_value = (parseFloat(payload))+"";
                        $('#mq135Sensor').html('(Sensor value: ' + mq135_value + ')');
                        $('#mq135Label').text(mq135_value);
                        $('#mq135Label').removeClass('').addClass('label-default');

                        var entry = new Array();
                        entry.push(timestamp);
                        entry.push(parseFloat(payload));
                        mq135.push(entry);
                        // Show only 20 values
                        if (mq135.length >= 20) {
                            mq135.shift()
                        }

                        var mq135Plot = $.jqplot ('mq135Chart', [mq135], {
                            axesDefaults: {
                                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                                tickOptions: {
                                    showMark: false,
                                    showGridline: false,
                                    show: false,
                                    showLabel: false,
                                }
                              },
                            grid: {
                                gridLineColor: '#FFFFFF',
                                borderWidth: 0,
                                shadow: false,
                            },
                            seriesDefaults: {
                                rendererOptions: {
                                    smooth: true
                                },
                                showMarker: false,
                                lineWidth: 2,
                              },
                              axes: {
                                xaxis: {
                                  renderer:$.jqplot.DateAxisRenderer,
                                  tickOptions:{
                                    formatString:'%T'
                                  },
                                  pad: 0
                                },
                                yaxis: {
                                    tickOptions:{
                                        formatString: '%.1f'
                                    }
                                }
                            }
                        });
                        break;

                default: console.log('Error: Data do not match the MQTT topic.'); break;
            }
 });
 socket.emit('subscribe', {topic : 'iot-1/d/+/evt/#'});
});