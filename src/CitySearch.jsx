import {
    Form,
    Button,
    Alert,
    Placeholder,
} from 'react-bootstrap';

function CitySearch(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        props.displayLocation();
    };

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="cityName">
            <Form.Label>Where would you like to explore?</Form.Label>
        <Form.Control onChange={props.updateCity} type="text" Placeholder="Enter a City" />
        </Form.Group>
        {props.hasError &&
            <>
            <Alert variant="danger">
            <strong className="mr-auto">Error {' '}</strong>
            {props.errorMessage}, please try another search. 
            </Alert>
            </>
        }
        <Button variant="primary" type="submit">
            Explore!
        </Button>
        </Form>
    );
  }

export default CitySearch