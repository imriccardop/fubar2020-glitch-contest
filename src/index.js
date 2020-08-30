import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  const maxClock= 3000;
  const numberOfLayer = 25;
  const imgLayerPrefix = "./images/multilevelimage000L";
  const imgLayerFileExtencions = ".png";

  class Layer extends React.Component{
    constructor(props){
      super(props);
      this.state = {imgNumber : props.imgNumber, imgLevel : props.imgLevel};
    }

    render(){
      //let randomNumber = Math.floor(Math.random()*numberOfLayer);
      let styleVar = {zIndex: this.state.imgLevel,
      "background-image": "url(" + imgLayerPrefix + this.props.imgNumber+ imgLayerFileExtencions + ")"
      };
      console.log(styleVar);
      return <div className = "imgLayer" style= {styleVar}></div>;
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
        layers.push(Math.floor(Math.random() * numberOfLayer));
        if(layers.length >= 100){
          layers.shift();
        }
        this.setState({nLayer:this.state.nLayer + 1, layers:layers});
        this.layerLoader();
      }, Math.floor(Math.random() * maxClock));
      
    }

    componentDidMount(){
      console.log(this.state.layers);
      this.layerLoader();
    }

  }

  ReactDOM.render(
  <LayerCollector />,
  document.getElementById('root')
);
