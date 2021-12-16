import {
  chakra,
  Flex,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

import React from "react";

const Navbar = () => {
  return (
    <chakra.header w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <chakra.a href="/" title="Home Page" display="flex" alignItems="center">
          Predictorist
        </chakra.a>

        <HStack spacing={3} display="flex" alignItems="center">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch />}
            />
            <Input type="tel" placeholder="Search..." />
          </InputGroup>
        </HStack>
      </Flex>
    </chakra.header>
  );
};

export default Navbar;
