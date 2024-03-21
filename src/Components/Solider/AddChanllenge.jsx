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
  Select,
} from "@chakra-ui/react";

import {
  cities,
  departments,
  governorates,
  qualifications,
  solideHome,
} from "../../assets/Constant/MenuData";
import { useNavigate } from 'react-router-dom';

export default function AddChanllenge() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    solidername: "",
    phonenumber: "",
    qualification: "",
    soliderrkm: "",
    soliderSSn: "",
    soliderhome: "",
    solidertagneed: "",
    soliderendmam: "",
    solidertsreeh: "",
    department: "",
    selectedGovernorate: "",
    selectedCity: "",
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => { 
    console.log(formData);
    navigate("/comments")
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
        اضافة معلومات العسكري
      </Heading>
      <Stack spacing={4}>
        <HStack>
          <FormControl id="Add Chanllenge">
            <FormLabel>الاسم رباعي</FormLabel>
            <Input
              w={"100%"}
              type="text"
              name="solidername"
              onChange={handleFieldChange}
            />
          </FormControl>
          <FormControl id="Add Chanllenge">
            <FormLabel> رقم التليفون</FormLabel>
            <Input
              w={"100%"}
              type="text"
              name="phonenumber"
              onChange={handleFieldChange}
            />
          </FormControl>
          <FormControl id="Brief">
            <FormLabel> المؤهل</FormLabel>
            <Select
              placeholder="اختر المؤهل"
              value={formData.qualification}
              name="qualification"
              onChange={handleFieldChange}
            >
              {qualifications.map((qualifi) => (
                <option key={qualifi.id} value={qualifi.id}>
                  {qualifi.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>
      </Stack>

      <Stack spacing={4} pt={5}>
        <HStack>
          <FormControl id="Brief">
            <FormLabel>الرقم العسكري</FormLabel>
            <Input
              w={"100%"}
              type="text"
              name="soliderrkm"
              onChange={handleFieldChange}
            />
          </FormControl>
          <FormControl id="Add Chanllenge">
            <FormLabel> الرقم القومي</FormLabel>
            <Input
              w={"100%"}
              type="text"
              name="soliderSSn"
              onChange={handleFieldChange}
            />
          </FormControl>
          <FormControl id="Brief">
            <FormLabel> القوة الاساسية</FormLabel>
            <Select
              placeholder="اختار القوة الاساسية"
              value={formData.soliderhome}
              name="soliderhome"
              onChange={handleFieldChange}
            >
              {solideHome.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>
      </Stack>

      <Stack spacing={4} pt={5}>
        <HStack>
          <FormControl id="Brief">
            <FormLabel> تاريخ التجنيد</FormLabel>
            <Input
              w={"100%"}
              type="date"
              name="solidertagneed"
              onChange={handleFieldChange}
            />
          </FormControl>
          <FormControl id="Brief">
            <FormLabel> تاريخ الانضمام</FormLabel>
            <Input
              w={"100%"}
              type="date"
              name="soliderendmam"
              onChange={handleFieldChange}
            />
          </FormControl>

          <FormControl id="Add Chanllenge">
            <FormLabel>تاريخ التسريح</FormLabel>
            <Input
              w={"100%"}
              type="date"
              name="solidertsreeh"
              onChange={handleFieldChange}
            />
          </FormControl>
        </HStack>
      </Stack>

      <Stack spacing={4} pt={5}>
        <HStack>
          <FormControl id="governorate">
            <FormLabel>المحافظة</FormLabel>
            <Select
              placeholder="اختر المحافظة"
              value={formData.selectedGovernorate}
              name="selectedGovernorate"
              onChange={handleFieldChange}
            >
              {governorates.map((governorate) => (
                <option key={governorate.id} value={governorate.id}>
                  {governorate.governorate_name_ar}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="city">
            <FormLabel>المدينة/القرية</FormLabel>
            <Select
              placeholder="اختر المدينة/القرية"
              // value={selectedCity}
              name="selectedCity"
              onChange={handleFieldChange}
              disabled={!formData.selectedGovernorate}
            >
              {cities
                .filter(
                  (city) => city.governorate_id === formData.selectedGovernorate
                )
                .map((city) => (
                  <option key={city.id} value={city.city_name_ar}>
                    {city.city_name_ar}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl id="address">
            <FormLabel>العنوان الداخلي</FormLabel>
            <Input
              w={"100%"}
              type="text"
              name="address"
              onChange={handleFieldChange}
            />
          </FormControl>
        </HStack>
      </Stack>

      <Stack spacing={4} pt={5}>
        <FormControl id="Add Chanllenge">
          <FormLabel> القسم التابع له</FormLabel>
          <Select
            placeholder="اختر القسم"
            name="department"
            value={formData.department}
            onChange={handleFieldChange}
          >
            {departments.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </Select>
        </FormControl>
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
