import Link from 'next/link';
const carSingle = ({ car }) => {
  console.log('car', car);
  car = car?.attributes;
  const rowStyle = 'border border-gray-200 p-2';
  const colStyle = 'border border-gray-200 p-2';
  var HightestBid;
  if (car?.Bids.length > 0) {
    HightestBid = car?.Bids?.reduce((prev, current) => {
      return prev.Amount > current.Amount ? prev : current;
    })?.Amount;
  } else {
    HightestBid = 0;
  }
  var LowestFound;
  if (car?.FoundCars.length > 0) {
    LowestFound = car?.FoundCars?.reduce((prev, current) => {
      return prev.Price > current.Price ? prev : current;
    })?.Price;
  } else {
    LowestFound = 0;
  }
  const ROI = ((HightestBid - LowestFound) / LowestFound).toFixed(2);
  return (
    <div>
      <h1 className='text-4xl font-bold text-center'>Car Single</h1>
      <div className=''>
        <Link href='/'>
          <button className='bg-blue-700 text-2xl text-white p-5'>Back</button>
        </Link>
      </div>
      {car && (
        <div className='container m-auto mt-10'>
          <table className='w-full'>
            <thead>
              <tr className={rowStyle}>
                <th className={colStyle}>Vehicle Type</th>
                <th className={colStyle}>Vin</th>
                <th className={colStyle}>Mileage</th>
                <th className={colStyle}>System</th>
                <th className={colStyle}>Engine</th>
                <th className={colStyle}>Fuel</th>
                <th className={colStyle}>Transmission</th>
                <th className={colStyle}>Interior</th>
                <th className={colStyle}>PickupLocation</th>
                <th className={colStyle}>Color</th>
                <th className={colStyle}>HightestBid</th>
                <th className={colStyle}>LowestFound</th>
                <th className={colStyle}>ROI</th>
              </tr>
            </thead>
            <tbody>
              <tr className={rowStyle}>
                <td className={colStyle}>{car.VehicleType}</td>
                <td className={colStyle}>{car.Vin}</td>
                <td className={colStyle}>{car.Mileage}</td>
                <td className={colStyle}>{car.System}</td>
                <td className={colStyle}>{car.Engine}</td>
                <td className={colStyle}>{car.Fuel}</td>
                <td className={colStyle}>{car.Transmission}</td>
                <td className={colStyle}>{car.Interior}</td>
                <td className={colStyle}>{car.PickupLocation}</td>
                <td className={colStyle}>{car.Color}</td>
                <td className={colStyle}>{HightestBid}</td>
                <td className={colStyle}>{LowestFound}</td>
                <td className={colStyle}>{ROI}</td>
              </tr>
            </tbody>
          </table>

          <div className=''>
            <div className='m-auto mt-10'>
              <h2 className='text-2xl font-bold text-center'>BIDS</h2>
              <table className='w-full'>
                <thead>
                  <tr className={rowStyle}>
                    <th className={colStyle}>ID</th>
                    <th className={colStyle}>Bidder</th>
                    <th className={colStyle}>Amount</th>
                    <th className={colStyle}>Date</th>
                    <th className={colStyle}>BidType</th>
                    <th className={colStyle}>Floor</th>
                  </tr>
                </thead>
                <tbody>
                  {car?.Bids.map((bid) => {
                    var isHighestBid = bid.Amount == HightestBid;
                    const date = new Date(bid.Date).toDateString();
                    return (
                      <tr
                        className={isHighestBid && 'bg-green-500 ' + rowStyle}
                        key={bid.id}
                      >
                        <td className={colStyle}>{bid.id}</td>
                        <td className={colStyle}>{bid.Bidder}</td>
                        <td className={colStyle}>{bid.Amount}</td>
                        <td className={colStyle}>{date}</td>
                        <td className={colStyle}>{bid.BidType}</td>
                        <td className={colStyle}>{bid.Floor}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className=''>
            <div className='m-auto mt-10'>
              <h2 className='text-2xl font-bold text-center'>Found Cars</h2>
              <table className='w-full'>
                <thead>
                  <tr className={rowStyle}>
                    <th className={colStyle}>ID</th>
                    <th className={colStyle}>Title</th>
                    <th className={colStyle}>Price</th>
                    <th className={colStyle}>Location</th>
                    <th className={colStyle}>URL</th>
                    <th className={colStyle}>Website</th>
                  </tr>
                </thead>
                <tbody>
                  {car?.FoundCars &&
                    car?.FoundCars.map((car) => {
                      var isLowest = LowestFound === car.Price;
                      return (
                        <tr
                          className={
                            isLowest && 'bg-red-500 text-white ' + rowStyle
                          }
                          key={car.id}
                        >
                          <td className={colStyle}>{car.id}</td>
                          <td className={colStyle}>{car.Title}</td>
                          <td className={colStyle}>{car.Price}</td>
                          <td className={colStyle}>{car.Location}</td>
                          <td className={colStyle}>{car.URL}</td>
                          <td className={colStyle}>{car.Website}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default carSingle;

export async function getServerSideProps({ params }) {
  const { id } = params;

  const response = await fetch(
    `https://auto-dealers-ai.herokuapp.com/api/cars/${id}?populate=*`
  );
  const data = await response.json();
  console.log('data', data);
  return {
    props: { car: data.data, id }, // will be passed to the page component as props
  };
}
