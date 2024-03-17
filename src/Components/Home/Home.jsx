import React from "react";
import { Box, Image,Center,Flex } from "@chakra-ui/react";
import Logo from "../../assets/logogif.gif";
export default function Home() {
  return (
    <Flex justifyContent={{base:"center"}} >
      <Box boxSize="lg" ml={{ sm: 0, md: "250px" }} mb={{sm: "10px", md: "20px"}} background={"#28b3eb"} borderRadius={"50%;"}>
        <Image src={Logo} alt="Home image" />
      </Box>
    </Flex>
  );
}
