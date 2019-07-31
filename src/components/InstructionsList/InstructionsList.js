import React from 'react';
import './InstructionsList.css';

//the instructions come from Recipe, where they were passed in as a prop. They get displayed at this level as list items in an ordered list.
class InstructionsList extends React.Component {
  render() {
    return (
      <div className="instructions-box">
        <h2 className="title">Instructions</h2>
        <ol>{this.props.instructions}</ol>
        <a href={this.props.recipeLink} target="_blank">Link to recipe</a>
      </div>
    );
  }
};

export default InstructionsList;
