import React, { useState } from "react";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useColorModeValue,
  AvatarBadge,
  IconButton,
  Center,
  Avatar,
} from "@chakra-ui/react";
import { PlusSquareIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { FaSave } from "react-icons/fa";

export default function UserChallenge() {
  const [fieldCount, setFieldCount] = useState(1); // Initial count is 1 for the first field
  const [challengeData, setChallengeData] = useState({
    chanllenge_user_name: "",
    chanllenge_user_brief: "",
  });

  const handleInputChange = (index, value) => {
    setChallengeData({
      ...challengeData,
      [index === -1 ? "chanllenge_user_name" : index === -2 ? "chanllenge_user_brief" : `day${index}`]: value,
    });
  };

  const handleAddField = () => {
    setFieldCount(fieldCount + 1); // Increment the field count
  };

  const handleSave = () => {
    // Send challengeData to backend
    console.log(challengeData);
  };

  return (
    <Box
      ml={{ sm: 0, md: "250px" }}
      rounded={"lg"}
      bg={useColorModeValue("white.100", "gray.800")}
      boxShadow={"lg"}
      p={8}
      d={"flex"}
      align={"center"}
      justify={"center"}
      w={"82%"}
      m={10}
    >
    
      <Stack spacing={4}>
        <FormControl id="Add Chanllenge">
          <FormLabel>User Chanllenge Name</FormLabel>
          <Input
            w={"100%"}
            type="text"
            onChange={(e) => handleInputChange(-1, e.target.value)}
          />
        </FormControl>
        <FormControl id="Brief">
          <FormLabel>Brief</FormLabel>
          <Input
            w={"100%"}
            type="text"
            onChange={(e) => handleInputChange(-2, e.target.value)}
          />
        </FormControl>
        {[...Array(fieldCount)].map((_, index) => (
          <FormControl key={index} id={`day${index + 1}`}>
            <FormLabel>Day {index + 1}</FormLabel>
            <Input
              w={"100%"}
              type="text"
              onChange={(e) => handleInputChange(index + 1, e.target.value)}
            />
          </FormControl>
        ))}
      </Stack>
      <Flex justifyContent={{ base: "space-around", md: "space-around" }}>
        <IconButton
          variant="solid"
          colorScheme="teal"
          aria-label="Add"
          fontSize="20px"
          title="Add new Field"
          mt={2}
          p={5}
          onClick={handleAddField}
          icon={<PlusSquareIcon />}
        />
        <IconButton
          variant="solid"
          colorScheme="teal"
          aria-label="Save"
          fontSize="20px"
          title="Save"
          mt={2}
          p={5}
          onClick={handleSave}
          icon={<FaSave />}
        />
      </Flex>
    </Box>
  );
}
