import React from "react";
import { graphql } from "react-apollo";

import { getBookQuery } from "../../queries/";

import styles from "./styles.module.css";

class BookDetails extends React.Component {
  DisplayBookDetails = () => {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>all books by this author</p>
          <ul className={styles.otherBooks}>
            {book.author.books.map((book) => {
              return <li key={book.id}>{book.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>no book selected</div>;
    }
  };
  render() {
    console.log(this.props);
    return (
      <div className={styles.bookDetails}>{this.DisplayBookDetails()}</div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: { id: props.bookId },
    };
  },
})(BookDetails);
