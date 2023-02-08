import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'; 
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
const News =(props)=>{
  // articles=
          
  //     [{"source":{"id":"bbc-sport","name":"BBC Sport"},"author":null,"title":"England seek six wickets to win series against Pakistan - radio & text","description":"Follow live text updates and BBC Test Match Special commentary from day four of the second Test between England and Pakistan at the Multan Cricket Stadium.","url":"http://www.bbc.co.uk/sport/live/cricket/62865936","urlToImage":"https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.23.3/images/bbc-sport-logo.png","publishedAt":"2022-12-12T04:52:27.0048057Z","content":"Saud Shakeel is still there for Pakistan, unbeaten on 54, and looks to key to their chances of levelling the series.\r\nHe's got Faheem Ashraf for company, Agha Salman is still to come and Mohammad Naw… [+127 chars]"},
  //     {"source":{"id":"espn-cric-info","name":"ESPN Cric Info"},"author":null,"title":"PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com","description":"Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com","url":"http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket","urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg","publishedAt":"2020-04-27T11:41:47Z","content":"Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"},
  //     {"source":{"id":"espn-cric-info","name":"ESPN Cric Info"},"author":null,"title":"What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com","description":"Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com","url":"http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again","urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg","publishedAt":"2020-03-30T15:26:05Z","content":"Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"}]
    
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
   
  const capitalizeFirstLetter=(string)=>{
  return string.charAt(0).toUpperCase()+string.slice(1);
}

 const updateNews = async( )=>{
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data=await fetch(url);
    props.setProgress(30);
    let parseData=await data.json()
    props.setProgress(70);
    console.log(parseData);
    setarticles(parseData.articles)
    settotalResults(parseData.totalResults)
    setloading(false)
    props.setProgress(100);
  }
  useEffect(()=>{
    document.title=`${props.category}-NewsMonkey`;
    updateNews();
  },[])
  
  const handlePrevClick=async()=>{
      setPage(page - 1)
      updateNews()
  }
  const handleNextClick=async()=>{
    console.log("next")
      setPage(page + 1)
      updateNews()
  }
  const fetchMoreData=async()=>{
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data=await fetch(url);
    let parseData=await data.json()
    console.log(parseData);
    setarticles(articles.concat(parseData.articles))
    settotalResults(parseData.totalResults)
    };
   
     return (
       <div className='container my-3'>
        <h1 className='text-center'>NewsMonkey - Top {props.category} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!== totalResults}
          loader={<Spinner/>}
        >
        <div className='container'>  
          <div className="row">
          {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):" "} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
          </div>
          </div>  

        </InfiniteScroll>  
          {/* <div className='container d-flex justify-content-between'>
            {/* <button disabled={page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr;</button> */}
            {/* disabled={page<=1} */}
          {/* </div> */} 
       </div>
       
     )
    }
 
  
News.defaultProps={
  country:'in',
  pageSize: 8,
  category:'general',
} 
News.propTypes={
country:PropTypes.string,
pageSize:PropTypes.number,
category:PropTypes.string,
}  
 export default News