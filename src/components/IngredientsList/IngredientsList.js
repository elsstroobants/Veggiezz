import React from 'react';
import './IngredientsList.css';

class IngredientsList extends React.Component {
  //the ingredients come from the recipe, where they were passed in as a prop. They get displayed at this level as list items in an unordered list.

  render() {
    return (
      <div className="ingredients-box">
        <h2 className="title">Ingredients</h2>
        <ul>{this.props.ingredients}</ul>
      </div>
    );
  }
};

export default IngredientsList;
