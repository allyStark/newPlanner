var React = require('react');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

class Results extends React.Component {
    constructor(props){
        super(props)

        this.renderResults = this.renderResults.bind(this);
        this.returnOneResult = this.returnOneResult.bind(this);
    }
    returnOneResult(element) {
        console.log(element);
        return(
            <div>
            <Row className="results-row" key={element.id}>
                <Col md={3} className="results-name">{element.name}</Col>
                <Col md={3} className="results-image"><img className="results-image-image" src={element.image_url} /></Col>
                <Col className="people-going" md={2}>0</Col>
                <Button id={element.name} md={2}>Going</Button><a href={element.url}><Button md={2}>Yelp</Button></a>
            </Row>
            </div>
        )
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