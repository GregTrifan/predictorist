import { Box, Heading, Text, Avatar } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";
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
  const [tokenLogo, setTokenLogo] = useState();
  const { data } = useQuery(TOKEN_NAME, {
    variables: { address },
  });
  async function fetchPrediction() {
    try {
      const res = fetch(
        `http://app-env.eba-hxn3i6de.us-east-2.elasticbeanstalk.com/?f=10&q=%7Btoken%20(id:%22${address}%22)%7BtokenDayData%7BpriceUSD%20date%7D%7D%7D`
      );
      const info = await (await res).json();
      const fetchedPredictions = info.predictions.map((prediction, i) => {
        const time = new Date(Date.now() + Number(info.timestep) * (i + 1));

        return {
          price: prediction.toFixed(4),
          timestamp: time.getTime(),
          time: moment(time).format("hh:mm:ss"),
        };
      });

      const tokenRes = await fetch(
        `https://api.ethplorer.io/getTokenInfo/${address}?apiKey=${process.env.REACT_APP_ETHPLORER_KEY}`
      );

      const tokenInfo = await tokenRes.json();
      const logo = tokenInfo.image;

      setTokenLogo(`https://ethplorer.io${logo}`);

      setPredictions(fetchedPredictions);
    } catch {
      console.log("not available");
    }
  }
  useEffect(() => {
    if (address.match(/^0x[a-fA-F0-9]{40}$/)) fetchPrediction();
  }, []);
  if (address.match(/^0x[a-fA-F0-9]{40}$/))
    return (
      <Box p="2">
        {data && (
          <Heading textAlign="center" mt="4" mb="2">
            {tokenLogo && <Avatar mx="2" src={tokenLogo} />}
            {!tokenLogo && <Avatar mx="2" name={data.token.symbol} />}
            {`${data.token.name} (${data.token.symbol})`}
          </Heading>
        )}
        {predictions && (
          <Box
            mx="auto"
            rounded="md"
            maxW="1000px"
            bgColor="gray.200"
            p="3"
            my="10"
          >
            <Text textAlign="center" fontWeight="bold">
              Predictions
            </Text>
            <Chart
              options={{
                chart: {
                  id: "prediction-chart",
                },
                xaxis: {
                  categories: predictions.map((p) => p.time),
                },
              }}
              series={[
                {
                  name: "prediction",
                  data: predictions.map((p) => p.price),
                },
              ]}
              type="area"
            />
          </Box>
        )}
      </Box>
    );
  return <NotFound />;
};

export default Token;
