import React from 'react';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate : moment(),
      category: '',
      radius: '',
      time: '',
      categoryId:''
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.search = this.search.bind(this);
    this.radiusInMiles = ['2', '5', '10', '25'];
  }

  componentDidMount() {
  }

  handleDateChange(event, date) {
    this.setState({
      startDate: date
    });
    this.setState(
      {
        startDate: date,
        time: date.getTime()
    });
  }

  handleCategoryChange(event, key, payload) {
    this.props.categories.forEach((category, index) => {
      if (index === key) {
        this.setState({category: category.name, categoryId: category.id});
      }
    });
  }

  handleRadiusChange(event, key, payload) {
    this.radiusInMiles.forEach((distance, index) => {
      if (key === index) {
        this.setState({radius: distance});
      }
    });
  }

  search() {
    var searchOptions = {
      radius: this.state.radius,
      startDate: this.state.time,
      category: this.state.category,
      categoryId: this.state.categoryId
    };
    this.props.handleSearch(searchOptions);
  }

  render() {
    let categories = this.props.categories;
    return(
      <div>
        <span className="category">
        <DropDownMenu
          value={this.state.category}
          onChange={this.handleCategoryChange}
          // style={styles.customWidth}
          autoWidth={true}
        >
        {categories.map((category, index) => {
          return <MenuItem primaryText={category.name} value={index} key={category.id}/>
        })}
        </DropDownMenu>
        </span>
        <div className="radius">
          <DropDownMenu
            value={this.state.radius}
            onChange={this.handleRadiusChange}
            // style={styles.customWidth}
            autoWidth={true}
          >
            <MenuItem primaryText="2 miles" value={1}/>
            <MenuItem primaryText="5 miles" value={2}/>
            <MenuItem primaryText="10 miles" value={3}/>
            <MenuItem primaryText="25 miles" value={4}/>
          </DropDownMenu>
        </div>
        <span className="calendar">
          <DatePicker
            onChange={this.handleDateChange}
            value={this.state.startDate}
            hintText="Look By Date"
          />
        </span>
        <span>
          <RaisedButton label="Search" onClick={this.search}/>
        </span>
      </div>
    );
  }
}

export default Search;
