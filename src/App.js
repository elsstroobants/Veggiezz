import React from 'react';
import './App.css';
import Recipe from './components/Recipe/Recipe.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import RecipeList from './components/RecipeList/RecipeList.js';
import heartHollow from './images/heart_hollow_pink.svg';
import heartSolid from './images/heart_solid_pink.svg';
import cross from './images/cross_pink.svg';

// https://api.edamam.com/search?q=onion&app_id=65b44741&app_key=dd81ed343eac181f1a75a52d6aa2cdfc


//This is the main app, which is the starting point for all information. It holds several components and children of components. The initial state has two items in it: the searchResults are set to listOfRecipes (Doug: why not null?) and the selectedRecipe is set to null, because we don't want to show a recipe until one has been selected.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
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
    this.isFavourite = this.isFavourite.bind(this);
    this.toggleHeart = this.toggleHeart.bind(this);
    this.getIconSearchResultsList = this.getIconSearchResultsList.bind(this);
    this.getIconFavList = this.getIconFavList.bind(this);
  }

  // This function gets called when the user clicks the "Search" button.
  // It is given the term that is to be searched for.
  search(searchTerm) {
    this.setState({
      searchTerm: searchTerm,
      searchResults: null,
      displayType: "search",
      selectedRecipe: null
    })

    // Build the URL for the search
    let apiSearchUrl = 'https://api.edamam.com/search'
        + '?q=' + searchTerm
        + '&health=vegan'
        + '&to=20'
        + '&app_id=65b44741&app_key=dd81ed343eac181f1a75a52d6aa2cdfc';

    // Call the URL to run the search
    fetch(apiSearchUrl)
    .then(response => {
      // Handle the response from the search
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      } else {
        return response.json();
      }
    })
    .then(recipeJson => {
      // Handle the JSON content from the search result
      // Convert the response from the API to the expected internal format.
      let searchResultsFromAPI = recipeJson.hits.map(hit => {
        let recipe = hit.recipe;
        return {
          id: recipe.uri,
          name: recipe.label,
          picSrc: recipe.image,
          ingredients: recipe.ingredientLines,
          url: recipe.url,   // link to original recipe description
          favourite: this.isFavourite(recipe.uri)
        }
      })
      console.log("Search result = ", recipeJson, searchResultsFromAPI)
      this.setState({searchResults: searchResultsFromAPI})
    });
  }

  isFavourite(id) {
    for (let i in this.state.favList) {
      let fav = this.state.favList[i];
      if (id === fav.id) {
        return true;
      }
    }
    return false;
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
    recipeToAdd.favourite = true;
    this.setState( {} );
    //icon needs to show heartSolid instead of heartHollow
  }

  removeFromFavList(recipeToRemove) {
    const newFavList = this.state.favList.filter(fav => fav.id !== recipeToRemove.id);
    recipeToRemove.favourite = false;
    this.setState( {favList: newFavList} );
  }

  //if hollowHeart: add to favouriteslist
  //if solidHeart: remove from favouriteslist
  toggleHeart(recipe) {
    if (recipe.favourite) {
      this.removeFromFavList(recipe);
    } else {
      this.addToFavList(recipe);
    }
  }

  getIconSearchResultsList(recipe) {
    if (recipe.favourite) {
      return heartSolid;
    } else {
      return heartHollow;
    }
  }

  getIconFavList(recipe) {
    return cross;
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
          <Recipe recipe={this.state.selectedRecipe} selectRecipe={this.selectRecipe} toggleHeart={this.toggleHeart}/>
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
        iconToDisplaySrc = this.getIconSearchResultsList;
        handleIconClick = this.toggleHeart;
        listTitle = 'Search Results';

        if(this.state.searchResults === null) {
          listMessage = 'searching...';
        } else if (this.state.searchResults.length !== 0) {
          listMessage = '';
        } else {
          listMessage = 'Oops, no search results for the entered term.';
        }

        //line below to be removed once block above is working (it replaces it).
        //listMessage = (this.state.searchResults.length !== 0) ? '' : 'Oops, no search results for the entered term.';


      } else {
        display = this.state.favList;
        iconToDisplaySrc= this.getIconFavList;
        handleIconClick = this.removeFromFavList;
        listTitle = 'Favourites List';
        listMessage = (this.state.favList.length !== 0) ? '' : 'No favourites have been added yet.';
      }

      // Render list (search results or fav list) depending on displayType
      return (
        <div className="App-content">
          <SearchBar handleSearch={this.search} homeScreen={false} searchTerm={this.state.searchTerm} displayFavList={this.displayFavList}/>
          <RecipeList recipes={display} selectRecipe={this.selectRecipe} listTitle={listTitle} getIconSrc={iconToDisplaySrc} handleIconClick={handleIconClick} message={listMessage}/>
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
