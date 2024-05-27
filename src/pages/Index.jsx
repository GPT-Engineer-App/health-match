import { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, Box, Avatar, IconButton, useToast } from "@chakra-ui/react";
import { FaUserMd, FaSearch, FaHeart } from "react-icons/fa";

const professionals = [
  { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", image: "https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTY4NDgyMzB8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, name: "Dr. Jane Smith", specialty: "Neurologist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTY4NDgyMzB8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 3, name: "Dr. Emily Johnson", specialty: "Pediatrician", image: "https://images.unsplash.com/photo-1612276529731-4b21494e6d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwzfHxkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTY4NDgyMzB8MA&ixlib=rb-4.0.3&q=80&w=1080" },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const toast = useToast();

  const handleSearch = () => {
    toast({
      title: "Search initiated.",
      description: `Searching for ${searchTerm}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const addToFavorites = (professional) => {
    setFavorites([...favorites, professional]);
    toast({
      title: "Added to favorites.",
      description: `${professional.name} has been added to your favorites.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Search for a specialty..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <IconButton aria-label="Search" icon={<FaSearch />} onClick={handleSearch} />
        </HStack>
        <VStack spacing={4} width="100%">
          {professionals
            .filter((professional) => professional.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((professional) => (
              <Box key={professional.id} p={4} borderWidth="1px" borderRadius="lg" width="100%" display="flex" alignItems="center" justifyContent="space-between">
                <HStack>
                  <Avatar src={professional.image} />
                  <VStack align="start">
                    <Text fontSize="lg" fontWeight="bold">
                      {professional.name}
                    </Text>
                    <Text>{professional.specialty}</Text>
                  </VStack>
                </HStack>
                <IconButton aria-label="Add to favorites" icon={<FaHeart />} onClick={() => addToFavorites(professional)} />
              </Box>
            ))}
        </VStack>
        {favorites.length > 0 && (
          <Box width="100%" mt={8}>
            <Text fontSize="2xl" mb={4}>
              Favorites
            </Text>
            <VStack spacing={4} width="100%">
              {favorites.map((professional) => (
                <Box key={professional.id} p={4} borderWidth="1px" borderRadius="lg" width="100%" display="flex" alignItems="center" justifyContent="space-between">
                  <HStack>
                    <Avatar src={professional.image} />
                    <VStack align="start">
                      <Text fontSize="lg" fontWeight="bold">
                        {professional.name}
                      </Text>
                      <Text>{professional.specialty}</Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
