import { Link } from "react-router-dom";

const CategoryNav = () => {
    return (
        <div className="category-nav">
            <Link to="/pages/Mens">Mens</Link>
            <Link to="/pages/Womens">Womens</Link>
            <Link to="/pages/Kids">Kids</Link>
            <Link to="/pages/Electronics">Electronics</Link>
            <Link to="/pages/Grociries">Groceries</Link>
        </div>
    );
};

export default CategoryNav;
