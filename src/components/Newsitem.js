import React from "react";

// snippet : rce (react class export component )
const Newsitem=(props)=> {
  
    //Called object destructing if props is an object "title and destruction" will be avialable pull from props obj
    let { title, description, imageUrl, newsUrl, author, date,source } = props;//props is read-only
    return (
      <div container="my-3">
        <div className="card">
          <div style={{display: 'flex',
                        justifyContent: 'flex-end',
                         position: 'absolute',
                          right: '0'}}>

        <span className=" badge rounded-pill bg-danger">
                {source}
              
              </span>
              </div>
          <img
            src={
              !imageUrl
                ? "https://images.cnbctv18.com/wp-content/uploads/2024/01/japan-3-1019x573.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
             
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;

// new Date(date).toGMTString()
