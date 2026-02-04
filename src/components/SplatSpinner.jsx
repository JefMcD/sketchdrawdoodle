
import { useState, useEffect, useRef } from "react";

const messageList = [
  "Loading...",
  "Searching the collections...",
  "Checking the basement",
  "This might take a moment – fetching millions of records",
  "Yes these look cool!",
  "Still working on it...",
  "Unearthing some weird stuff in the crypt",
  "Hang tight, nearly there",
  "So dusty down here",
  "Need some air",
  "looking in the attic",
  "Down to the Archives",
  "Just a little longer...",
  "The Librarian is getting suspicous",
  "This looks interesting ...",
  "Was .. that .. a ..",
  "Nah.. its just my mind playing tricks ...",
  "Almost done!"
];

export default function SplatSpinner(){
  const [messageIndex, setMessageIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Start cycling messages every 4 seconds (slightly longer than 3 to feel natural)
    intervalRef.current = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messageList.length);
    }, 4000);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array: only run once on mount

  const message = messageList[messageIndex];

  return(
  <>
    <div className='spinner'>
        <div className='svg-star-icon'>
            <svg
                width="50"
                height="50"
                viewBox="0 0 13.229166 13.229167"
                version="1.1"
                preserveAspectRatio="xMidYMid meet" 
                id="svg-star-spinner"
            >
                <defs id="star-spinner-defs" transform="translate(1, 1)" />
                <g id="g-star-spinner" >
                    <path
                        id="path1-star-spinner"
                        d="M 7.1207793,6.9954352 6.7018597,6.9029425 6.4084576,7.2159342 6.3669701,6.7889361 5.9786312,6.6066139 6.3719101,6.4352073 6.4253055,6.0095344 6.7098527,6.3305973 7.1311918,6.2498391 6.9137728,6.6196735 Z"
                        transform="matrix(9.3517905,0,0,9.3517905,-55.229332,-55.251031)" 
                    />
                </g>
            </svg>
        </div>
        <div className = "loading-message">
            {message}
        </div>
    </div>
  
  </>
  )
}