import React, { Component } from "react";
import SearchBar from "./components/search-bar.js";
import "./page-artist.css";
import SimilarArist from "./components/similar-artist.js";
import Loading from "./components/loading.js";
import Error from "./components/error";

class PageArtist extends Component {
  state = {
    data: {
      artist: {
        name: "",
        bio: { summary: "" },
        image: [{ "#text": "" }, { "#text": "" }, { "#text": "" }],
        similar: {
          artist: [
            {
              name: "",
              url: "",
              image: [{ "#text": "" }, { "#text": "" }, { "#text": "" }],
            },
          ],
        },
      },
    },
  };
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.fetchData();
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    let artista = this.props.history.location.search.substr(1);
    let url =
      "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
      artista +
      "&api_key=d9d3279ffa908f44ee724d90a48a387d&format=json";
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
        <SearchBar
          onChange={this.changeHandle}
          busqueda={this.state.busqueda}
        />
        <div className="container">
          <div className="row centrar">
            <div className="col-md-3" />
            <div className="col-md-6">
              <img
                src={this.state.data.artist.image[2]["#text"]}
                alt="Foto"
                className="pic-artist margenes50"
              />
              <h2>{this.state.data.artist.name}</h2>
              <p>{this.state.data.artist.bio.summary}</p>
            </div>
          </div>
          <div className="centrar">
            <SimilarArist data={this.state.data.artist.similar.artist} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default PageArtist;
