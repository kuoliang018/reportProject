(function(){
  var resolutiondata = [];
  var devicedata = [];
  var resolutionMap = {};
  var browserMap = {};    
  var userMap = {};          
  var deviceMap = {};
  var performanceMap = {};
  var errorMap = {};
  var winCount = 0;
  var macCount = 0;
  var list = $('list');
  var err_list = $('error_list');
  function drawLast(){
    var sData = [];
    Object.entries(browserMap).forEach(entry => {
      let key = entry[0];
      let value = entry[1];
      sData.push({
        values : [value],
        text: key,
        backgroundColor: '#50ADF5',
      });
    });
    var myConfig = {
      type: "pie", 
      backgroundColor: "#2B313B",
      plot: {
        borderColor: "#2B313B",
        borderWidth: 5,
        // slice: 90,
        valueBox: {
          placement: 'out',
          text: '%t\n%npv%',
          fontFamily: "Open Sans"
        },
        tooltip:{
          fontSize: '18',
          fontFamily: "Open Sans",
          padding: "5 10",
          text: "%npv%"
        },
        animation:{
          effect: 2, 
          method: 5,
          speed: 500,
          sequence: 1
        }
      },
      source: {
        text: '104.248.70.89:8084',
        fontColor: "#8e99a9",
        fontFamily: "Open Sans"
      },
      title: {
        fontColor: "#fff",
        text: 'Browser Usage',
        align: "left",
        offsetX: 10,
        fontFamily: "Open Sans",
        fontSize: 25
      },
      subtitle: {
        offsetX: 10,
        offsetY: 10,
        fontColor: "#8e99a9",
        fontFamily: "Open Sans",
        fontSize: "16",
        text: 'now',
        align: "left"
      },
      plotarea: {
        margin: "20 0 0 0"  
      },
      series : sData
    };
    
    zingchart.render({ 
      id : 'myChartLast', 
      data : myConfig, 
      height: 500, 
      width: 725 
    });
  }
  /*
  * define marker class to construct
  * markers on the fly easier.
  */
  function Marker(_index,  _plotindex) {
    return {
      type:'line',
      lineColor: (_plotindex == 0) ? '#4CAF50' : '#FFC107',
      lineWidth: 5,
      offsetX: (_plotindex == 0) ? -2 : 2,  //offset markers to prevent overlap
      range:[_index],
    }
  }
  function drawError(){
    var labelData = [];
    var valueData = [];
    Object.entries(errorMap).forEach(entry => {
      let key = entry[0];
      let value = entry[1];
      labelData.push(key);
      valueData.push(parseFloat(value));
    });
    var myConfig = {
      type: "line",
      title:{
        text:"Error chart"
      },
      plot:{
        tooltip:{
          visible:false
        },
        cursor: 'hand'
      },
      scaleX:{
        markers:[],
        labels:labelData
      }, 	
      series : [
        {
          values : valueData
        }
      ]
    };
    
    zingchart.render({ 
      id : 'myChart3', 
      data : myConfig, 
      height: '400', 
      width: '100%' 
    });
    
    
    
    // global array for markers since you can only update the whole array
    var markersArray = [];
    
    // hash table for markers
    var markerHashTable = {};
    markerHashTable['plotindex_0'] = {};
    markerHashTable['plotindex_1'] = {};
    
    /*
    * Register a node_click event and then render a chart with the markers
    */
    zingchart.bind('myChart3','node_click', function(e) {
      //console.log(e)
      
      // check hash table. Add marker
      if (!markerHashTable['plotindex_' + e.plotindex][e.nodeindex]) {
        
        // create a marker
        var newMarker = new Marker(e.nodeindex, e.plotindex);
        
        markerHashTable['plotindex_' + e.plotindex][e.nodeindex] = true;
        markersArray.push(newMarker);
        
        // render the marker
        myConfig.scaleX.markers = markersArray;
        zingchart.exec('myChart3', 'setdata', {
          data: myConfig
        });
      } 
      
    });  
  }
  function drawPerform(){
    
    var labelData = [];
    var valueData = [];
    Object.entries(performanceMap).forEach(entry => {
      let key = entry[0];
      let value = entry[1];
      labelData.push(key);
      valueData.push(parseFloat(value));
    });
    labelData.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return -(new Date(b) - new Date(a));
    });
    for(var i = 0; i < valueData.length; i++){
      valueData[i] = parseFloat(performanceMap[labelData[i]]);
    }
    for(var i = 0; i < valueData.length; i++){   
      labelData[i] = `${new Date(labelData[i]).getMonth() + 1}-${new Date(labelData[i]).getDate() + 1}`;
    }
    var myConfig = {
      type: "line",
      title:{
        text:"Performance chart"
      },
      plot:{
        tooltip:{
          visible:false
        },
        cursor: 'hand'
      },
      scaleX:{
        markers:[],
        labels:labelData
      }, 	
      series : [
        {
          values : valueData
        }
      ]
    };
    
    zingchart.render({ 
      id : 'myChart12', 
      data : myConfig, 
      height: '400', 
      width: '100%' 
    });
    
    
    
    // global array for markers since you can only update the whole array
    var markersArray = [];
    
    // hash table for markers
    var markerHashTable = {};
    markerHashTable['plotindex_0'] = {};
    markerHashTable['plotindex_1'] = {};
    
    /*
    * Register a node_click event and then render a chart with the markers
    */
    zingchart.bind('myChart12','node_click', function(e) {
      //console.log(e)
      
      // check hash table. Add marker
      if (!markerHashTable['plotindex_' + e.plotindex][e.nodeindex]) {
        
        // create a marker
        var newMarker = new Marker(e.nodeindex, e.plotindex);
        
        markerHashTable['plotindex_' + e.plotindex][e.nodeindex] = true;
        markersArray.push(newMarker);
        
        // render the marker
        myConfig.scaleX.markers = markersArray;
        zingchart.exec('myChart12', 'setdata', {
          data: myConfig
        });
      } 
      
    });
  }
  function drawTest(){
    Object.entries(deviceMap).forEach(entry => {
      let key = entry[0];
      let value = entry[1];
      devicedata.push({
        text: key,
        values : [value],
        lineColor: "#9B26AF",
        backgroundColor: "#9B26AF",
        lineWidth: 1,
        marker: {
          backgroundColor: '#9B26AF'
        }});
      });
      
      console.log(devicedata);
      
      var myConfig = {
        backgroundColor:'#FBFCFE',
        type: "ring",
        title: {
          text: "Device types",
          fontFamily: 'Lato',
          fontSize: 14,
          // border: "1px solid black",
          padding: "15",
          fontColor : "#1E5D9E",
        },
        subtitle: {
          text: "right click to download, if you want to share it upload and send email",
          fontFamily: 'Lato',
          fontSize: 12,
          fontColor: "#777",
          padding: "5"
        },
        plot: {
          slice:'50%',
          borderWidth:0,
          backgroundColor:'#FBFCFE',
          animation:{
            effect:2,
            sequence:3
          },
          valueBox: [
            {
              type: 'all',
              text: '%t',
              placement: 'out'
            },
            {
              type: 'all',
              text: '%npv%',
              placement: 'in'
            }
          ]
        },
        tooltip:{
          fontSize:16,
          anchor:'c',
          x:'50%',
          y:'50%',
          sticky:true,
          backgroundColor:'none',
          borderWidth:0,
          thousandsSeparator:',',
          text:'<span style="color:%color">Page Url: %t</span><br><span style="color:%color">Pageviews: %v</span>',
          mediaRules:[
            {
              maxWidth:500,
              y:'54%',
            }
          ]
        },
        plotarea: {
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderRadius: "0 0 0 10",
          margin: "70 0 10 0"
        },
        legend : {
          toggleAction:'remove',
          backgroundColor:'#FBFCFE',
          borderWidth:0,
          adjustLayout:true,
          align:'center',
          verticalAlign:'bottom',
          marker: {
            type:'circle',
            cursor:'pointer',
            borderWidth:0,
            size:5
          },
          item: {
            fontColor: "#777",
            cursor:'pointer',
            offsetX:-6,
            fontSize:12
          },
          mediaRules:[
            {
              maxWidth:500,
              visible:false
            }
          ]
        },
        scaleR:{
          refAngle:270
        },
        series : devicedata
      };
      
      zingchart.render({
        id : 'myChart',
        data: {
          gui:{
            contextMenu:{
              button:{
                visible: true,
                lineColor: "#2D66A4",
                backgroundColor: "#2D66A4"
              },
              gear: {
                alpha: 1,
                backgroundColor: "#2D66A4"
              },
              position: "right",
              backgroundColor:"#306EAA", /*sets background for entire contextMenu*/
              docked: true,
              item:{
                backgroundColor:"#306EAA",
                borderColor:"#306EAA",
                borderWidth: 0,
                fontFamily: "Lato",
                color:"#fff"
              }
              
            },
          },
          graphset: [myConfig]
        },
        height: '499',
        width: '99%'
      });
    }
    
    function buildResolution(value, key, map){
      resolutiondata.push({
        text: key,
        values : [value],
        lineColor: "#9B26AF",
        backgroundColor: "#9B26AF",
        lineWidth: 1,
        marker: {
          backgroundColor: '#9B26AF'
        }});
      }
      function drawResolution(){
        
        Object.entries(resolutionMap).forEach(entry => {
          let key = entry[0];
          let value = entry[1];
          resolutiondata.push({
            text: key,
            values : [value],
            lineColor: "#9B26AF",
            backgroundColor: "#9B26AF",
            lineWidth: 1,
            marker: {
              backgroundColor: '#9B26AF'
            }});
          });
          
          console.log(resolutiondata);
          var myConfig = {
            backgroundColor:'#FBFCFE',
            type: "ring",
            title: {
              text: "screen size",
              fontFamily: 'Lato',
              fontSize: 14,
              // border: "1px solid black",
              padding: "15",
              fontColor : "#1E5D9E",
            },
            subtitle: {
              text: "see upper right",
              fontFamily: 'Lato',
              fontSize: 12,
              fontColor: "#777",
              padding: "5"
            },
            plot: {
              slice:'50%',
              borderWidth:0,
              backgroundColor:'#FBFCFE',
              animation:{
                effect:2,
                sequence:3
              },
              valueBox: [
                {
                  type: 'all',
                  text: '%t',
                  placement: 'out'
                },
                {
                  type: 'all',
                  text: '%npv%',
                  placement: 'in'
                }
              ]
            },
            tooltip:{
              fontSize:16,
              anchor:'c',
              x:'50%',
              y:'50%',
              sticky:true,
              backgroundColor:'none',
              borderWidth:0,
              thousandsSeparator:',',
              text:'<span style="color:%color">Page Url: %t</span><br><span style="color:%color">Pageviews: %v</span>',
              mediaRules:[
                {
                  maxWidth:500,
                  y:'54%',
                }
              ]
            },
            plotarea: {
              backgroundColor: 'transparent',
              borderWidth: 0,
              borderRadius: "0 0 0 10",
              margin: "70 0 10 0"
            },
            legend : {
              toggleAction:'remove',
              backgroundColor:'#FBFCFE',
              borderWidth:0,
              adjustLayout:true,
              align:'center',
              verticalAlign:'bottom',
              marker: {
                type:'circle',
                cursor:'pointer',
                borderWidth:0,
                size:5
              },
              item: {
                fontColor: "#777",
                cursor:'pointer',
                offsetX:-6,
                fontSize:12
              },
              mediaRules:[
                {
                  maxWidth:500,
                  visible:false
                }
              ]
            },
            scaleR:{
              refAngle:270
            },
            series : resolutiondata
          };
          
          zingchart.render({
            id : 'myChart1',
            data: {
              gui:{
                contextMenu:{
                  button:{
                    visible: true,
                    lineColor: "#2D66A4",
                    backgroundColor: "#2D66A4"
                  },
                  gear: {
                    alpha: 1,
                    backgroundColor: "#2D66A4"
                  },
                  position: "right",
                  backgroundColor:"#306EAA", /*sets background for entire contextMenu*/
                  docked: true,
                  item:{
                    backgroundColor:"#306EAA",
                    borderColor:"#306EAA",
                    borderWidth: 0,
                    fontFamily: "Lato",
                    color:"#fff"
                  }
                  
                },
              },
              graphset: [myConfig]
            },
            height: '499',
            width: '99%'
          });
        }
        //drawTest();
        function drawBar(){
          var labelData = [];
          var seriesData = [];
          var indexData = [];
          var interactiveData = [];
          var slowData = [];
          var errorD = [];
          var randomData = [];  
          Object.entries(userMap).forEach(entry => {
            let key = entry[0];
            let value = entry[1];                                                                              
            labelData.push(key.substring(0,5));
            
          });                                                                                                                 
          Object.entries(userMap).forEach(entry => {
            let key = entry[0];
            let value = entry[1];                                                                              
            indexData.push(entry[1]['index']);
            
          });     
          console.log(indexData);
          Object.entries(userMap).forEach(entry => {
            let key = entry[0];
            let value = entry[1];                                                                              
            slowData.push(entry[1]['slow']);
            
          }); 
          Object.entries(userMap).forEach(entry => {
            let key = entry[0];
            let value = entry[1];                                                                              
            errorD.push(entry[1]['error']);
            
          }); 
          Object.entries(userMap).forEach(entry => {
            let key = entry[0];
            let value = entry[1];                                                                              
            randomData.push(entry[1]['random']);
            
          }); 
          Object.entries(userMap).forEach(entry => {
            let key = entry[0];
            let value = entry[1];                                                                              
            interactiveData.push(entry[1]['interactive']);
            
          }); 
          seriesData = [
            {
              "values": indexData,
              "alpha": 0.95,
              "borderRadiusTopLeft": 7,
              "background-color": "#8993c7",
              "text": "index page hitted"
            },
            {
              "values": randomData,
              "borderRadiusTopLeft": 7,
              "alpha": 0.95,
              "background-color": "#fdb462",
              "text": "error page hitted"
            },
            {
              "values": slowData,
              "alpha": 0.95,
              "borderRadiusTopLeft": 7,
              "background-color": "#8dd3c7",
              "text": "slow page hitted"
            },
            {
              "values": interactiveData,
              "borderRadiusTopLeft": 7,
              "alpha": 0.95,
              "background-color": "#fb8072",
              "text": "interactive page hitted"
            },
            {
              "values": errorD,
              "borderRadiusTopLeft": 7,
              "alpha": 0.95,
              "background-color": "#80b1d3",
              "text": "random page hitted"
            },
            
          ];
          zingchart.THEME="classic";
          var myConfig = {
            "graphset": [
              {
                "type": "bar",
                "background-color": "white",
                "title": {
                  "text": "user behavior analysis",
                  "font-color": "#7E7E7E",
                  "backgroundColor": "none",
                  "font-size": "22px",
                  "alpha": 1,
                  "y": "15px",
                  "x": "15px"
                },
                "tooltip": {
                  "text": "#%v times"
                },
                "plotarea": {
                  "margin": "80 60 100 60",
                  "y": "125px"
                },
                "legend": {
                  "layout": "x3",
                  "y": "13%",
                  "x": "34.5%",
                  "overflow": "page",
                  "alpha": 0.05,
                  "shadow": false,
                  "marker": {
                    "type": "circle",
                    "border-color": "none",
                    "size": "10px"
                  },
                  "border-width": 0,
                  "maxItems": 3,
                  "toggle-action": "remove",
                  "pageOn": {
                    "backgroundColor": "#000",
                    "size": "10px",
                    "alpha": 0.65
                  },
                  "pageOff": {
                    "backgroundColor": "#7E7E7E",
                    "size": "10px",
                    "alpha": 0.65
                  },
                  "pageStatus": {
                    "color": "black"
                  }
                },
                "plot": {
                  "animation": {
                    "effect": "ANIMATION_SLIDE_BOTTOM"
                  }
                },
                "scale-x": {
                  "line-color": "#7E7E7E",
                  "labels": labelData,
                  "item": {
                    "font-color": "#7e7e7e"
                  },
                  "guide": {
                    "visible": false
                  }
                },
                "scale-y": {
                  "line-color": "#7E7E7E",
                  "item": {
                    "font-color": "#7e7e7e"
                  },
                  "values": "0:100:1",
                  "guide": {
                    "visible": true
                  },
                  "label": {
                    "text": "# times",
                    "font-family": "arial",
                    "font-angle":0,
                    "bold": true,
                    "font-size": "14px",
                    "font-color": "#7E7E7E",
                    "offset-y":"-190px",
                    "offset-x":"20px"
                  },
                },
                "series": seriesData
              }
            ]
          };                                          
          zingchart.render({ 
            id : 'myChart4', 
            data : myConfig, 
          });                                                                     
        }
        
        
        
        function showlist(){
          var url = '/table';
          ajax('GET', url, {},
          // successful callback
          function(res) {
            var result = JSON.parse(res);
            
            // successfully logged in
            if (result.code === 200) {
              console.log(result.code === 200);
              console.log(result.result);
              var msg = "<table border=1 width=100%><caption>data dumps here</caption><tr><th>screen resolution: </th><th>browserversion</th><th>browserversion of useragent</th><th>browser type</th><th>load time</th><th>ids represent users:</th><th>time added:</th><th>page visited:</th></tr>";
              for(var row in result.result){
                msg += `<tr><th>${result.result[row].resolution}</th><th>${result.result[row].browserVersion}</th><th>${result.result[row].browserVersion_useragent}</th><th>${result.result[row].browsertype}</th><th>${result.result[row].loadtime}</th><th>${result.result[row].sessionid}</th><th>${result.result[row].addedTime}</th><th>${result.result[row].pagename}</th></tr>`;
                if( result.result[row].browsertype.substring(0,3) == 'Mac'){
                  macCount++;
                }
                if( result.result[row].browsertype.substring(0,3) == 'Win'){
                  winCount++;
                }
                if( resolutionMap[result.result[row].resolution] == undefined){
                  resolutionMap[result.result[row].resolution] = 1;
                }else if(resolutionMap[result.result[row].resolution] != undefined){
                  resolutionMap[result.result[row].resolution]++;
                }
                if( browserMap[result.result[row].browserVersion_useragent] == undefined){
                  browserMap[result.result[row].browserVersion_useragent] = 1;
                }else if(browserMap[result.result[row].browserVersion_useragent] != undefined){
                  browserMap[result.result[row].browserVersion_useragent]++;
                }
                if(deviceMap[result.result[row].browsertype] == undefined){
                  deviceMap[result.result[row].browsertype] = 1;
                }else if(deviceMap[result.result[row].browsertype] != undefined){
                  deviceMap[result.result[row].browsertype]++;
                }
                if(userMap[result.result[row].sessionid] == undefined){
                  userMap[result.result[row].sessionid] = {index : 0, error : 0, slow : 0, interactive : 0, random : 0};                                                                                                                                                                 
                }
                userMap[result.result[row].sessionid][result.result[row].pagename]++;                                                                                                                        
                performanceMap[result.result[row].addedTime] = result.result[row].loadtime;
                
                
              }
              msg += '</table>';
              $('list').innerHTML = msg;
              drawTest();
              drawResolution();
              drawPerform();
              drawBar();
              drawLast();
            }
          },
          
          // error
          function() {
            
            
          });
          var url = '/table_error';
          ajax('GET', url, {},
          // successful callback
          function(res) {
            var result = JSON.parse(res);
            
            // successfully logged in
            if (result.code === 200) {
              console.log(result.code === 200);
              console.log(result.result);
              var msg = "<table border=1 width=100%><caption>data dumps here</caption><tr><th>error: </th><th>ids represent users:</th><th>time added</th></tr>";
              for(var row in result.result){
                msg += `<tr><th>${JSON.stringify(result.result[row].jsError)}</th><th>${result.result[row].sessionid}</th><th>${result.result[row].addedTime}</th></tr>`;
                if(errorMap[`${new Date(result.result[row].addedTime).getMonth() + 1} ${new Date(result.result[row].addedTime).getDate() + 1}`] == undefined){
                  
                  errorMap[`${new Date(result.result[row].addedTime).getMonth() + 1} ${new Date(result.result[row].addedTime).getDate() + 1}`] = 1;
                }else if(errorMap[`${new Date(result.result[row].addedTime).getMonth() + 1} ${new Date(result.result[row].addedTime).getDate() + 1}`] != undefined){
                  errorMap[`${new Date(result.result[row].addedTime).getMonth() + 1} ${new Date(result.result[row].addedTime).getDate() + 1}`]++;
                }
              }
              msg += '</table>';
              $('error_list').innerHTML = msg;
              
              drawError();
            }
          },
          
          // error
          function() {
            
          });
        }
        showlist();
        
        /**
        * AJAX helper
        *
        * @param method -
        *            GET|POST|PUT|DELETE
        * @param url -
        *            API end point
        * @param callback -
        *            This the successful callback
        * @param errorHandler -
        *            This is the failed callback
        */
        function ajax(method, url, data, callback, errorHandler) {
          var xhr = new XMLHttpRequest();
          
          xhr.open(method, url, true);
          
          xhr.onload = function() {
            if (xhr.status === 200) {
              callback(xhr.responseText);
            } else if (xhr.status === 403) {
              onSessionInvalid();
            } else {
              errorHandler();
            }
          };
          
          
          xhr.onerror = function() {
            console.error("The request couldn't be completed.");
            errorHandler();
          };
          
          if (data === null) {
            xhr.send();
          } else {
            xhr.setRequestHeader("Content-Type",
            "application/json;charset=utf-8");
            xhr.send(data);
          }
        }
        
        
        
        
        function $(tag, options) {
          if (!options) {
            return document.getElementById(tag);
          }
          
          var element = document.createElement(tag);
          
          for (var option in options) {
            if (options.hasOwnProperty(option)) {
              element[option] = options[option];
            }
          }
          
          return element;
        }
        
        function hideElement(element) {
          element.style.display = 'none';
        }
        
        function showElement(element, style) {
          var displayStyle = style ? style : 'block';
          element.style.display = displayStyle;
        }
        
      })();
