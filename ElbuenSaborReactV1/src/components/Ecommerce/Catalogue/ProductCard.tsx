import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Product from '@Models/Product/Product';
import "./ProductCard.scss";

interface props {
  args: Product;
}

function ProductCard({ args }: props) {

  return (
    <>
      <Card className='card'>
        <Link to={`/productDetail/${args.id}`}>
          <Card.Img variant="top" className="product-image img-fluid mx-auto d-block" src={`../Images/${args.image.path}`} />
        </Link>
        <Card.Body>
          <Card.Title className="card-title">{args.name}</Card.Title>
          <Card.Text>
            <label className="short-description">{args.shortDescription}</label>
            <label className="label-container">
              <label className="price">${args.sellPrice}</label>
              {args.available ? "" : <label className="unavailable">SIN STOCK</label>}
            </label>
          </Card.Text>
        </Card.Body>
      </Card >
    </>
  );
}

export default ProductCard;