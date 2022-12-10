const AxiomTest = () => {
  const datawehave = {
    "Vehicle Info": [
      [
        "2018 Audi Q5 Tech Prestige",
        "WA1CNAFY3J2017750",
        "•83,952mi",
        "•2.0L 4 Cyl•Gasoline•Auto",
        "•AWD",
      ],
    ],
    Bids: [
      [
        "MY AUTO CHOICE LLC",
        "18,600",
        "11/26/2022 12:16:01 PM",
        "Proxy Bid",
        "Floor Met",
      ],
      [
        "MSI AUTO SALES AND REPAIR LLC",
        "18,500",
        "11/26/2022 12:16:01 PM",
        "Proxy Bid",
        "Floor Met",
      ],
      [
        "MSI AUTO SALES AND REPAIR LLC",
        "16,600",
        "11/26/2022 2:50:09 AM",
        "Proxy Bid",
        "Floor Met",
      ],
      ["VNC INC", "16,500", "11/26/2022 2:50:09 AM", "Proxy Bid", "Floor Met"],
      ["VNC INC", "16,200", "11/25/2022 10:39:01 PM", "Proxy Bid", "Floor Met"],
      [
        "CITY VOLKSWAGEN OF CHICAGO",
        "16,100",
        "11/25/2022 10:39:01 PM",
        "Proxy Bid",
        "Floor Met",
      ],
      ["VNC INC", "13,800", "11/25/2022 9:26:53 AM", "Proxy Bid", "Floor Met"],
      [
        "EUROPEAN AUTO CENTER",
        "13,700",
        "11/25/2022 9:26:53 AM",
        "Hard Bid",
        "Floor Met",
      ],
      ["VNC INC", "13,600", "11/25/2022 8:47:40 AM", "Proxy Bid", "Floor Met"],
      [
        "AUTO ADVANTAGE",
        "13,500",
        "11/25/2022 8:47:40 AM",
        "Proxy Bid",
        "Floor Met",
      ],
      ["VNC INC", "12,500", "11/25/2022 12:42:32 AM", "Proxy Bid", "Floor Met"],
      [
        "SELECT AUTOMOTIVE.COM",
        "12,400",
        "11/25/2022 12:42:32 AM",
        "Proxy Bid",
        "Floor Met",
      ],
      ["VNC INC", "11,400", "11/24/2022 10:22:58 AM", "Proxy Bid", "Floor Met"],
      [
        "SELECT AUTOMOTIVE.COM",
        "11,300",
        "11/24/2022 10:22:58 AM",
        "Hard Bid",
        "Floor Met",
      ],
      ["VNC INC", "11,200", "11/24/2022 8:52:27 AM", "Proxy Bid", "Floor Met"],
      [
        "AUTO UNION INC",
        "11,100",
        "11/24/2022 8:52:27 AM",
        "Proxy Bid",
        "Floor Met",
      ],
      [
        "AUTO UNION INC",
        "11,000",
        "11/24/2022 3:10:38 AM",
        "Proxy Bid",
        "Floor Met",
      ],
    ],
  };
  //This is data you may have scraped in a previous step
  // const datahere = [scrape - data - this - loop];
  // const bids = [scrape - data - this - loop_1];
  //This function will send a request to an endpoint
  const BidsMap = (data) => {
    const bids = data.Bids;
    const bidsmap = bids.map((bid) => {
      //convet amount to number without ,
      const amount = Number(bid[1].replace(/,/g, ""));
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

  const datatosend = {
    data: {
      VehicleType: datawehave["Vehicle Info"][0][0],
      Vin: datawehave["Vehicle Info"][0][1],
      Mileage: datawehave["Vehicle Info"][0][2],
      System: "AWD",
      Bids: [...BidsMap(datawehave)],
    },
  };
  console.log(datatosend);
  async function fetchAsync() {
    try {
      let response = await fetch(
        "https://auto-dealers-ai.herokuapp.com/api/cars",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
  }
  fetchAsync();
};
export default AxiomTest;
