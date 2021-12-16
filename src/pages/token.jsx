import { Box, Heading, Center, Text } from "@chakra-ui/react";
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
import moment from "moment";
const DummyArray = [
  {
    price: 12.45323454,
    timestamp: moment(1630454400 - 86400).format("hh:mm:ss"),
  },
  {
    price: 12.28232670306461,
    timestamp: moment(1630454400 - 86400 * 2).format("hh:mm:ss"),
  },
  {
    price: 16.78232670306461,
    timestamp: moment(1630454400 - 86400 * 3).format("hh:mm:ss"),
  },
  {
    price: 14.232670306461,
    timestamp: moment(1630454400 - 86400 * 4).format("hh:mm:ss"),
  },
  {
    price: 11.3232670306461,
    timestamp: moment(1630454400 - 86400 * 5).format("hh:mm:ss"),
  },
  {
    price: 11.2232670306461,
    timestamp: moment(1630454400 - 86400 * 6).format("hh:mm:ss"),
  },
  {
    price: 10.0232670306461,
    timestamp: moment(1630454400 - 86400 * 6).format("hh:mm:ss"),
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
      <Center>
        <Box rounded="md" bgColor="gray.200" p="4" my="10">
          <Text textAlign="center" fontWeight="bold">
            Predictions
          </Text>
          <LineChart width={600} height={300} data={DummyArray}>
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Box>
      </Center>
      {/*<LineChart width={600} height={300}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  </LineChart>*/}
    </Box>
  );
};

export default Token;
