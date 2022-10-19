import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newUrl, author, date, source } = this.props;
    return (
      <div className=''>
        <div className="card shadow rounded" style={{ width:"100%", height:"30rem",}}>
          <span className="badge rounded-0 bg-danger" style={{display:"flex",
          justifyContent:"flex-end",
          position:"absolute",
          right:"0",}}>
        {source}
        </span>
        <img className="card-img-top" src={imageUrl ? imageUrl : "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"} alt="img" style={{ height: "13rem" }} />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"}</small></p>
          <p className="card-text"><small className="text-muted">{new Date(date).toGMTString()}</small></p>
          <a href={newUrl} className="btn btn-sm btn-dark" target={"noreferrer"}>Read More</a>

        </div>
      </div>
      </div >
      )
  }
}

export default NewsItem;
