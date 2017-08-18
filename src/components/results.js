var React = require('react');

var Element = require('./element');

class Results extends React.Component {
    constructor(props){
        super(props)

        this.renderResults = this.renderResults.bind(this);
        this.returnOneResult = this.returnOneResult.bind(this);
    }
    returnOneResult(element) {
        return <Element element={element} key={element.id + Math.random().toString()} />
    }
    renderResults() {
        let content = this.props.results[0];
        if (content.length < 2){
            return;
        }
        //console.log(content.length);
        let elements = [];
        for (var i = 0; i < content.length;i++){ 
            elements.push(this.returnOneResult(content[i]));
        }
        
        return elements;   
    }
    render() {
        return(
        <div>
            {this.renderResults()}
        </div>
        )
    }
}

module.exports = Results;