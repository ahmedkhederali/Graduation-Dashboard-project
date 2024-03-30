"use client";

import {
  IconButton,
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,

  Image,
  useColorMode,
  Heading,
  useColorModeValue
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import { LinkItems, LinkItemsM } from "../../assets/Constant/MenuData";
const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
  
      // transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      direction={true === 'ltr' ? 'rtl' : 'ltr'}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" style={{overflow:"hidden"}}> 
        <Image
          src={Logo}
          height={28}
          color={useColorModeValue("gray.700", "white")}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

     
       {
         LinkItems.map((link) => {
          return (
            <Link to={link.dir}>
            <NavItem key={link.name} icon={link.icon}>
             {link.name}
            </NavItem>
            </Link>
          );
        })
       }
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen,setAdmin, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const handleLogout=()=>{
    localStorage.removeItem("admin");
    setAdmin(false)
    window.location.reload()
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <HStack
        spacing={{ base: "0", md: "6" }}
        display={{ base: "none", md: "flex" }}
      >
        {/* {NAV_ITEMS.map((navItem) => (
          <Box
            p={2}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            <Link to={navItem.dir ?? "#"}>{navItem.name}</Link>
          </Box>
        ))} */}
      </HStack>
      <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
          lineHeight={'110%'}  color={'red.900'}>
          القوات  {' '}
          <Text as={'span'} color={useColorModeValue("gray.800", "white")}>
          المسلحة
          </Text>
          <Text as={'span'} color={'black'}>
            المصرية
          </Text>
        </Heading>      <HStack spacing={{ base: "0", md: "6" }}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Button onClick={handleLogout}>
          تسجيل الخروج
        </Button>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({setAdmin}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="auto" bg={useColorModeValue("white.100", "white.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} setAdmin={setAdmin}/>
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  );
};


export default SidebarWithHeader;
