import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Product from '@Models/Product/Product';
import "./ProductCard.scss";

interface props {
  args: Product;
}

function ProductCard({ args }: props) {

  return (
    <Card className='card'>
      <Link to="/"><Card.Img variant="top" className="product-image img-fluid mx-auto d-block" src={`../TrialImages/${args.image}`} /></Link>
      <Card.Body>
        <Card.Title className="card-title">{args.name}</Card.Title>
        <Card.Text>
          <label className="short-description">{args.shortDescription}</label>
          <span className="label-container">
            <label className="price">${args.price.amount}</label>
            {args.available ? "" : <label className="unavailable">SIN STOCK</label>}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;