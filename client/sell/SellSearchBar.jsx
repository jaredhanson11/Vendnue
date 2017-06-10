import React from 'react';
import Autocomplete from 'react-autocomplete';

import { actionCreators } from '../actions';


export default class SellSearchBar extends React.Component {

	  render() {
	  	console.log(this.props.concertQueryApiCall.concerts)
    	return (<Autocomplete
					  getItemValue={(item) => item.name}
					  items={this.props.concertQueryApiCall.concerts}
					  renderItem={(item, isHighlighted) =>
					    <div>{item.name}</div>
					  }
					  shouldItemRender = {(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1}
					  value={this.props.concertQuery.prefix}
					  onChange={(event,value) => this.props.enterQuery(value)}
					  onSelect={(value,item) => {this.props.enterQuery(value);
					  						this.props.selectQuery();
					  						this.props.getConcertInfo(item.id);
					  					}}
				/>);
    }
}