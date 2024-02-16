import React, { Component } from 'react'
import './NewsItem.css';
export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, publishedAt, author, newsUrl} = this.props;
    return (
      <div className='card-main'>
        <div className="card">
          <img src={imageUrl} alt="Card Image" />
          <div className="card-content">
            <p>{title}</p>
            <p>{description}...</p>
            <p>{publishedAt}...</p>
            <p>Author:- {author ? author:'Unknown'}...</p>
            <a href={newsUrl} >Read more</a>
           </div>
        </div>
      </div>
    )
  } 
}

export default NewsItem
