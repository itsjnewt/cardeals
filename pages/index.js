import axios from 'axios';
import { useState, useEffect } from 'react';
const HomePage = () => {
  const [apiKey, setApiKey] = useState('XOrQSaKC0y9IFVBEMXwi32ksgLWI');
  const [search, setSearch] = useState('');
  const [maxMiles, setmaxMiles] = useState('');
  const [carType, setCarType] = useState('both');
  const [data, setData] = useState([]);
  const [accordions, setAccordions] = useState([]);

  const listItem = '';

  return (
    <div className=''>
      <h1 className='font-bold text-4xl text-center'>Test Model</h1>
      <div className=''>
        <label className=''>API KEY</label>
        <input
          type='text'
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
          value={apiKey}
          className='border border-gray-200 p-2'
        />
      </div>
      <div className='mt-10 m-auto text-center container'>
        <h2 className='font-bold text-2xl mb-3'>Search VIN Here</h2>
        <input
          type='text'
          name='vin'
          placeholder='Enter VIN'
          autoComplete='on'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          className='border border-gray-200 p-2 w-[50%]'
        />
        <select
          onChange={(e) => setCarType(e.target.value)}
          className='border p-2 w-[10%]'
        >
          <option value='both'>Both</option>
          <option value='used'>Used</option>
          <option value='new'>New</option>
        </select>
        <input
          type='text'
          name='maxmiles'
          placeholder='Enter Max Miles'
          autoComplete='on'
          onChange={(e) => {
            setmaxMiles(e.target.value);
          }}
          value={maxMiles}
          className='border border-gray-200 p-2 w-[10%]'
        />
        <button
          className='bg-blue-500 text-white p-2 rounded block m-auto mt-5 w-[50%]'
          onClick={() => {
            var params = carType !== 'both' ? `&car_type=${carType}` : '';
            params += maxMiles ? `&miles_range=0-${maxMiles}` : '';
            params += '&start=0&rows=50';
            var config = {
              method: 'get',
              url: `https://marketcheck-prod.apigee.net/oauth/v2/search/car/active?vins=${search}${params}`,
              headers: {
                Authorization: 'Bearer XOrQSaKC0y9IFVBEMXwi32ksgLWI',
              },
            };

            axios(config)
              .then(function (response) {
                setData(response.data);
                // console.log(response.data);
              })
              .catch(function (error) {
                // console.log(error);
              });
          }}
        >
          Search
        </button>
      </div>
      <div className='mt-10'>
        <h1 className='text-4xl font-bold text-center my-10'>Car Cards</h1>
        <h3 className='text-red-500'>{data.error}</h3>
        <h3 className='text-blue-500 text-2xl font-bold text-center'>
          Total Found:- {data.num_found}
        </h3>
        <div className='grid grid-cols-4 gap-4 mt-10 container m-auto'>
          {data.listings ? (
            data.listings.map((item) => {
              var dealer = item.dealer;
              const text_truncate = (str, length, ending) => {
                if (length == null) {
                  length = 100;
                }
                if (ending == null) {
                  ending = '...';
                }
                if (str.length > length) {
                  return str.substring(0, length - ending.length) + ending;
                } else {
                  return str;
                }
              };
              var image = item.media
                ? item.media.photo_links[0]
                : 'https://pictures.dealer.com/v/vernonautogroupplano/1409/1c2d853d6531365f2f28ad721b8ac89ax.jpg?impolicy=downsize&h=120';
              return (
                <div className='border border-gray-200 p-2'>
                  <h1 className='font-bold text-xl text-center mb-5'>
                    {text_truncate(item.heading, 50, '...')}
                  </h1>
                  <div className=' h-[250px]'>
                    <img src={image} className='w-full h-full' />
                  </div>
                  <p className='mt-3'>
                    MSRP: $ {item.msrp ? item.msrp : 'Call To Know'}
                  </p>
                  <h1 className='text-xl font-bold'>
                    Price: $ {item.price ? item.price : 'Call To Know'}
                  </h1>
                  <h1 className=''>
                    Miles: <b>{item.miles ? item.miles : 'Not Specified'}</b>
                  </h1>
                  <h1 className=''>
                    Availability :{' '}
                    {item.availability_status
                      ? item.availability_status
                      : 'Not Specified'}
                  </h1>
                  <h1 className=''>
                    VIN : {item.vin ? item.vin : 'Not Specified'}
                  </h1>
                  <div
                    className='mb-5 mt-2'
                    onClick={() => {
                      if (accordions.includes(item.id)) {
                        setAccordions(accordions.filter((i) => i !== item.id));
                      } else {
                        setAccordions([...accordions, item.id]);
                      }
                    }}
                  >
                    <p className='text-xl cursor-pointer bg-green-700 text-white text-center font-bold'>
                      More Details
                    </p>
                  </div>
                  {accordions.includes(item.id) ? (
                    <div className='mb-10'>
                      <ul className=''>
                        <li className={listItem}>
                          Dealer name: <b>{dealer.name}</b>
                        </li>
                        <li className={listItem}>
                          Dealer website: {dealer.website}
                        </li>
                        <li className={listItem}>
                          Dealer Street: {dealer.street}
                        </li>
                        <li className={listItem}>
                          Dealer city: <b>{dealer.city}</b>
                        </li>
                        <li className={listItem}>
                          Dealer State: <b>{dealer.state}</b>
                        </li>{' '}
                        <li className={listItem}>Dealer Zip: {dealer.zip}</li>
                        <li className={listItem}>
                          Dealer Type: {dealer.dealer_type}
                        </li>
                      </ul>
                    </div>
                  ) : null}
                  <div className='text-center'>
                    <a
                      href={item.vdp_url}
                      target='_blank'
                      className='bg-blue-500 text-white p-2 rounded'
                    >
                      View Details
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Data</h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
