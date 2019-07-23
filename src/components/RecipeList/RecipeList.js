import React from 'react';
import './RecipeList.css';
import RecipeSummary from '../RecipeSummary/RecipeSummary.js';

class RecipeList extends React.Component {

  render() {
    //this.props.recipes contains all the searchresults coming from the App component. const recipeItems makes a list of recipe summaries out of these search results. These recipe summaries are then put in an unordered list which is rendered.
    // I still find this a bit mind-boggling, as I don't see why this has to be done differently to the other list set-up used to create the IngredienstsList by the Recipe component... Basically, it looks weird to render a RecipySummary inside of a const. Is there a way to write this differently?
    const recipeItems = this.props.recipes.map((recipeItem, i) => <RecipeSummary key={'recipe_' + i} recipe={recipeItem} selectRecipe={this.props.selectRecipe} recipeSummaryIconSrc={this.props.recipeSummaryIconSrc}   handleIconClick={this.props.handleIconClick}/>);


    return (
      <div className="recipeList">
        <h2 className="title">{this.props.listTitle}</h2>
        <p className="listMessage">{this.props.message}</p>
        <ul>{recipeItems}</ul>
      </div>
    );
  }
};

export default RecipeList;
