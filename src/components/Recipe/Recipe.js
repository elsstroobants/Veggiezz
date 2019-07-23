import React from 'react';
import './Recipe.css';
import IngredientsList from '../IngredientsList/IngredientsList.js';
import InstructionsList from '../InstructionsList/InstructionsList.js';
import heartHollow from '../../images/heart_hollow_pink.svg';

//recipe has been passed to the Recipe component via the App component. It is used here by accessing certain properties of the recipe object and is referred to as this.props.recipe.
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.backToSearchResults = this.backToSearchResults.bind(this);
    this.handleHeartHollowClick = this.handleHeartHollowClick.bind(this);
  }

  //when the back button is clicked on the recipe, the recipelist (with the current search results) is shown and the recipe is hidden.
  backToSearchResults() {
    this.props.selectRecipe(null);
  }

  handleHeartHollowClick() {
    this.props.addToFavList(this.props.recipe);
  //  let recipeToAdd = this.props.recipe.name;
  //  this.props.addToFavList(recipeToAdd);
  }

  render() {
    //This const consists of a list of list items, where each list item contains an instruction step.
    const instructionsListItems = this.props.recipe.instructions.map((step, i) => <li key={'step_' + i}>{step}</li>);
    //This const consists of a list of list items, where each list item contains an ingredient.
    const ingredientsListItems = this.props.recipe.ingredients.map((ingredient, i) => <li key={'ingredient_' + i}>{ingredient.item} {ingredient.quantity} {ingredient.unit}</li>);

    //The Recipe component renders a header with the name of the recipe, an image of the recipe, an ingredientslist and an instuctions list. The ingredientslist is passed the ingredientsListItems as a prop called ingredients and the instructionsListItems as instructions.
    return (
      <div className="recipe">
        <div className="recipe-name">
          <h1>{this.props.recipe.name}</h1>
        </div>
        <div className="recipe-image">
          <img src={this.props.recipe.picSrc} alt="lasagna"/>
        </div>
        <div className="content-box">
          <IngredientsList ingredients={ingredientsListItems}/>
          <InstructionsList instructions={instructionsListItems}/>
        </div>
        <img src={heartHollow} className="heartHollow" recipe={this.props.recipe} onClick={this.handleHeartHollowClick} alt=''/>
        <input className="backButton" type="button" value="<" onClick={this.backToSearchResults}/>
      </div>
    );
  }
}

export default Recipe;
