import React from "react";

import { graphql } from "react-apollo";

//import the querie you need
import { getBooksQuery } from "../../queries/";
import BookDetails from "../BookDetails";

import styles from "./styles.module.css";

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return <div>loading books</div>;
    } else {
      return data.books.map((book, index) => {
        return (
          <li key={index} onClick={(e) => this.setState({ selected: book.id })}>
            {book.name}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <ul className={styles.bookList}>{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

//this stores the data grom graphql to this components props

export default graphql(getBooksQuery)(BookList);
