import React from 'react';
import './App.css';
import Recipe from './components/Recipe/Recipe.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import RecipeList from './components/RecipeList/RecipeList.js';
import lasagna from './images/lasagna.jpg';
import heartHollow from './images/heart_hollow_pink.svg';
import cross from './images/cross_pink.svg';


//hard coded recipe. This will be replaced with the results from an API call, which will be a jason object.
const recipe = {
  name: 'lasagna',
  picSrc: lasagna,
  ingredients: [
    {item: 'pasta', quantity: 500, unit: 'grams'},
    {item: 'onions', quantity: 2, unit: 'piece'}
  ],
  instructions: [
    'oven on to 180C',
    'sauce',
    'assemble',
    'cook'
  ]
}
// I need a list of hard coded recipes in order to have something to work with when using search results. This will be adjusted when working with an API request.
const listOfRecipes = [recipe, recipe, recipe];
// I need an updated list of recipes to see if a new search will result in an update of the state of the search results.
const newListOfRecipes = [recipe, recipe];
// I need an updated list of recipes to see if a new search initiated from a screen showing the recipe will result in an update of the state of the search results.
const anotherListOfRecipes = [recipe];


//This is the main app, which is the starting point for all information. It holds several components and children of components. The initial state has two items in it: the searchResults are set to listOfRecipes (Doug: why not null?) and the selectedRecipe is set to null, because we don't want to show a recipe until one has been selected.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
      selectedRecipe: null,
      searchTerm: null,
      favList: [],
      displayType: null
    };
    this.search = this.search.bind(this);
    this.selectRecipe = this.selectRecipe.bind(this);
    this.displayFavList = this.displayFavList.bind(this);
    this.addToFavList = this.addToFavList.bind(this);
    this.removeFromFavList = this.removeFromFavList.bind(this);
  }

  // This function gets called when the user clicks the "Search" button.
  // It is given the term that is to be searched for.
  search(searchTerm) {
    if (searchTerm === 'onions') {
      this.setState( {searchTerm: searchTerm, searchResults: listOfRecipes, displayType: "search"} );
      this.selectRecipe(null);
    } else if (searchTerm === 'tomatoes') {
      this.setState( {searchTerm: searchTerm, searchResults: newListOfRecipes, displayType: "search"} );
      this.selectRecipe(null);
    } else if (searchTerm !== 'onions' && searchTerm !== 'tomatoes') {
      this.setState( {searchTerm: searchTerm, searchResults: anotherListOfRecipes, displayType: "search"} );
      this.selectRecipe(null);
    }
  }

  //This function gets called when the user selects a recipe from the RecipeList by clicking a particular RecipeSummary. It is given the newRecipe as a parameter. Selecting a new recipe changes the state in the App component and sets selectedRecipe to the new selected recipe.
  selectRecipe(newRecipe) {
    this.setState( {selectedRecipe: newRecipe} );
  }

  displayFavList() {
    this.setState( {displayType:'favourites', selectedRecipe: null} ) ;
  }

  addToFavList(recipeToAdd) {
    this.state.favList.push(recipeToAdd);
    //icon needs to show heartSolid instead of heartHollow
  }

  removeFromFavList(recipeToRemove) {
    this.state.favList.pop(recipeToRemove);
    //the favlist should needs to re-rendered without the deleted recipe. This can be done by changing the state, without actually changing it.
    this.setState({});
  }


  // If there is no recipe selected, the state of selectedRecipe is null. In this case the RecipeList will be rendered, not the recipe.
  // Searchbar is passed a prop called handleSearch. This means that "this.props.handleSearch" can be used as an event handler value in
  //the SearchBar component. Have a look in the SearchBar component to see where it is used. You would expect to find this in the SearchBars <input> element as an onClick attribute (onClick={this.handleSearch}) but, that wouldn't work because you need to capture the value of the text that was entered in the search field somehow. See comments in SearchBar to see how to do that.
  // The recipeList component is passed the search results by giving the RecipeList component an attribute called recipes. The state of the selected recipe can be changed by calling the selectRecipe function and passing it a new recipe.

  render() {
    if (this.state.selectedRecipe !== null) {
      // render recipe
      return (
        <div className="App-content">
          <SearchBar handleSearch={this.search} homeScreen={false} searchTerm={this.state.searchTerm} displayFavList={this.displayFavList}/>
          <Recipe recipe={this.state.selectedRecipe} selectRecipe={this.selectRecipe} addToFavList={this.addToFavList}/>
        </div>
      );
    } else if (this.state.displayType !== null) {
      let display;
      let iconToDisplaySrc;
      let handleIconClick;
      let listTitle;
      let listMessage;
      if (this.state.displayType === 'search') {
        display = this.state.searchResults;
        iconToDisplaySrc = heartHollow;
        handleIconClick = this.addToFavList;
        listTitle = 'Search Results';
        listMessage = (this.state.searchResults.length !== 0) ? '' : 'Oops, no search results for the entered term.';
      } else {
        display = this.state.favList;
        iconToDisplaySrc = cross;
        handleIconClick = this.removeFromFavList;
        listTitle = 'Favourites List';
        listMessage = (this.state.favList.length !== 0) ? '' : 'No favourites have been added yet.';
      }

      // Render list (search results or fav list) depending on displayType
      return (
        <div className="App-content">
          <SearchBar handleSearch={this.search} homeScreen={false} searchTerm={this.state.searchTerm} displayFavList={this.displayFavList}/>
          <RecipeList recipes={display} selectRecipe={this.selectRecipe} listTitle={listTitle} recipeSummaryIconSrc={iconToDisplaySrc} handleIconClick={handleIconClick} message={listMessage}/>
        </div>
      );

    } else {
      // Render home screen
      return (
        <div className="App-home">
          <h1 className="veggiezz">Veggiezz</h1>
          <SearchBar handleLogin={this.handleLogin} handleSearch={this.search} homeScreen={true}/>
        </div>
      );
    }
  }
};

export default App;
