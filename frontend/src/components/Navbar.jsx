// Navbar.js
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "20px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Navbar({ verification }) {
  // snackbar
  const [openSnack, setOpensnack] = React.useState(false);
  const [authenticate, setAuthentic] = React.useState(false);
  const handleClick = () => {
    setOpensnack(true);
  };

  const handleClosesnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // states for the modal
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    number: "",
  });

  const [push, setPush] = useState(false);
  const [otp, setOtp] = useState();

  const [requestId, setRequest] = useState();

  // function for details when changed
  const handleFieldChange = (event) => {
    const { id, value } = event.target;
    setDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  // this is for the otp
  const submitOTP = async () => {
    try {
      const headers = {
        "X-API-KEY":
          "neurelo_9wKFBp874Z5xFw6ZCfvhXTB7KmsbHuDA+mE09T3i49lScBOe3iqa0oBmKmehC3aw56YGaa1g/+/QrFmD7A0vWye4HNG6nk51p6i8x7out+VPJpHTshHYFe3Xi4UXF2nweoB+TwcU/rUNB/aA/2a3MhIvR+tzD/vhq4y0+OnRnGvdewwHqIR8TRY0rqmy87pa_F/f8yBK2UOEqY4TWwJ7KrbD/bp5o9fKHCOiFJTApRVs=",
      };

      axios
        .post(
          "https://ap-south-1.aws.neurelo.com/rest/User/__one?",
          {
            name: details.name,
            phoneNo: details.number,
            email: details.email,
            isVerified: true,
          },

          {
            headers,
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setOpensnack(true);
      setAuthentic(true);
      verification();

      setTimeout(() => {
        setOpensnack(false);
      }, 3000);
      const response = await axios.post("http://localhost:3000/submit-otp", {
        otp: otp,
        requestId: requestId,
      });
      console.log("response is", response);
      localStorage.setItem("otp", otp);
    } catch (err) {
      console.log("error is", err);
      localStorage.setItem("otp", otp);
    }
  };

  const submitDetail = async () => {
    setRequest("yes");

    try {
      console.log(details);

      // submit-details

      const response = await axios.post(
        "http://localhost:3000/submit-details",
        details
      );

      console.log("Response from backend:", response.data);
      setRequest("yes");
      // console.log("setted requestId is ", requjestId);

      // Handle response from backend if necessary
    } catch (error) {
      console.error("Error submitting details:", error);
      // Handle error
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className="w-11/12 z-20 top-0 left-0 lg:px-12   border border-[#D9D9D9]  bg-[#FFFFFF]  rounded-full font-monserrat"
      style={{
        // background: "rgb(225,246,249)",
        // background:
        //   "linear-gradient(133deg, rgba(225,246,249,1) 4%, rgba(81,156,233,1) 100%)",
        backdropFilter: "blur(50px)",
        background: "#FFFFFF48",
        color: "black",
      }}
    >
      <div className="flex flex-wrap items-center justify-between lg:px-8 sm:px-4 px-5 py-2">
        <p className="flex items-center justify-between">
          <span className="font-monserrat text-2xl  whitespace-nowrap text-black  ">
            VigilAI
          </span>
        </p>

        <div className="flex md:order-2 justify-center align-middle items-center">
          <button
            onClick={handleOpen}
            type="button"
            disabled={authenticate ? true : false}
            className=" bg-[#516AE9] h-6 font-Montserrat hover:bg-indigo-100 hover:text-black hover:font-semibold transition-all duration-300 font-thin rounded-full font-monserrat text-white lg:text-base sm:text-sm text-xs lg:px-6 px-5 lg:h-12 lg:py-1 py-0 text-center mr-3 md:mr-0"
          >
            {authenticate ? <>Authenticated</> : <>Authenticate</>}
          </button>

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
            aria-controls="navbar-sticky"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between gap-10 w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? "" : "hidden"
          }`}
        >
          <p className="font-monserrat font-regular ">
            Upgrade Security with US
          </p>
          {/* modal for the details */}
          <Modal
            open={open}
            sx={{
              borderRadius: "30px",
            }}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            {!requestId ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Enter Your details
                </Typography>
                <div className="flex flex-col justify-center items-center gap-2 mt-4">
                  <TextField
                    required
                    id="name"
                    label="Name"
                    onChange={handleFieldChange}
                  />
                  <TextField
                    required
                    id="email"
                    label="Email"
                    onChange={handleFieldChange}
                  />

                  <TextField
                    required
                    id="number"
                    label="Phone Number"
                    onChange={handleFieldChange}
                  />

                  <button
                    className="bg-[#000000] hover:bg-[#6aa4d3]  transition duration-300 p-4 rounded-lg  text-white"
                    onClick={submitDetail}
                  >
                    Submit
                  </button>
                </div>
              </Box>
            ) : (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Enter Your OTP
                </Typography>
                <div className="flex flex-col justify-center items-center gap-2 mt-4">
                  <TextField
                    required
                    id="name"
                    label="Name"
                    onChange={handleOtpChange}
                  />

                  <button
                    className="bg-[#000000]  p-4 rounded-lg  text-white"
                    onClick={submitOTP}
                  >
                    Submit OTP
                  </button>
                </div>
              </Box>
            )}
          </Modal>
        </div>
        <Snackbar
          open={openSnack}
          autoHideDuration={2000}
          onClose={handleClosesnack}
          message="Authenticated & User registered successfully"
        />
      </div>
    </nav>
  );
}

export default Navbar;
