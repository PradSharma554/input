import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
];

const MyChart = () => (
  <LineChart width={600} height={300} data={data}>
    <CartesianGrid />
    <Line dataKey="uv" />
    <XAxis dataKey="name" />
    <YAxis />
    <Legend />
  </LineChart>
);
export default MyChart;
