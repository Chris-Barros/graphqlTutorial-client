import React from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

//import query you made
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../../queries/";

import styles from "./styles.module.css";

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: "",
    };
  }
  displayAuthors() {
    const { loading, authors } = this.props.getAuthorsQuery;
    console.log(this.props.getAuthorsQuery);

    if (loading) {
      return <option>Loading authors</option>;
    } else {
      return authors.map((author, index) => {
        return (
          <option key={index} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  submitForm = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
  render() {
    return (
      <form onSubmit={this.submitForm} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Book Name:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Genre:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button className={styles.btn}>+</button>
      </form>
    );
  }
}

// export default graphql(getAuthorsQuery)(AddBook);

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
