// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const datawehave = req.body;
  console.log('datawehavedatawehave', datawehave);
  const BidsMap = (data) => {
    const bids = data.Bids;
    const bidsmap = bids.map((bid) => {
      const amount = Number(bid[1].replace(/[$,]/g, ''));

      //convert data to iso date
      const date = new Date(bid[2]).toISOString();
      return {
        Bidder: bid[0],
        BidType: bid[3],
        Date: date,
        Floor: bid[4],
        Amount: amount,
      };
    });
    return bidsmap;
  };
  const Systemwehave = datawehave['Vehicle Info'][0][3];
  var newStr = Systemwehave.replace('•', '');
  if (newStr.includes('AWD') || newStr.includes('4WD')) {
    newStr = 'AWD';
  } else if (
    newStr.includes('FWD') ||
    newStr.includes('2WD') ||
    newStr.includes('4X2') ||
    newStr.includes('2X4')
  ) {
    newStr = 'FWD';
  } else if (newStr.includes('RWD')) {
    newStr = 'RWD';
  } else {
    newStr = 'FWD';
  }
  const Mileagetosend = datawehave['Vehicle Info'][0][2].replace('•', '');
  const datatosend = {
    data: {
      VehicleType: datawehave['Vehicle Info'][0][0],
      Vin: datawehave['Vehicle Info'][0][1],
      Mileage: Mileagetosend,
      System: newStr,
      Transmission: datawehave['Vehicle Info'][0][5],
      Engine: datawehave['Vehicle Info'][0][6],
      Fuel: datawehave['Vehicle Info'][0][4],
      Bids: [...BidsMap(datawehave)],
      PickupLocation: datawehave['Vehicle Info'][0][7],
      Color: datawehave['Vehicle Info'][0][9],
      Seller: datawehave['Vehicle Info'][0][8],
    },
  };

  // console.log('BidsBidsBidsBids', datatosend.data.Bids);
  // console.log('datatosenddatatosend', datatosend);
  const sendFunction = async () => {
    try {
      let response = await fetch(
        'https://auto-dealers-ai.herokuapp.com/api/cars',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datatosend),
        }
      );
      let data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const respon = await sendFunction();
  res.status(200).json(respon);
}
