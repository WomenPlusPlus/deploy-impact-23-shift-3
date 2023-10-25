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
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import { SyntheticEvent } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "1100px",
  height: "95vh",
  overflow: "auto",
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

interface ViewCvProps {
  openCv: boolean;
  handleOpen: React.MouseEventHandler<HTMLButtonElement>;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  candidateId: number;
}

const ViewCv: React.FC<ViewCvProps> = ({
  openCv,
  handleOpen,
  handleClose,
  candidateId = 1,
}) => {

  //TODO: call to api with candidate id to get link to cv
 const testCv = "http://africau.edu/images/default/sample.pdf";

  return (
    <div>
      <Modal
        open={openCv}
        onClose={handleClose}
        aria-labelledby="Contact candidate"
        aria-describedby="Form to contact a candidate"
      >
        <Box sx={style}>
          <object
            data={testCv}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>We were not able to display the selected file.</p>

          </object>
        </Box>
      </Modal>
    </div>
  );
};
export default ViewCv;
