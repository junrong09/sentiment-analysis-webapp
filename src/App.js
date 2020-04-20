import React from 'react';
import './App.css';
import ReactEcharts from 'echarts-for-react';
import jsonData from './data/All_Beauty.txt';

function App() {

var result = '{"asin":"B00MGK9Z8U","title":"Rimmel Provocalips 16hr Kissproof Lipstick, Kiss Fatal, 0.14 Fluid Ounce","brand":"Rimmel","main_cat":"All_Beauty","rank":"45,960inBeautyPersonalCare(","price":"$6.47","qualityScores":[1,1,0,17,0],"functionalityScores":[1,1,0,23,2],"aestheticsScores":[1,1,0,20,10]}\n{"asin":"B00MTR49IG","title":"Peter Lamas Wheatgrass Purifying Shampoo and Conditioner Set, 12 Fluid Ounce Each","brand":"Peter Lamas","main_cat":"All_Beauty","rank":"971,977inBeautyPersonalCare(","qualityScores":[7,6,0,2,0],"functionalityScores":[7,7,0,2,0],"aestheticsScores":[7,6,0,2,0]}\n{"asin":"B00N2WQ2IW","title":"Pantene Pro-V Volume Conditioner 12.0 Fluid Ounce (Product Size May Vary)","brand":"Pantene","main_cat":"All_Beauty","rank":"2,378,973inBeautyPersonalCare(","qualityScores":[9,9,0,7,1],"functionalityScores":[9,9,0,8,2],"aestheticsScores":[9,9,0,6,1]}\n{"asin":"B00NT0AR7E","title":"OZNaturals Anti Aging Retinol Serum -The Most Effective Anti Wrinkle Serum Contains Professional Strength Retinol+ Astaxanthin+ Vitamin E - Get The Dramatic Youthful Results You’ve Been Looking For","brand":"OZ Naturals","main_cat":"All_Beauty","rank":"9,905inBeautyPersonalCare(","price":"$17.95","qualityScores":[2,2,0,10,2],"functionalityScores":[2,2,0,9,1],"aestheticsScores":[2,2,0,8,1]}'

 var getOption = () => {
     var test =  result.split("\n").filter(a => a.includes("\"price\":")).map(prop => {
        var obj = JSON.parse(prop);
        var localObj = {};
        localObj["score"] = obj.qualityScores[1];
        localObj["price"] = (obj.price!== undefined)?parseFloat((obj.price).replace("$", "")) : 0;
              return localObj;
        } );

        test.sort(function(a, b) {
          var keyA = a.score;
          var keyB = b.score;
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        console.log(test);

        var qualityPosArray = []
        var priceArray = []

        for (var key in test) {
          qualityPosArray.push(test[key].score);
          priceArray.push(test[key].price);
        }

        console.log(priceArray);
        console.log(qualityPosArray);

    return{
      title: {
        text: 'Quality Positive Score vs Price'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['All_Beauty']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : qualityPosArray// this should be score
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'All_Beauty',
          type:'line',
          areaStyle: {normal: {}},
          data: priceArray // this should be prices
        },
      ]
      }
    };

  return (
    <div className="App">
    <ReactEcharts
        option={getOption()}
        style={{height: '700px', width: '100%'}}
        className='react_for_echarts' />
    </div>
  );
}

export default App;
