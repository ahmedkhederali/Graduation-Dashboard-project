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
  HStack,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { postDepatmentData } from "../../API/depatment.services";
import { postSlahData } from "../../API/slahs.services";



export default function SolideSlahe() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    HomeSoliderName: "",
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSave = async () => {
      console.log(formData);
      await postSlahData('http://localhost:3001/slah', formData);

      Swal.fire("تم اضافة بيانات السلاح بنحاج");
      navigate("/");
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
      // m={10}
    >
      <Heading mb={10} fontSize={"2xl"} textAlign={"center"}>
        اضافة سلاح جديد   
      </Heading>
      <Stack spacing={4}>
        <HStack>
         
          <FormControl id="Brief">
            <FormLabel> السلاح</FormLabel>
            <Input
              w={"100%"}
              type="text"
              name="departmentName"
              onChange={handleFieldChange}
            />
          </FormControl>
        </HStack>
      </Stack>

      

      <Flex
        justifyContent={{ base: "space-around", md: "space-around" }}
        mt={5}
      >
        <Button
          px={4}
          fontSize={"sm"}
          rounded={"full"}
          bg={"blue.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
          onClick={handleSave}
        >
          حفظ المعلومات
        </Button>
      </Flex>
    </Box>
  );
}
