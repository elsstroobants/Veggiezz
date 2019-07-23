import React from 'react';
import './RecipeSummary.css';


class RecipeSummary extends React.Component {
  constructor(props){
    super(props);
    this.handleRecipeSummaryClick = this.handleRecipeSummaryClick.bind(this);
    this.handleRecipeSummaryIconClick = this.handleRecipeSummaryIconClick.bind(this);
  }

  handleRecipeSummaryClick() {
    this.props.selectRecipe(this.props.recipe);
  }

  handleRecipeSummaryIconClick() {
    this.props.handleIconClick(this.props.recipe);
  }

  render() {
    return (
      <div className="recipeSummary">
        <li className="recipeSummaryListItem" onClick={this.handleRecipeSummaryClick}>
          {this.props.recipe.name}
        </li>
        <img src={this.props.recipeSummaryIconSrc} alt='' className="recipeSummaryIcon" onClick={this.handleRecipeSummaryIconClick} />
      </div>
    );
  }
};

export default RecipeSummary;
