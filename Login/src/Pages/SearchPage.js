import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSearchedNews } from "../Redux/actions/newsAction";
import SearchedNews from "../Components/searchedNews";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class SearchPage extends Component {
  componentDidMount() {
    const searchQuery = this.props.match.params.searchQuery;
    console.log("I am getting mounted");
    this.props.fetchSearchedNews(searchQuery);
  }

  componentDidUpdate(prevProps) {
    const prevSearchQuery = prevProps.match.params.searchQuery;
    const newSearchQuery = this.props.match.params.searchQuery;
    if (prevSearchQuery !== newSearchQuery) {
      this.props.fetchSearchedNews(newSearchQuery);
    }
  }
  render() {
    // console.log(this.props.news);
    if (!this.props.news) {
      return (
        <>
          <Navbar />
          <Search />
          <div className='sweet-loading'>
            <PuffLoader
              css={override}
              size={150}
              color={"#123abc"}
              loading={true}
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <Search />
          <SearchedNews news={this.props.news} mode='search' />{" "}
        </>
      );
    }
  }
}
const mapStateToProps = (storeState) => {
  console.log(storeState.newsState.news);
  return {
    news: storeState.newsState.news,
  };
};

export default connect(mapStateToProps, { fetchSearchedNews })(SearchPage);
