import React from "react";
import ArtistCard from "./artist-card.js";

class SimilarArtist extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="centrar  margenes50">
          <h5>Similar Artist</h5>
          <hr />
        </div>
        <div className="row">
          {this.props.data.slice(0, 4).map((item, i) => {
            return (
              <ArtistCard
                img={item.image[2]["#text"]}
                titulo={item.name}
                key={i}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default SimilarArtist;
