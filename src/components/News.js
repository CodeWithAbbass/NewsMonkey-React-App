import React, { Component } from "react";
import NewsItem from "./NewsItem";

// My API
// 1f05d798e5904ebe804e9a7edc39771d
export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  // Its Call After render() Method
  async componentDidMount() {
    const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1f05d798e5904ebe804e9a7edc39771d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const response = await fetch(URL); // "GET" Method is by Default in Fetch, Thats Because We Don't Need to Write "GET"
    const data = await response.json(); // Convert Json Data Into JavaScript Object. Parsing...
    // console.log(data)
    this.setState({ articles: data.articles, totalResults: data.totalResults });
    // Below We Use Props like title, description, image
  }

  handlePrevClick = async () => {
    const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1f05d798e5904ebe804e9a7edc39771d&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    const response = await fetch(URL); // "GET" Method is by Default in Fetch, Thats Because We Don't Need to Write "GET"
    const data = await response.json(); // Convert Json Data Into JavaScript Object. Parsing...
    this.setState({
      articles: data.articles,
      page: this.state.page - 1,
    });
  };
  handleNextClick = async () => {
    // console.log("Next")
    const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1f05d798e5904ebe804e9a7edc39771d&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    const response = await fetch(URL); // "GET" Method is by Default in Fetch, Thats Because We Don't Need to Write "GET"
    const data = await response.json(); // Convert Json Data Into JavaScript Object. Parsing...
    this.setState({
      articles: data.articles,
      page: this.state.page + 1,
    });
  };
  render() {
    return (
      <div className="container text-center my-5">
        <h1>NewsMonkey - Top Headlines</h1>
        <div className="row mt-5">
          {this.state.articles.map((obj) => {
            return (
              <div className="col-md-4 g-4" key={obj.url}>
                <NewsItem
                  title={obj.title ? obj.title.slice(0, 30) : ""}
                  description={
                    obj.description ? obj.description.slice(0, 70) : ""
                  }
                  imageUrl={obj.urlToImage}
                  newUrl={obj.url}
                />
              </div>
            );
          })}

          {/* 
                    // This is Simplest Example
                    <div className="col-md-4 g-4 ">
                        <NewsItem
                        title="MyTitle"
                        description="This is Description"
                        imageUrl="https://d.newsweek.com/en/full/1987118/oracle-advertising-cx-sq.jpg"
                        />
                    </div> */}
        </div>
        <div className="container d-flex justify-content-between mt-5">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-sm btn-dark btn-border-dark"
            type="button"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults /`${this.props.pageSize}`)
            }
            className="btn btn-sm btn-dark btn-border-dark"
            type="button"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
