import React from 'react';
import './App.css';
import ReactEcharts from 'echarts-for-react';
import jsonData from './data/All_Beauty.txt';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: [],
            qualityPosArray:[],
            priceArray:[]

        }
    }

   componentDidMount() {
     let temp = [];
     let tempPrice =[];
     let tempQPA =[];
     fetch(jsonData)
       .then(r => r.text())
       .then(t => {
         t.split("\n").filter(a => a.includes("\"price\":")).map(prop => {
           var obj = JSON.parse(prop);
           var localObj = {};
           localObj["score"] = obj.qualityScores[1];
           localObj["price"] = (obj.price !== undefined) ? parseFloat((obj.price).replace("$", "")) : 0;
           temp.push(localObj);
         })
       }).then(res => {
         // ANOTHER THEN BLOCK AFTER FETCHING DATA
         temp.sort(function(a, b) {
           console.log((a, b));
           if (a.score < b.score) return -1;
           if (a.score > b.score) return 1;
           return 0;
         });
         console.log(temp);
         this.setState({ test: temp });
       }).then(res => {
           for(var key in temp){
                tempPrice.push(temp[key].price);
                tempQPA.push(temp[key].score);
           }
           this.setState({ priceArray: tempPrice });
           this.setState({ qualityPosArray: tempQPA });
       })
   }

  getOption = () => {
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
                data : this.state.qualityPosArray// this should be score
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
                data: this.state.priceArray // this should be prices
              },
            ]
        }
  };

  render(){
     return (
        <div className="App">
        <ReactEcharts
            option={this.getOption()}
            style={{height: '700px', width: '100%'}}
            className='react_for_echarts' />
        </div>
     );
  }
}

export default App;
