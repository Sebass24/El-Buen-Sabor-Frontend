import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function ProductCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Link to=""><Card.Img variant="top" src=""/></Link>
      <Card.Body>
        <Card.Title>{}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;