import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [page,setPage] = useState(1);
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [totalResults,setTotalResults] = useState(0);

  const updateNews = async() => {
    props.setProgress(20);
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);

    let data = await fetch(url);
    props.setProgress(40);

    let response = await data.json();
    setArticles(response.articles);
    setTotalResults(response.totalResults);
    setLoading(false);

    props.setProgress(100);

  }
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  

  // const handleNextPage = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // }
  
  // const handlePrevPage = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    let nextPage = page + 1;
    setPage(nextPage);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let response = await data.json();
    
    setArticles(articles.concat(response.articles));
    setTotalResults(response.totalResults);
  }

  return (
    <>
      <div className="container">
        <h2 className='my-2 text-capitalize'>Top {props.category} News</h2>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="row m-0">
            {
              // !loading &&
              articles.map((element) => {
                return <div className="col-lg-3 col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 40) : ""}
                    description={element.description ? element.description.slice(0, 50) : element.description}
                    imageUrl={element.urlToImage} newsUrl={element.url}
                    source={element.source.name} author={element.author} date={element.publishedAt}
                  />
                </div>
              })
            }
          </div>

        </InfiniteScroll>

        {/* <div className="container my-4 d-flex justify-content-between">
          <button className="btn btn-dark" onClick={handlePrevPage} disabled={page <= 1}>&larr; Previous</button>
          <button className="btn btn-dark" onClick={handleNextPage} disabled={!(page + 1 <= Math.ceil(totalResults / props.pageSize))}>Next &rarr;</button>
        </div> */}
      </div>
    </>
  )

}
News.defaultProps = {
  pageSize: 10,
  country: 'in',
  category: 'general',
}
News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};


export default News
