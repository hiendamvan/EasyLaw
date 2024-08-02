import { Box, Button, List, ListItem, TextField, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";

export const ChatbotLayout = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { user: true, text: input }]);
      setInput("");
      // Gọi API hoặc xử lý logic chatbot ở đây
      // Ví dụ: gọi API và nhận phản hồi
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: false, text: "Phản hồi từ chatbot" },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          {" "}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 2 }}
          >
            <Typography variant="h4" gutterBottom>
              Chatbot
            </Typography>
            <List sx={{ width: "100%", maxHeight: 300, overflow: "auto" }}>
              {messages.map((message, index) => (
                <ListItem
                  key={index}
                  sx={{ justifyContent: message.user ? "flex-end" : "flex-start" }}
                >
                  <Box
                    sx={{
                      bgcolor: message.user ? "primary.main" : "grey.300",
                      color: message.user ? "white" : "black",
                      borderRadius: 1,
                      padding: 1,
                      maxWidth: "75%",
                    }}
                  >
                    {message.text}
                  </Box>
                </ListItem>
              ))}
            </List>
            <Box display="flex" sx={{ width: "100%", mt: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                sx={{ ml: 1 }}
              >
                Gửi
              </Button>
            </Box>
          </Box>
        </MDBox>
      </DashboardLayout>
    </>
  );
};
