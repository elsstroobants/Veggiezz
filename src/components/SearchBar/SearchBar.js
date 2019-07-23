import React from 'react';
import './SearchBar.css';
import searchIcon from '../../images/searchicon.svg';
import heartSolid from '../../images/heart_solid_white.svg';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: this.props.searchTerm };
    this.search= this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  search() {
    //When the search button is clicked, the search function is called, which calls the search function in the App component via the passed in prop and passes it the updated searchTerm.
    this.props.handleSearch(this.state.searchTerm);
  }

  handleTermChange(event) {
    // The newTerm const captures the value that was entered in the text field.
    // The state of searchTerm is set to the new term.
    const newTerm = event.target.value;
    this.setState( { searchTerm: newTerm } );
  }

  handleHeartClick() {
    this.props.displayFavList();
  }

  componentDidMount() {
    this.searchTermInput.focus();
  }

  //We cannot use onClick={this.props.handleSearch} directly on the input button element to do a search, because we need to capture the value of the text that was entered in the search field so we can pass it back to the App component in order to handle the search. The way to do that is:
  // 1) when the text is changed in the searchfield, the state of searchTerm is updated. This happens because of the onChange attribute which calls the handleTermChange function.
  // 2) when the search button is clicked, the search function is called. This funtion WILL call the function we wanted to call in the first place and which is defined in App and passed to SearcBar as a prop, and it passes it the updated searchTerm as a parameter.

  render() {
    let classNameSearchBar = this.props.homeScreen ? 'searchBarHomeScreen' : 'searchBarHeader';
    let classNameSearchIcon = this.props.homeScreen ? 'searchIconHomeScreen' : 'searchIconHeader';
    let classNameSearchButton = this.props.homeScreen ? 'searchButtonHomeScreen' : 'searchButtonHeader';
    let classNameLogo = this.props.homeScreen ? 'logoHomeScreen' : 'logoHeader';
    let classNameHeartSolid = this.props.homeScreen ? 'heartSolidHomeScreen' : 'heartSolidHeader';

    return (
      <div className={classNameSearchBar}>
        <div className={classNameSearchBar}>
          <input className="searchField" type="text" placeholder="Enter your favourite veg"
           value={this.state.searchTerm} onChange={this.handleTermChange}
           //this next line is essential for the componentDidMount function. It is used to put the focus on the searchField straight after rendering.
           ref={(input) => { this.searchTermInput = input; }} />
          <input className={classNameSearchButton} type="button" value="find recipes" onClick={this.search} />
          <img className={classNameSearchIcon} src={searchIcon} onClick={this.search} alt=''/>
          <img className={classNameHeartSolid} src={heartSolid} onClick={this.handleHeartClick} alt=''/>
        </div>
        <h1 className={classNameLogo}>Veggies</h1>
      </div>
    );
  }
}

export default SearchBar;
