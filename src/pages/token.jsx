import { Box, Heading, Center, Text, Avatar } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import NotFound from "./notFound";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";
const Token = () => {
  const address = useParams().address;
  const TOKEN_NAME = gql`
    query ($address: String!) {
      token(id: $address) {
        name
        symbol
      }
    }
  `;

  const [predictions, setPredictions] = useState();
  const { loading, error, data } = useQuery(TOKEN_NAME, {
    variables: { address },
  });
  async function fetchPrediction() {
    try {
      const res = fetch(
        `http://app-env.eba-hxn3i6de.us-east-2.elasticbeanstalk.com/?f=10&q=%7Btoken%20(id:%22${address}%22)%7BtokenDayData%7BpriceUSD%20date%7D%7D%7D`
      );
      const info = await (await res).json();
      const fetchedPredictions = info.predictions.map((prediction, i) => {
        const time = new Date(
          Number(info.last_date) * 1000 + Number(info.timestep) * (i + 1)
        );

        return {
          price: prediction,
          timestamp: time.getTime(),
          time: moment(time).format("hh:mm:ss"),
        };
      });
      setPredictions(fetchedPredictions);
    } catch {
      console.log("not available");
    }
  }
  useEffect(() => {
    fetchPrediction();
  });
  if (address.match(/^0x[a-fA-F0-9]{40}$/))
    return (
      <Box p="2">
        <Heading textAlign="center">
          {data && `${data.token.name} (${data.token.symbol})`}
        </Heading>

        {predictions && (
          <Center>
            <Box rounded="md" bgColor="gray.200" p="2" my="10">
              <Text textAlign="center" fontWeight="bold">
                Predictions
              </Text>
              <Box>
                <Box display={{ base: "inline-flex", md: "none" }}>
                  <AreaChart width={320} height={200} data={predictions}>
                    <Area
                      stroke="#8884d8"
                      fill="#8884d8"
                      type="monotone"
                      dataKey="price"
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                  </AreaChart>
                </Box>
                <Box display={{ base: "none", md: "inline-flex", lg: "none" }}>
                  <AreaChart width={500} height={300} data={predictions}>
                    <Area
                      stroke="#8884d8"
                      fill="#8884d8"
                      type="monotone"
                      dataKey="price"
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                  </AreaChart>
                </Box>
                <Box display={{ base: "none", lg: "inline-flex" }}>
                  <AreaChart width={800} height={400} data={predictions}>
                    <Area
                      stroke="#8884d8"
                      fill="#8884d8"
                      type="monotone"
                      dataKey="price"
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                  </AreaChart>
                </Box>
              </Box>
            </Box>
          </Center>
        )}
      </Box>
    );
  return <NotFound />;
};

export default Token;
