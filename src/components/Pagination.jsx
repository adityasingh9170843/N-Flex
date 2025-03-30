import { Button } from "@chakra-ui/react"
import { Flex, Text } from "@chakra-ui/react"


function Pagination({active, total, setPage}) {
  return (
    <Flex gap={2} alignItems={"center"}>
        <Flex gap={2} maxW={"250px"} my={10}>
            <Button onClick={() => setPage(active - 1)} disabled={active === 1}>Prev</Button>
            <Button onClick={() => setPage(active + 1)} disabled={active === total}>Next</Button>
        </Flex>
        <Flex gap={1}>
            <Text>{active}/</Text>
            <Text>{total}</Text>
        </Flex>
    </Flex>
  )
}

export default Pagination