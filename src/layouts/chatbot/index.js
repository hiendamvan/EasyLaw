import { Box, Button, List, ListItem, TextField, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import logo from "assets/images/logo-ct.png";
import "./index.css";
import axios from "axios";

// setTimeout(() => {
//   setMessages((prevMessages) => [
//     ...prevMessages,
//     {
//       user: false,
//       text: "Phan hoi luat",
//     },
//   ]);
// }, 1000);

export const ChatbotLayout = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    console.log(input);
    if (input.trim()) {
      // Cập nhật tin nhắn của người dùng
      setMessages([...messages, { user: true, text: input }]);
      // console.log(JSON.stringify({ question: input }));
      try {
        // Gọi API và nhận phản hồi
        const response = await fetch("http://pretty-crab-sound.ngrok-free.app/rag/", {
          method: "POST",
          body: JSON.stringify({ question: input }),
        });

        // const payload = { question: input };
        // console.log("Sending payload:", payload);

        // const response = await axios.post(
        //   "https://pretty-crab-sound.ngrok-free.app/rag/",
        //   payload,
        //   {
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );

        // Kiểm tra xem phản hồi có OK không (mã trạng thái 200-299)
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        // Phân tích dữ liệu JSON từ phản hồi
        const data = await response.json();

        // Cập nhật tin nhắn từ phản hồi
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            user: false,
            text: data.answer || "No response",
          },
        ]);
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Lỗi:", error);
      }
    }
    // Xóa nội dung ô nhập
    setInput("");
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          {" "}
          <Box //the whole box chat
            bgcolor="#f9f7f7"
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              width: "100%",
              maxWidth: 1200,
              height: 660,
              margin: "0 auto",
              padding: 2,
              borderRadius: 5,
            }}
          >
            <Typography variant="h4" gutterBottom>
              EASYLAW
            </Typography>
            <List sx={{ width: "100%", maxHeight: 500, overflow: "auto" }}>
              {messages.map((message, index) => (
                <ListItem
                  key={index}
                  sx={{ justifyContent: message.user ? "flex-end" : "flex-start" }}
                >
                  <Box
                    sx={{
                      bgcolor: message.user ? "rgb(217, 217,217)" : "rgb(179, 184, 221)",
                      color: message.user ? "white" : "black",
                      borderRadius: 3,
                      padding: 1,
                      maxWidth: "75%",
                      overflowWrap: "break-word",
                    }}
                  >
                    {message.user ? "" : <img src={logo} />}
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
              <Button variant="contained" color="error" onClick={handleSendMessage} sx={{ ml: 1 }}>
                Gửi
              </Button>
            </Box>
          </Box>
        </MDBox>
      </DashboardLayout>
    </>
  );
};
