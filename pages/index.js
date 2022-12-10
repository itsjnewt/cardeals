import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import AxiomTest from "../lib/axiomtry";
export default function Home({ cars }) {
  // console.log("cars", cars);
  const [data, setData] = useState(cars ? cars : []);
  const rowStyle = "border border-gray-200 p-2";
  const colStyle = "border border-gray-200 p-2";
  // AxiomTest();
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold text-center">HEY THERE TESTING THIS</h1>
      <div className="mt-10">
        {Object.keys(data).length > 0 && (
          <table className="m-auto">
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
                <th className={colStyle}>MRR</th>
                <th className={colStyle}>Highest Bid</th>
                <th className={colStyle}>Lowest Found</th>
                <th className={colStyle}>ROI</th>
                <th className={colStyle}>SINGLE</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((car) => {
                var carData = car.attributes;
                const HightestBid = carData?.Bids?.reduce((prev, current) => {
                  return prev.Amount > current.Amount ? prev : current;
                })?.Amount;
                const LowestFound =
                  carData?.FoundCars.length > 0
                    ? carData?.FoundCars?.reduce((prev, current) => {
                        return prev.Price > current.Price ? prev : current;
                      })?.Price
                    : 0;
                const ROI = ((HightestBid - LowestFound) / LowestFound).toFixed(
                  2
                );
                return (
                  <tr className={rowStyle} key={car.id}>
                    <td className={colStyle}>{carData.VehicleType}</td>
                    <td className={colStyle}>{carData.Vin}</td>
                    <td className={colStyle}>{carData.Mileage}</td>
                    <td className={colStyle}>{carData.System}</td>
                    <td className={colStyle}>{carData.Engine}</td>
                    <td className={colStyle}>{carData.Fuel}</td>
                    <td className={colStyle}>{carData.Transmission}</td>
                    <td className={colStyle}>{carData.Interior}</td>
                    <td className={colStyle}>{carData.PickupLocation}</td>
                    <td className={colStyle}>{carData.Color}</td>
                    <td className={colStyle}>{carData?.Price}</td>
                    <td className={colStyle}>{HightestBid}</td>
                    <td className={colStyle}>{LowestFound}</td>
                    <td className={colStyle}>{ROI}</td>
                    <td className={colStyle}>
                      <Link href={`/car/${car.id}`}>
                        <FiExternalLink className="inline bg-blue-700 text-4xl text-white p-1" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    "https://auto-dealers-ai.herokuapp.com/api/cars?populate=*"
  );
  const data = await res.json();
  return {
    props: { cars: data },
  };
}
