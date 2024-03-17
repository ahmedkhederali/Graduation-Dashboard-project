'use client'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  useColorModeValue,
  Text,
  Container,
} from '@chakra-ui/react'
import { accodringQuestionAndAnswer } from '../../assets/Constant/MenuData'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function Help() {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      width="100%"
      bg={useColorModeValue('white.50', 'gray.800')}>
      <Container>
        <Accordion  width="100%" maxW="lg" rounded="lg">
        {
          accodringQuestionAndAnswer?.map((item)=>(
            <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}>
              <Text fontSize="md">{item.question}</Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color="gray.600">
              {item.answer}
              </Text>
            </AccordionPanel>
          </AccordionItem>
          ))
        }
          
        </Accordion>
      </Container>
    </Flex>
  )
}