import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  const minClock = 1000; // 1 sec
  const maxClock= 3000; // 3 sec
  const numberOfLayer = 36;
  const imgLayerPrefix = "./images/multilevelimage000L";
  const imgLayerFileExtencions = ".png";

  class Layer extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        imgNumber : props.imgNumber,
        imgLevel : props.imgLevel,
        xScale : this.scaleVal(),
        yScale : this.scaleVal(),
        hueRotate : this.hueVal(),
        invert : this.invertVal(),
      };
    }

    render(){
      //let randomNumber = Math.floor(Math.random()*numberOfLayer);
      let styleVar = {zIndex: this.state.imgLevel,
        backgroundImage: "url(" + imgLayerPrefix + this.props.imgNumber+ imgLayerFileExtencions + ")",
        transform: "scaleX(" + this.state.xScale + ") scaleY(" + this.state.yScale + ")",
        "filter": "hue-rotate(" + this.state.hueRotate + "deg) invert(" + this.state.invert + ") blur(5px)",
      };
      console.log(styleVar);
      return <div className = "imgLayer" style= {styleVar}></div>;
    }

    scaleVal(){
      return (Math.floor(Math.random() * 1.9) * 2) -1; 
    }

    hueVal(){
      return (Math.floor(Math.random() * 3.9) * 90)  * (-1);
    }

    invertVal(){
      return (Math.floor(Math.random() * 1.9));
    }

  }

  class LayerCollector extends React.Component{

    constructor(){
      super();
      this.state = {layers:[], nLayer:0};
      console.log("LayerCollector constructor");
    }

    render(){
      if(this.state.layers === null || this.state.layers.lenght === 0){
        console.log("LayerCollector render null");
        return null;
      }
      console.log("LayerCollector render notnull");
      return this.state.layers.map((imageNumber, key) => <Layer imgNumber={imageNumber} imgLevel={key}/>);
    }

    layerLoader() {
      setTimeout(() => {
        var layers = [];
        if(this.state.layers != null){
          layers = this.state.layers;
        }
        let newNumberLevel = Math.random() * numberOfLayer;
        if(newNumberLevel != layers[layers.length - 1]){
          layers.push(Math.floor(newNumberLevel));
          if(layers.length >= 100){
            layers.shift();
          }
          this.setState({nLayer:this.state.nLayer + 1, layers:layers});
          this.layerLoader();
        }
      }, this.generateClockVal());

    }

    componentDidMount(){
      console.log(this.state.layers);
      this.layerLoader();
    }

    generateClockVal(){
      return Math.floor(Math.random() * maxClock) + minClock;
    }

  }

  ReactDOM.render(
  <LayerCollector />,
  document.getElementById('root')
);
