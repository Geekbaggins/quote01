import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      quote: [],
      error: null,
      baseurl: ''
    };
    this.fetchQuote = this.fetchQuote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  fetchQuote() {
    fetch(`https://api.quotable.io/random`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          quote: data,
          isLoading: false,
          baseurl:'https://twitter.com/intent/tweet?hashtags=quotes&?text='+data.content.replace(/\s/g," ")+'%22 '+data.author.replace(/\s/g," ")
        })
      )
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  handleClick() {
    this.fetchQuote();
  }

  componentDidMount() {
    this.fetchQuote();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.error ? <p>{this.state.error.message}</p> : null}
        {!this.state.isLoading ? (
          <div id="quote-box">
            <div id="text">{this.state.quote.content}</div>
            <br />
            <div id="author">"{this.state.quote.author}"</div>
            <div id='shares'>
            <a href={this.state.baseurl} target="_blank" id='tweet-quote'><i className="bi bi-twitter"></i></a>
            <button onClick={this.handleClick} id="new-quote" className="btn btn-dark">
              New Quote!
            </button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </React.Fragment>
    );
  }
}

export default App
