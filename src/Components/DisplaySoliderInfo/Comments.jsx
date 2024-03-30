import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import {
  dataloop,
  departments,
  governorates,
  qualifications,
  solideHome,
} from "../../assets/Constant/MenuData";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import AddChanllenge from "../Solider/AddChanllenge";
import { deleteTaskData, getTasksData } from "../../API/tasks.services";
function convertToArabicDigits(number) {
  const digitsMap = {
    0: "٠",
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
  };

  return String(number).replace(/[0-9]/g, (digit) => digitsMap[digit]);
}

function convertToArabicNumerals(dateString) {
  const months = [
    "١",
    "٢",
    "٣",
    "٤",
    "٥",
    "٦",
    "٧",
    "٨",
    "٩",
    "١٠",
    "١١",
    "١٢",
  ];
  debugger;
  const [year, month, day] = dateString.split("-");

  if (day && month && year) {
    const arabicYear = [...year]
      ?.map((digit) => String.fromCharCode(digit.charCodeAt(0) + 1584))
      .join("");
    const arabicMonth = months[parseInt(month) - 1];
    const arabicDay = [...day]
      ?.map((digit) => String.fromCharCode(digit.charCodeAt(0) + 1584))
      .join("");

    return `${arabicDay}-${arabicMonth}-${arabicYear}`;
  }
}

export default function Comments() {
  const navigate = useNavigate();
  const [home, setHome] = useState([]);
  const [department, setDepartment] = useState([]);
  const [editable, setEditable] = useState(null);
  const [soliders, setSoliders] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    solderrkm: "",
    soliderSSn: "",
    department: "",
    solidertsreeh: "",
  });
  const onClickEdit = (item) => {
    setEditable(item);
  };

  const onClickDelete = (id) => {
    Swal.fire({
      title: "هل انت متاكد ؟",
      text: "سيتم حذف بيانات العسكري",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "تم الحذف!",
          text: "تم حذف بيانات العسكري.",
          icon: "success",
        });
        // navigate("/add_chanllenge")
        deleteTaskData("http://localhost:3001/tasks", id);
      }
    });
  };

  useEffect(() => {
    getTasksData("/db.json")
      .then((tasks) => {
        setSoliders(tasks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3001/home")
      .then((response) => response.json())
      .then((data) => {
        setHome(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3001/department")
      .then((response) => response.json())
      .then((data) => {
        setDepartment(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const filteredData = soliders.filter((item) => {
    const nameMatch = item.solidername.includes(filter.name);
    const solderrkmMatch = String(item.soliderrkm).includes(filter.solderrkm);
    const soliderSSnMatch = String(item.soliderSSn).includes(filter.soliderSSn);
    const soliderDepartmentMatch = String(item.department).includes(
      filter.department
    );
    const solidertsreehMatch = String(item.solidertsreeh).includes(
      filter.solidertsreeh
    );
   if(filter.solidertsreeh){
    return (
      nameMatch &&
      solderrkmMatch &&
      soliderSSnMatch &&
      soliderDepartmentMatch &&
      solidertsreehMatch
    );
   }else{
    return (
      nameMatch &&
      solderrkmMatch &&
      soliderSSnMatch &&
      soliderDepartmentMatch
    );
   }
  });

  return (
    <Box py={5} ml={{ sm: 0, md: "240px" }}>
      {editable ? (
        <>
          <AddChanllenge mar={true} data={editable} />
        </>
      ) : (
        <Box m={{ sm: 0, md: "10px" }}>
          <HStack>
            <FormControl>
              <Input
                placeholder="ابحث بالاسم"
                value={filter.name}
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="ابحث برقم العسكري"
                value={filter.solderrkm}
                onChange={(e) =>
                  setFilter({ ...filter, solderrkm: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="ابحث بالرقم القومي"
                value={filter.soliderSSn}
                onChange={(e) =>
                  setFilter({ ...filter, soliderSSn: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="Add Chanllenge">
              <Select
                placeholder="اختر القسم"
                name="department"
                value={filter.department}
                onChange={(e) =>
                  setFilter({ ...filter, department: e.target.value })
                }
              >
                {department.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.departmentName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                name="solidertsreeh"
                onChange={(e) =>
                  setFilter({ ...filter, solidertsreeh: e.target.value })
                }
                value={filter.solidertsreeh}
              />
            </FormControl>
          </HStack>
          {filteredData.length !== 0 ? (
            <TableContainer p={3}>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>رقم</Th>
                    <Th>اسم العسكري</Th>
                    <Th>رقم العسكري</Th>
                    <Th>رقم القومي</Th>
                    <Th>رقم التليفون</Th>
                    <Th>المؤهل</Th>
                    <Th>القوة الاساسية</Th>
                    <Th>تاريخ التجنيد</Th>
                    <Th>تاريخ الانضمام</Th>
                    <Th>تاريخ التسريح</Th>
                    <Th>المحافظة</Th>
                    <Th>المدينة/القرية</Th>
                    <Th>العنوان الداخلي</Th>
                    <Th>القسم التابع له</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredData?.map((item, index) => (
                    <Tr key={item.id}>
                      <Td>{index + 1}</Td>
                      <Td>{convertToArabicDigits(item.solidername)}</Td>
                      <Td>{convertToArabicDigits(item.soliderrkm)}</Td>
                      <Td>{convertToArabicDigits(item.soliderSSn)}</Td>
                      <Td>{convertToArabicDigits(item.phonenumber)}</Td>
                      <Td>
                        {
                          qualifications.filter(
                            (qual) => qual.id === parseInt(item.qualification)
                          )[0]?.name
                        }
                      </Td>
                      <Td>
                        {
                          home.filter((qual) => qual.id === item.soliderhome)[0]
                            ?.departmentName
                        }
                      </Td>
                      <Td>{convertToArabicNumerals(item.solidertagneed)}</Td>
                      <Td>{convertToArabicNumerals(item.soliderendmam)}</Td>
                      <Td>{convertToArabicNumerals(item.solidertsreeh)}</Td>
                      <Td>
                        {
                          governorates.filter(
                            (qual) =>
                              parseInt(qual.id) ===
                              parseInt(item.selectedGovernorate)
                          )[0]?.governorate_name_ar
                        }
                      </Td>
                      <Td>{item.selectedCity}</Td>
                      <Td>{item.address}</Td>
                      <Td>
                        {
                          department.filter(
                            (qual) => qual.id === item.department
                          )[0]?.departmentName
                        }
                      </Td>
                      <Td>
                        <Button
                          onClick={() => onClickEdit(item)}
                          colorScheme="facebook"
                          m={2}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          onClick={() => onClickDelete(item.id)}
                          bg="whitesmoke"
                          color="facebook.500"
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Center>
              <Heading fontSize={"4xl"} my-5>
                لا يوجد عساكر
              </Heading>{" "}
            </Center>
          )}
        </Box>
      )}
    </Box>
  );
}
