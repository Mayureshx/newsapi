import React, {useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


// snippet : rce (react class export component )
const News=(props)=> {
const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);
const [page, setPage] = useState(1);
const [totalResults, setTotalResults] = useState(0);


 

  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


    const updateNews=async()=>{
     props.setProgress(10);
      
        
      console.log("cmd")
      //pageSize : is method of api that represents "single-page" has "20 Articles"
    //  let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=891ae243852c4c09bb232ba4d42168f7&page=${page}&pageSize=${props.pageSize}`

    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
     setLoading(true);
    
     let data = await fetch(url)
     props.setProgress(30);
     let parsedData= await data.json()
     props.setProgress(70);
     console.log(parsedData)

     //setting state using obj key-value
     setArticles(parsedData.articles);
     setTotalResults(parsedData.totalResults);
     setLoading(false)

    props.setProgress(100);

    }

    //The useEffect Hook allows you to perform side effects in your components.

// Some examples of side effects are: fetching data, directly updating the DOM, and timers.

// useEffect accepts two arguments. The second argument is optional.

// useEffect(<function>, <dependency>)
//useEffect runs on every render.(Same as ComponentDidMount)
    useEffect(() => {
       document.title=`${capitalizeFirstLetter(props.category)} - NewMonkey`
      updateNews();
    //eslint-disable-next-line

    }, [])//if want to run effect  only for the initial/First render then use empty [].
    //[count] if want Hook that is dependent on a variable (count) ,  If the count variable updates, the effect will run again
    //Some effects require cleanup to reduce memory leaks.

// Timeouts, subscriptions, event listeners, and other effects that are no longer needed should be disposed.

// We do this by including a return function at the end of the useEffect Hook.

// return () => clearTimeout(timer)
// }, []);
    
    
    
    
    
   // const handlePrevClick=async()=>{

        // console.log("previous")

        // let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=891ae243852c4c09bb232ba4d42168f7&page= ${page - 1}&pageSize=${props.pageSize}`;
       // setLoading(true);
       
        // let data = await fetch(url)
        // let parsedData= await data.json()
        // console.log(parsedData)
        // setPage(page-1);
        // setArticles(parsedData.articles);
        // setLoading(false);
       
       // setPage(page-1);//first seting page for previous then calling fun

  
    //     updateNews();

    // }

    // const handleNextClick=async()=>{

    //     console.log("Next")
    //     //3>2 -> "goes to else block"
    //     if(!(page + 1 > Math.ceil(totalResults/props.pageSize)))//Math.ceil : 38/20 = 1.9 if after "." num>before "." num then reult is "next num" of before "." num or else result is "previous num" of before "." num
    //    {
    //     let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=891ae243852c4c09bb232ba4d42168f7&page= ${page + 1}&pageSize=${props.pageSize}`;
          // setLoading(true); 
   
    //     let data = await fetch(url)
    //     let parsedData= await data.json()
    //     console.log(parsedData)

    // setPage(page+1);
    // setArticles(parsedData.articles);
    // setLoading(false);
   


    // }

   // setPage(page+1);//first seting page for next then calling fun

//     updateNews();
// }


const fetchMoreData = async() => {

 
  let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`
  setPage(page+1);//cause its asyn fun 
  //  this.setState({loading : true});
     let data = await fetch(url)
     let parsedData= await data.json()
     console.log(parsedData)

     //setting state using obj key-value
     setArticles(articles.concat(parsedData.articles));
     setTotalResults(parsedData.totalResults);
   
};

    return (
      
     
      <>
       {console.log("return")}
     
      <h1 className='text-center ' style={{margin: '35px 0px',marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>

      {loading && <Spinner/>} 
      {/* if loading is "true" then only load "Spinner" comp */}
      
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={ <Spinner/>}
        >

      <div className="container">
      <div className="row">

        {/* when you iterate thrugh "map()" each element should be identify uniqually .i.e In our case is "url" */}
      {/* {!loading && articles.map((element)=> */}

       {/* BCOZ to use infinite scroll */}
      { articles.map((element)=>
      
      {
         {/* medium devices . In bootstrap u have 12 grids and col md -4 specifices 4 grids the 
        4*3 = 12 so it captures whole container */}

      return  <div className="col-md-4" key={element.url} >
      <Newsitem title={!element.title ? "" :element.title.slice(0,45)} description={!element.description ? "" : element.description.slice(0,88)} 
      imageUrl= {element.urlToImage}
      newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
      </div>
      
      })}

      </div>
       </div>
       </InfiniteScroll>
      
      {/* <div className="container d-flex justify-content-between my-4">
      <button disabled = {page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
      <button disabled ={(page + 1 > Math.ceil(totalResults/props.pageSize))} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div> */}
      {/* larr; : left arrow   ,  rarr; : right arrow   */}

   
      </>
     
    )
  
}

News.defaultProps={
  country : 'in',
  pageSize : '8',
  category : 'general',
}

News.propTypes={
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}

export default News





// imageUrl= {!element.urlToImage ? "https://images.cnbctv18.com/wp-content/uploads/2024/01/japan-3-1019x573.jpg" : element.urlToImage}
// newsUrl={element.url}/>




// articles = [
//     {
//       "source": { "id": "al-jazeera-english", "name": "Al Jazeera English" },
//       "author": "Kevin Hand",
//       "title": "LIVE: New Zealand vs Pakistan – fourth T20 cricket match",
//       "description": "Follow our live build-up and full text commentary as New Zealand host Pakistan in the fourth T20 of the series.",
//       "url": "https://www.aljazeera.com/sports/liveblog/2024/1/19/live-new-zealand-vs-pakistan-fourth-t20-cricket-match",
//       "urlToImage": "httpswww.aljazeera.com/wp-content/uploads/2024/01/34EN2YZ-highres-1705046551.jpg?resize=1920%2C1440",
//       "publishedAt": "2024-01-19T04:://11:49Z",
//       "content": "blinking-dot\r\nLive updatesLive updates, \r\nFollow our live build-up and full text commentary as New Zealand host Pakistan in the fourth T20 of the series."
//     },
//     {
//       "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
//       "author": null,
//       "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
//       "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
//       "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
//       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
//       "publishedAt": "2020-04-27T11:41:47Z",
//       "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
//     },
//     {
//       "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
//       "author": null,
//       "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
//       "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
//       "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
//       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
//       "publishedAt": "2020-03-30T15:26:05Z",
//       "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
//     }
//   ]

