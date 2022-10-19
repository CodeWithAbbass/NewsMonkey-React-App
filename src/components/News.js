import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  CapitalizeFirstChar = (String) => {
    return String.charAt(0).toUpperCase() + String.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      Loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = this.CapitalizeFirstChar(`${this.props.category} - NewsMonkey`);
  }

  async newsUpdate() {
    this.props.setProgress(10)
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ Loading: true })
    this.props.setProgress(30)
    const response = await fetch(URL); // "GET" Method is by Default in Fetch, Thats Because We Don't Need to Write "GET"
    const data = await response.json(); // Convert Json Data Into JavaScript Object. Parsing...
    this.props.setProgress(50)

    // console.log(data)
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      Loading: false
    });
    this.props.setProgress(100)

  }

  fetchMoreData = async () => {
    this.setState({ Loading: true, page: this.state.page + 1, })
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const response = await fetch(URL); // "GET" Method is by Default in Fetch, Thats Because We Don't Need to Write "GET"
    const data = await response.json(); // Convert Json Data Into JavaScript Object. Parsing...
    // console.log(data)
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
      Loading: false,
    })

  };
  //  Its Call After render() Method
  async componentDidMount() {
    this.newsUpdate();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.newsUpdate();
  };
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.newsUpdate();
  };
  render() {
    return (
      <div className="container text-center my-5" >
        <h1>NewsMonkey - Top {this.CapitalizeFirstChar(`${this.props.category}`)} Headlines</h1>
        {/* Below We Use Infinit Scroll. If We Want to Use Loading Spinner Please Comment Just Below InfiniteScroll */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}>
            
          <div className="row container mt-5" >
            {/* For Loading Spinner Please UnComment Below Code AND Comment Above InfinitScroll */}
            {/* {!this.state.Loading && this.state.articles.map((obj) => { */}
            {this.state.articles.map((obj, index) => {
              return (
                <div className="col-md-4 g-4" key={index}>
                  <NewsItem
                    title={obj.title ? obj.title.slice(0, 30) : ""}
                    source={obj.source.name}
                    description={obj.description ? obj.description.slice(0, 70) : "Description Not Found"}
                    author={obj.author ? obj.author.slice(0, 15) : ""}
                    date={obj.publishedAt}
                    imageUrl={obj.urlToImage}
                    newUrl={obj.url}
                  />
                </div>
              );
            })}
            {/* UnComment If We Use Loading Spinner  */}
            {/* {this.state.Loading && <Loading/>} */}
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
        </InfiniteScroll>

        {/* 
        Previous And Next Buttons 
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
        </div> */}
      </div>
    );
  }
}

export default News;
