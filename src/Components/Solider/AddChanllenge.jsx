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
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { postTaskData, updateTaskData } from "../../API/tasks.services";

export default function AddChanllenge({ mar, data }) {
  const navigate = useNavigate();
  const [home,setHome]=useState([])
  const [department,setDepartment]=useState([])


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

  const handleSave = async () => {
    console.log(formData);
    try {
      if(formData.id) {
        updateTaskData('http://localhost:3001/tasks', formData.id, formData);

      } else {
        await postTaskData('http://localhost:3001/tasks', formData);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }

    if(data){
      Swal.fire("تم تعديل بيانات العسكري بنحاج");
      // navigate("/");
      setTimeout(()=>{
        navigate("/comments");
      },1500)
    }else{
      Swal.fire("تم اضافة بيانات العسكري بنحاج");
      navigate("/comments");
    }
  };
  
  React.useEffect(() => {
    fetch('http://localhost:3001/home') 
      .then(response => response.json())
      .then(data => {
        setHome(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 
  React.useEffect(() => {
    fetch('http://localhost:3001/department') 
      .then(response => response.json())
      .then(data => {
        setDepartment(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
 // Set form data initially if editing
 React.useEffect(() => {
  if (data) {
    setFormData(data);
  }
}, [data]);
  return (
    <Box
      ml={mar ? { sm: 0, md: "50px" } : { sm: 0, md: "250px" }}
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
        {data ? "تعديل معلومات العسكري" : "اضافة معلومات العسكري"}
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
                  autoComplete="off"
                  value={formData.solidername}
                />
              </FormControl>
              <FormControl id="Add Chanllenge">
                <FormLabel> رقم التليفون</FormLabel>
                <Input
                  w={"100%"}
                  type="text"
                  name="phonenumber"
                  autoComplete="off"
                  onChange={handleFieldChange}
                  value={formData.phonenumber}

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
                  autoComplete="off"
                  name="soliderrkm"
                  onChange={handleFieldChange}
                  value={formData.soliderrkm}

                />
              </FormControl>
              <FormControl id="Add Chanllenge">
                <FormLabel> الرقم القومي</FormLabel>
                <Input
                  w={"100%"}
                  type="text"
                  name="soliderSSn"
                  autoComplete="off"
                  onChange={handleFieldChange}
                  value={formData.soliderSSn}

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
                  {home.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.departmentName}
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
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  name="solidertagneed"
                  onChange={handleFieldChange}
                  value={formData.solidertagneed}

                />
              </FormControl>
              <FormControl id="Brief">
                <FormLabel> تاريخ الانضمام</FormLabel>
                <Input
                  w={"100%"}
                  type="date"
                  name="soliderendmam"
                  onChange={handleFieldChange}
                  value={formData.soliderendmam}

                />
              </FormControl>

              <FormControl id="Add Chanllenge">
                <FormLabel>تاريخ التسريح</FormLabel>
                <Input
                  w={"100%"}
                  type="date"
                  name="solidertsreeh"
                  onChange={handleFieldChange}
                  value={formData.solidertsreeh}

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
                  value={formData.selectedCity}

                  
                >
                  {cities
                    .filter(
                      (city) =>
                        city.governorate_id === formData.selectedGovernorate
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
                  autoComplete="off"
                  onChange={handleFieldChange}
                  value={formData.address}

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
                {department.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.departmentName}
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
          {data ? "تعديل المعلومات" : "حفظ المعلومات"}
        </Button>
      </Flex>
    </Box>
  );
}
