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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

import {
  dataloopsf,
  degree,
  departments,
  governorates,
  qualifications,
  solideHome,
} from "../../assets/Constant/MenuData";
import UserChallenge from "../User Challenge/UserChallenge";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { deleteSafData, getSafData } from "../../API/saf.services";

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
export default function Evaluation() {
  const [safData, setSafData] = useState([]);
  const [home, setHome] = useState([]);
  const [department, setDepartment] = useState([]);
  const [editable, setEditable] = useState(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    name: "",
    solderrkm: "",
    soliderSSn: "",
    department: "",
    degree: "",
  });
  const filteredData = safData.filter((item) => {
    const nameMatch = item.solidername.includes(filter.name);
    const solderrkmMatch = String(item.soliderrkm).includes(filter.solderrkm);
    const soliderSSnMatch = String(item.soliderSSn).includes(filter.soliderSSn);
    const soliderDepartmentMatch = String(item.department).includes(
      filter.department
    );
    const soliderDegreetMatch = String(item.degree).includes(filter.degree);

    return (
      nameMatch &&
      solderrkmMatch &&
      soliderSSnMatch &&
      soliderDepartmentMatch &&
      soliderDegreetMatch
    );
  });
  const onClickEdit = (item) => {
    setEditable(item);
  };
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
  const onClickDelete = (id) => {
    Swal.fire({
      title: "هل انت متاكد ؟",
      text: "سيتم حذف بيانات الصف",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "تم الحذف!",
          text: "تم حذف بيانات الصف.",
          icon: "success",
        });
        // navigate("/user_chanllenge")
        deleteSafData("http://localhost:3001/saf", id);
      }
    });
  };

  useEffect(() => {
    fetch("http://localhost:3001/saf")
      .then((response) => response.json())
      .then((data) => {
        setSafData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
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
  return (
    <Box py={5} ml={{ sm: 0, md: "240px" }}>
      {editable ? (
        <>
          <UserChallenge mar={true} data={editable} />
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
            <FormControl id="Add Chanllenge">
              <Select
                placeholder="اختر الدرجة"
                value={filter.degree}
                name="degree"
                onChange={(e) =>
                  setFilter({ ...filter, degree: e.target.value })
                }
              >
                {degree.map((deg) => (
                  <option key={deg.id} value={deg.id}>
                    {deg.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </HStack>
          {
            filteredData.length !==0 ?(
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
                  <Th>الدرجة</Th>
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
                    <Td>
                      {
                        degree.filter(
                          (qual) => qual.id === parseInt(item.degree)
                        )[0]?.name
                      }
                    </Td>
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
                      {" "}
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
            ):(
              <Center>
              <Heading fontSize={"4xl"} className="mt-5">
                لا يوجد صف
              </Heading>{" "}
            </Center>
            )
          }
        </Box>
      )}
    </Box>
  );
}
