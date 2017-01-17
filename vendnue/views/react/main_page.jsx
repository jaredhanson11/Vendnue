import React from 'react';

import ConcertThumbnail from './concert_main_page_thumbnail.jsx';

export default class MainPage extends React.Component {

    constructor(){
        super();
        this.state = {
            concerts: [
                {
                    'concert_date': '2017-06-03T00:00:00',
                    'concert_id': 1,
                    'concert_name': 'Coachella',
                    'concert_venue': 'Sleep Train Amphitheatre'},
                {
                    'concert_date': '2017-01-25T00:00:00',
                    'concert_id': 2,
                    'concert_name': "Kanye West's Saint Pablo Tour",
                    'concert_venue': 'Oracle Arena'
                }
            ]
        };
    }

    render() {
        console.log(this.state);
        var concertComponentsArray = this.state.concerts.map((currConcert) => {
            return (
                <li key={currConcert.concert_id.toString()}>
                <ConcertThumbnail concert={currConcert} />
                <br />
                </li>
            );
        });
        console.log(concertComponentsArray);
        return (
                <div>
                    {concertComponentsArray}
                </div>
        );
    }
}
