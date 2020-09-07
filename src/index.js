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
    }

    render(){
      let styleVar = {zIndex: this.props.imgLevel,
        backgroundImage: "url(" + imgLayerPrefix + this.props.imgNumber+ imgLayerFileExtencions + ")",
        transform: "scaleX(" + this.props.xScale + ") scaleY(" + this.props.yScale + ")",
        "filter": "hue-rotate(" + this.props.hueRotate + "deg) invert(" + this.props.invert + ") blur(5px)",
      };
      return <div className = "imgLayer" style= {styleVar}></div>;
    }
  }

  class LayerCollector extends React.Component{

    constructor(){
      super();
      this.state = {layers:[], nLayer:0};
    }

    render(){
      if(this.state.layers === null || this.state.layers.lenght === 0){
        return null;
      }
      return this.state.layers.map((layer, key) => 
      <Layer 
        imgNumber={layer.imgNumber}
        imgLevel={key}
        xScale={layer.xScale}
        yScale={layer.yScale}
        hueRotate={layer.hueRotate}
        invert={layer.invert}
      />);
    }

    layerLoader() {
      setTimeout(() => {
        var layers = [];
        if(this.state.layers != null){
          layers = this.state.layers;
        }
        let newNumberLevel = this.generateNumberOfImage();
        if(newNumberLevel != layers[layers.length - 1]){
          layers.push({
            imgNumber : newNumberLevel,
            xScale : this.generateScaleVal(),
            yScale : this.generateScaleVal(),
            hueRotate : this.generateHueVal(),
            invert : this.generateInvertVal(),
          });
          if(layers.length >= 100){
            layers.shift();
          }
          this.setState({nLayer:this.state.nLayer + 1, layers:layers});
          this.layerLoader();
        }
      }, this.generateClockVal());

    }

    componentDidMount(){
      this.layerLoader();
    }

    generateClockVal(){
      return Math.floor(Math.random() * maxClock) + minClock;
    }

    generateNumberOfImage(){
      return Math.floor(Math.random() * numberOfLayer);
    }

    generateScaleVal(){
      return (Math.floor(Math.random() * 1.9) * 2) -1; 
    }

    generateHueVal(){
      return (Math.floor(Math.random() * 3.9) * 90)  * (-1);
    }

    generateInvertVal(){
      return (Math.floor(Math.random() * 1.9));
    }
  }

  ReactDOM.render(
  <LayerCollector />,
  document.getElementById('root')
);
