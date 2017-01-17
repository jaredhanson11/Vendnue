import React from 'react';

export default class ConcertThumbnail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.concert.concert_name,
            id: props.concert.concert_id,
            date: props.concert.concert_date,
            venue: props.concert.concert_venue,
        };

        const concert_url = '/concerts/' + this.state.id;
        this.state.concert_url = concert_url;

        this.navigateToConcert = this.navigateToConcert.bind(this);
    }

    navigateToConcert() {
        window.location = this.state.concert_url;
    }

    render() {
        return (

    <div onClick={this.navigateToConcert}>
        <div>Concert Name: {this.state.name}</div>
        <div>Date: {this.state.date}</div>
        <div>Venue: {this.state.venue}</div>
    </div>

        );
    }
}
