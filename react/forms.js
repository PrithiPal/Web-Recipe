

class FileSelect extends React.Component {
    constructor(props){
      super(props);
      this.state={
        fileSelected : {}
      }
      this.fileInput = React.createRef();
      this.props.file = this.fileInput; 
    }
    
    render() {
      return (
      <div class='file-select'>
        <label>{this.props.labelName}</label>
        <input type="file" ref={this.fileInput} />
      </div> 
      );
    }
  }
  
  class Select extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {
        options : this.props.options,
        labelName : this.props.labelName,
        selectValue : this.props.options[0]
      } ; 
    }
    
    render(){
      return (
        <div class='select'>
          <label>{this.props.labelName}</label>
          <select multiple={this.props.multiple} value={this.state.value} onChange={this.props.handleSelect} >
            {this.props.options.map(val => { return <option value={val}> {val} </option> })}
          </select>
        </div>
      );
    }
  }
  
  class MultiSelect extends React.Component { 
    constructor(props){
      super(props);
    }
    
    render(){
      return (
        <Select multiple={true} options={this.props.options} labelName={this.props.labelName}/>
      );
    }
  }
  
  class TextBox extends React.Component{
    constructor(props){
      super(props);
      this.state = {};
    }
    
    render(){
      return (
      <div>
        <label>{this.props.labelName} </label>
        <input type="text" name="textValue" value={this.state.value} onChange={this.props.handleChange} />  
      </div>
      );
    }
  }
  
  
  class SimpleForm extends React.Component { 
    
    constructor(props){
      super(props); 
      this.selectOptions=['grapefruit', 'lime'] ; 
      
      this.state = {
        textValue : '',
        textAreaValue : '',
        selectValue : this.selectOptions[0],
        multiSelectValue : this.selectOptions[0],
        fileInputValue : ''
      }
         
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
      event.preventDefault();
      alert(this.state.fileInputValue); 
    }
    
    formContents(){
      return (        
          <div class='form-contents'>
            <TextBox labelName="Select" handleSelect={(event)=>{this.setState({textValue : event.target.value})}}/>
            <Select labelName="UniSelect" options={this.selectOptions} handleSelect={ (event)=>{ this.setState({selectValue : event.target.value }) }  } />
            <MultiSelect labelName="MultiSelect" options={this.selectOptions} />
            <FileSelect labelName="File" file={this.state.fileInputValue}/>
  
            <p>Value : {this.state.textValue} </p>
            <input type="submit" value="submit"/>
          </div>
      ); 
    }
    
    
    
    render(){ 
      
      if(this.props.fieldSet){
        return(
          <fieldset onSubmit={this.handleSubmit}>
            <legend>{this.props.fieldSetLegend}</legend>
            {this.formContents()}
          </fieldset>
        ); 
      }
      else{
        return(
          <form onSubmit={this.handleSubmit}>
            {this.formContents()}
          </form>
        );    
      }
    }
  }
  
  
  
  
  
  class App extends React.Component{
    render(){
      return (
      <div>
          <h1>Form</h1>
          <SimpleForm fieldSet={true} fieldSetLegend='FieldSetForm'/>
      </div>
      );
    }
  }
  
  ReactDOM.render(
    <App />
   ,document.getElementById('root'));