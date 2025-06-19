import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  useToast,
  Flex,
  Text,
  Spinner,
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import { FaMoon, FaSun, FaRedo } from 'react-icons/fa'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [messages, setMessages] = useState([
    {
      text: 'Hola, soy tu asistente virtual. ¿En qué puedo ayudarte?',
      isUser: false,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()
  const [chatOpen, setChatOpen] = useState(false)
  const [firstMessage, setFirstMessage] = useState("")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message) => {
    if (!message.trim()) return

    if (!chatOpen) {
      setFirstMessage(message)
      setChatOpen(true)
      setMessages([
        {
          text: '¡Hola! Consulta aquí cualquier duda sobre tu infraestructura VMware.',
          isUser: false,
        },
        { text: message, isUser: true },
      ])
      return
    }

    setMessages((prev) => [...prev, { text: message, isUser: true }])
    setIsLoading(true)

    try {
      // reemplazar la url con el endpoint de fastapi
      const response = await axios.post('http://localhost:8000/api/v1/prompt/', {
        message,
      })

      setMessages((prev) => [
        ...prev,
        { text: response.data.response, isUser: false, name: 'VMware Assistance' },
      ])
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'No se pudo obtener respuesta del servidor',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetChat = () => {
    setMessages([
      {
        text: '¡Hola! Consulta aquí cualquier duda sobre tu infraestructura VMware.',
        isUser: false,
      },
    ])
    setChatOpen(false)
    setFirstMessage("")
  }

  return (
    <Box minH="100vh" minW="100vw" bg="#18181A" display="flex" alignItems="center" justifyContent="center" position="relative">
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            key="reset-btn"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', top: 32, right: 48, zIndex: 10 }}
          >
            <IconButton
              icon={<FaRedo />}
              onClick={handleResetChat}
              aria-label="Reiniciar chat"
              colorScheme="blue"
              variant="solid"
              borderRadius="full"
              size="lg"
              bg="#2196f3"
              _hover={{ bg: '#1976d2' }}
              _active={{ bg: '#1565c0' }}
              color="white"
              boxShadow="0 2px 8px 0 rgba(0,0,0,0.10)"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <VStack w="100%" maxW="container.xl" spacing={4}>
        <AnimatePresence>
          {!chatOpen && (
            <motion.div
              key="intro-block"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              style={{ width: '100%' }}
            >
              <Box
                w={{ base: '100%', sm: '80%', md: '40%' }}
                mx="auto"
                bg="#232328"
                borderRadius="3xl"
                boxShadow="0 8px 32px 0 rgba(0,0,0,0.25)"
                p={12}
                textAlign="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minH="120px"
              >
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} placeholder="Escribe tu consulta..." showCounter={true} modernStyle={true} />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              key="chat-block"
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              style={{ width: '100%' }}
            >
              <Flex w="100%" justify="center">
                <Box
                  w={{ base: '100%', sm: '80%', md: '60%' }}
                  bg="#232328"
                  borderRadius="3xl"
                  boxShadow="0 8px 32px 0 rgba(0,0,0,0.25)"
                  overflow="hidden"
                  display="flex"
                  flexDirection="column"
                  minH="500px"
                  maxH="80vh"
                  position="relative"
                >
                  <Flex w="full" direction="column" align="center" p={8} borderBottom="1px solid #222">
                    <Heading size="lg" color="blue.300" mb={1}>
                      VMware Assistance
                    </Heading>
                    <Text color="gray.400" fontSize="md">
                      Diagnóstico inteligente de infraestructura virtual
                    </Text>
                  </Flex>
                  <Box
                    flex={1}
                    overflowY="auto"
                    p={4}
                    css={{
                      '&::-webkit-scrollbar': {
                        width: '4px',
                      },
                      '&::-webkit-scrollbar-track': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: '#232328',
                        borderRadius: '24px',
                      },
                    }}
                  >
                    <VStack spacing={4} align="stretch">
                      {messages.map((msg, index) => (
                        <ChatMessage
                          key={index}
                          message={msg.text}
                          isUser={msg.isUser}
                        />
                      ))}
                      {isLoading && (
                        <Flex justify="center" my={4}>
                          <Spinner color="blue.300" />
                        </Flex>
                      )}
                      <div ref={messagesEndRef} />
                    </VStack>
                  </Box>
                  <Box p={4} bg="#232328">
                    <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                  </Box>
                </Box>
              </Flex>
            </motion.div>
          )}
        </AnimatePresence>
      </VStack>
    </Box>
  )
}

export default App
