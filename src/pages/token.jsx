import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
const DummyArray = [
  {
    price: 12.45323454,
    timestamp: 1630454400 - 86400,
  },
  {
    price: 12.28232670306461,
    timestamp: 1630454400 - 86400 * 2,
  },
  {
    price: 16.78232670306461,
    timestamp: 1630454400 - 86400 * 3,
  },
  {
    price: 14.232670306461,
    timestamp: 1630454400 - 86400 * 4,
  },
  {
    price: 11.3232670306461,
    timestamp: 1630454400 - 86400 * 5,
  },
  {
    price: 11.2232670306461,
    timestamp: 1630454400 - 86400 * 6,
  },
  {
    price: 10.0232670306461,
    timestamp: 1630454400 - 86400 * 6,
  },
];
const Token = () => {
  const address = useParams().address;
  async function fetchPrediction() {
    const res = fetch(
      `http://app-env.eba-hxn3i6de.us-east-2.elasticbeanstalk.com/?f=10&q=%7Btoken%20(id:%220xde30da39c46104798bb5aa3fe8b9e0e1f348163f%22)%7BtokenDayData%7BpriceUSD%20date%7D%7D%7D`,
      {
        mode: "cors",
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log((await res).body);
  }
  useEffect(() => {
    fetchPrediction();
  });
  return (
    <Box p="2">
      <Heading textAlign="center">{address}</Heading>
      <LineChart width={600} height={300} data={DummyArray}>
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
      </LineChart>
      {/*<LineChart width={600} height={300}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  </LineChart>*/}
    </Box>
  );
};

export default Token;
