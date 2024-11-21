import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { loadAllCategories } from '../services/category-service';
import { Link } from 'react-router-dom';

const CategorySideMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories(data); // No need to spread the data here unless required
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ListGroup>
        <ListGroupItem tag={Link} to="/" action className="border-0">
          All Blogs
        </ListGroupItem>

        {categories && categories.length > 0 ? (
          categories.map((cat, index) => (
            <ListGroupItem
              key={index}
              tag={Link}
              to={`/categories/${cat.categoryId}`} // Ensure this is correct
              action
              className="border-0 mt-1"
            >
              {cat.categoryTitle}
            </ListGroupItem>
          ))
        ) : (
          <p>No categories available</p> // Optional fallback if no categories exist
        )}
      </ListGroup>
    </div>
  );
};

export default CategorySideMenu;
