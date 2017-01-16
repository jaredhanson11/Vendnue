var RandomMessage = React.createClass({
  getInitialState: function() {
    return { message: 'Hello, Universe' };
  },
  onClick: function() {
    var messages = ['Hello, World', 'Hello, Planet', 'Hello, Universe'];
    var randomMessage = messages[Math.floor((Math.random() * 3))];

    this.setState({ message: randomMessage });
  },
  render: function() {
    return (
      <div>
        <MessageView message={ this.state.message }/>
        <p><input type="button" onClick={ this.onClick } value="Change Message"/></p>
      </div>
    );
  }
});

var MessageView = React.createClass({
  render: function() {
    return (
      <p>{ this.props.message }</p>
    );
  }
});


<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">WebSiteName</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="#">Home</a></li>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
      <li><a href="#">Page 3</a></li>
    </ul>
  </div>
</nav>

function NavigationItem(props) {
	return (<li><a href={props.link}>{props.link}</a></li>);
}

function NavigationBar(props) {
	const listItems = props.items.map((item) => <NavigationItem link={item} />)
	return ({listItems});
}

const items = ["Vendnue","Tickets","Login"];

ReactDOM.render(
  <NavigationBar items={items}/>,
  document.getElementById('jaredisgay')
);

