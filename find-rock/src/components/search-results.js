import React, { Component } from "react";
import ArtistCard from "./artist-card.js";
import "../App.css";
import Loading from "./loading.js";
import Error from "./error";

class SearchResult extends Component {
  state = {
    loading: false,
    data: {
      similarartists: {
        artist: [],
      },
    },
  };
  componentWillReceiveProps(e) {
    let termino = e.busqueda;
    this.fetchData(
      "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" +
        termino +
        "&api_key=d9d3279ffa908f44ee724d90a48a387d&format=json"
    );
  }
  fetchData = async (url) => {
    this.setState({
      loading: true,
    });
    const reponse = await fetch(url);
    const data = await reponse.json();
    if (data.error) {
      this.setState({
        loading: false,
        error: false,
        errorMensaje: data.message,
      });
    } else {
      this.setState({
        error: false,
        loading: false,
        data: data,
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.loading && <Loading />}
        {this.state.error && <Error errorMensaje={this.state.errorMensaje} />}
        <div className="container">
          <div className="row">
            {this.state.data.similarartists.artist.map((item, i) => {
              return (
                <ArtistCard
                  img={item.image[1]["#text"]}
                  titulo={item.name}
                  key={i}
                />
              );
            })}
          </div>
          <h1>{this.props.busqueda}</h1>
        </div>
      </React.Fragment>
    );
  }
}
export default SearchResult;
