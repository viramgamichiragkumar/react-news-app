import React from 'react'

const NewsItem = (props) => {
  let {title,description,imageUrl,newsUrl,source,date,author} = props;
  return (
    <>
      <div className="card my-2">
        <div className='d-flex justify-content-right position-absolute end-0'>
          <span className="badge bg-danger">{source}</span>
        </div>
          <img src={imageUrl ? imageUrl : "https://dummyimage.com/150x100/525252/000000"} className="card-img-top" alt="No-img" loading='lazy'/>
          <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toUTCString()}</small></p>
              <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-primary">Read More</a>
          </div>
      </div>
    </>
  )
}

export default NewsItem
