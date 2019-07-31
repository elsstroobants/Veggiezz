import React from 'react';
import './Recipe.css';
import IngredientsList from '../IngredientsList/IngredientsList.js';
import InstructionsList from '../InstructionsList/InstructionsList.js';
import heartHollow from '../../images/heart_hollow_pink.svg';
import heartSolid from '../../images/heart_solid_pink.svg';

//recipe has been passed to the Recipe component via the App component. It is used here by accessing certain properties of the recipe object and is referred to as this.props.recipe.
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.backToSearchResults = this.backToSearchResults.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //when the back button is clicked on the recipe, the recipelist (with the current search results) is shown and the recipe is hidden.
  backToSearchResults() {
    this.props.selectRecipe(null);
  }

  handleClick() {
    this.props.toggleHeart(this.props.recipe);
  }

  render() {
    let instructionsListItems;
    let recipeLink;
    if (this.props.recipe.instructions) {
    //The instructionsListItems consists of a list of list items, where each list item contains an instruction step.
      instructionsListItems = this.props.recipe.instructions.map((step, i) => <li key={'step_' + i}>{step}</li>);
    } else {
      recipeLink = this.props.recipe.url;
    }

    //This const consists of a list of list items, where each list item contains an ingredient.
    const ingredientsListItems = this.props.recipe.ingredients.map((ingredient, i) => <li key={'ingredient_' + i}>{ingredient}</li>);

    const heartImg = this.props.recipe.favourite ? heartSolid : heartHollow;

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
          <InstructionsList instructions={instructionsListItems} recipeLink={recipeLink}/>
        </div>
        <img src={heartImg} className="heart" onClick={this.handleClick} alt=''/>
        <input className="backButton" type="button" value="<" onClick={this.backToSearchResults}/>
      </div>
    );
  }
}

export default Recipe;
