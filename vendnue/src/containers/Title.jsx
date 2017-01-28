import React from 'react';

class Title extends React.Component {
    render() {
        return (<h4 style={{textAlign: 'center'}}>{this.props.name}</h4>);
    }
}

export { Title }; 
