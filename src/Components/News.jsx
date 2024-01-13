import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';



const News = () => {
  const [newsData, setNewsData] = useState([]);


  const formatTimeDifference = (publishedAt) => {
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const timeDifferenceInMillis = now - publishedDate;

    const seconds = Math.floor(timeDifferenceInMillis / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 24) {
      return `${Math.floor(hours / 24)} days ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return 'Just now';
    }
  };


  useEffect(() => {
    const fetchNewsData = async () => {
      try {
       
        const apiKey = 'pub_3586230e0fa74aaace8b03a249bc5e13b6211';
        const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=cryptocurrency`;
        const response = await axios.get(apiUrl);
        setNewsData(response.data.results || []); // Assuming the response has a 'results' property containing an array
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();
   
  }, []);

  return (
    <div className="container mx-auto w-[1080px] mt-8">
      <h1 className="text-3xl font-bold mb-4">Cryptocurrency News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsData.map((newsItem) => (
          <div key={newsItem.id} className="bg-white p-4  relative rounded shadow">
            
            <div className=''>
               <h2 className="text-xl font-bold mb-2">{newsItem.title}</h2>
               <img src={newsItem.image_url} 
                className='' alt=''/>
            </div>
          
            <p className="text-gray-600">{newsItem.description}</p>
            
            <a
              href={newsItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-2 block hover:underline"
            >
              Read more
            </a>

            <div className='absolute  bottom-8 right-5'>
            {formatTimeDifference(newsItem.pubDate)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News
