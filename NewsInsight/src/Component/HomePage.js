import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';

export class HomePage extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 7
  }

  articles = []
  constructor(){
    super();
    this.state ={
      articles: this.articles,
      loading: false,
      page:1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${ this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json() 
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
  }

  handleprevclick= async ()=>{
    console.log("Next");
    if (!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${ this.props.apiKey}&page=
    ${this.state.page -1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json() 
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }
}

  hanlenextclick=async()=>{
    if (!(this.state.page +1 > Math.ceil(this.state.totalREsults/this.props.pageSize))){ 
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${ this.props.apiKey}&page=
    ${this.state.page +1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json() 
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
  }
}
 

  render() {
    return (
      <> 
      <div className='container'>
       <h1 className='my-2'> DailyNews - Top headline </h1>
       {this.state.loading && <Spiner/>}
       <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title?element.title.slice(): ""} author={element.author} publishedAt={element.publishedAt?element.publishedAt.slice(0,10): ""} description={element.description?element.description.slice(): ""} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
        })}
    
       </div>
      </div>
      <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1}  type="button" className="btn btn-dark mb-5" onClick={this.handleprevclick}>&larr; Previous</button>
       <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark mb-5" onClick={this.hanlenextclick}>Next &rarr;</button>
      </div>
      </>
    )
  }
}

export default HomePage
