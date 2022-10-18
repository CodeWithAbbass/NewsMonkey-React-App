import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {
    let { title, description, imageUrl, newUrl} = this.props;
    return (
      <div className=''>
        <div className="card shadow-lg p-3 bg-body rounded" style={{ width: "100%",height: "25rem",}}>
          <img className="card-img-top" src={imageUrl?imageUrl:"https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"} alt="img" style={{height: "13rem"}}/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newUrl} className="btn btn-sm btn-dark" target={"noreferrer"}>Read More</a>
          </div>
        </div>
      </div>
      )
  }
}

export default NewsItem;
