import React from 'react'

const NewsItem =(props)=>{
    let{title,description,imageUrl,newsUrl,author,date,source}=props;
    return (
      <div className='my-3'>
          <div className="card" >
            <span className=' position-absolute top-0 translate-middle badge rounded-pill bg-danger' style={{left:'80%',zIndex:'1'}}>{source}</span>
              <img src={!imageUrl?"https://tse3.explicit.bing.net/th?id=OIP.AC9frN1qFnn-I2JCycN8fwHaEK&pid=Api&P=0":imageUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className='card-text'><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
              </div>
          </div>
      </div>
      
    )
  
}
// badge rounded-pill bg-danger
export default NewsItem