"use client";
import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "1100px",
  maxHeight: "95vh",
  overflow: "auto",
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

interface ContactFormsProps {
  open: boolean;
  handleOpen: React.MouseEventHandler<HTMLButtonElement>;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  handleSend: React.MouseEventHandler<HTMLButtonElement>;
}

const ContactForm: React.FC<ContactFormsProps> = ({
  open,
  handleOpen,
  handleClose,
  handleSend,
}) => {
  const [message, setMessage] = useState("");

  function handleChange(element: any) {
    const value = element.target.value;
    setMessage(value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //TODO: send to api
    // confirmation alert
    //console.log("click sent");

    setMessage("");
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Contact candidate"
        aria-describedby="Form to contact a candidate"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Contact candidate
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Start building communication! Establish how you will continue the
            process and continue to communicate.
          </Typography>
          <Box sx={{ my: 2, pb: 1 }} onSubmit={handleSubmit} component="form">
            <TextField
              required
              multiline
              maxRows={10}
              minRows={10}
              autoComplete="false"
              name="comment"
              id="comment"
              size="small"
              value={message || ""}
              label="Message"
              fullWidth
              onChange={handleChange}
            />
            <Typography sx={{ mt: 1 }} variant="body2">
              What to Include in a First-Touch Email:
            </Typography>
            <List sx={{ listStyleType: "disc", fontSize: "small" }}>
              <ListItem sx={{ display: "list-item", mb: 0, ml: 2, p: 0 }}>
                How you found the candidate: Add a personal detail you noticed
                to develop a solid relationship with the candidate.
              </ListItem>
              <ListItem sx={{ display: "list-item", mb: 0, ml: 2, p: 0 }}>
                The role you&#39;d like them to apply for: Let them know what
                the job opening is within the first two sentences.
              </ListItem>
              <ListItem sx={{ display: "list-item", p: 0, ml: 2 }}>
                Why they would be a good fit: Make the individual want to apply
                and sell them on their own candidacy.
              </ListItem>
            </List>
            <Typography sx={{ mb: 2 }}>
              This is a template you can copy and modify:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Dear <strong> &#91;Candidate Name&#93; </strong>,
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Our team at <strong>&#91;Company Name&#93;</strong> was impressed
              by your profile on SHIFT, and we&#39;re excited to reach out about
              a unique opportunity to join our team as a{" "}
              <strong>[Job Title]</strong>.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              We&#39;re looking for a talented individual with your experience
              in <strong>&#91;Field/Skill&#93;</strong> to help us{" "}
              <strong>&#91;Company Mission&#93;</strong>. Your skills and
              experience would be a valuable asset to our team, and we&#39;re
              confident that you would thrive in this challenging and rewarding
              role.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              If you're interested in learning more about the position and our
              company, please schedule a time to chat with me by clicking the
              link below:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>[Calendar Link]</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              I look forward to hearing from you soon.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Best regards, <strong>[Your Name]</strong>
            </Typography>
            <Button
              sx={{ float: "right", my: 0, textTransform: "none" }}
              type="submit"
              variant="contained"
              onClick={handleSend}
            >
              Start contact
            </Button>
            <Button
              sx={{ float: "right", my: 0, textTransform: "none", mr: 2 }}
              variant="outlined"
              name="back"
              onClick={handleClose}
            >
              Go back
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default ContactForm;
