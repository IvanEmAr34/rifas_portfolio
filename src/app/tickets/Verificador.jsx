"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./tickets.module.css";
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Slide,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { LdsEllipsis } from "@/loaders/loaders";
import ticketsService from "../services/ticketsService";
import ChipTicket, { TYPE_SELECTED } from "./ChipTicket";

const TICKET_STATUS_PENDING = "PENDING";
const TICKET_STATUS_NOTAVAILABLE = "NOTAVAILABLE";
const TICKET_STATUS_AVAILABLE = "AVAILABLE";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});

const Verificador = (props) => {
  const { params, maxTickets } = props;
  const { rifa_id } = params;

  const [number, setNumber] = useState("");
  const [searching, setSearching] = useState(false);
  const [openNumberSelector, setOpenNumberSelector] = useState({
    isOpen: false,
    allTickets: [],
  });
  const [ticketSelected, setIicketSelected] = useState({
    isOpen: false,
    ticketInfo: null,
  });

  const searchNumber = (numberToSearch) => {
    if (!numberToSearch) {
      numberToSearch = number;
    }
    setSearching(true);
    ticketsService
      .getTicketInfo(rifa_id, numberToSearch)
      .then((response) => {
        if (response.data.length > 1) {
          setOpenNumberSelector({
            isOpen: true,
            allTickets: response.data,
          });
        } else if (response.data.length === 1) {
          setIicketSelected({
            isOpen: true,
            ticketInfo: response.data[0],
          });
        }
      })
      .catch((err) => {
        console.error("error: ", err);
        setIicketSelected({ isOpen: false, ticketInfo: null, notFound: true });
      })
      .finally(() => {
        setSearching(false);
      });
  };

  const showTicketNumber = (ticketNumber) => {
    setOpenNumberSelector((prev) => ({ ...prev, isOpen: false }));
    const ticketInfo = (openNumberSelector.allTickets ?? []).find(
      (ticket) => `${ticket.ticket_number}` === `${ticketNumber}`
    );
    setIicketSelected({
      isOpen: !!ticketInfo,
      ticketInfo,
      notFound: !ticketInfo,
    });
  };

  const handleClose = (setFunction) => {
    setFunction((prev) => ({ ...prev, isOpen: false }));
  };

  const getTicketSeverity = () => {
    if (!ticketSelected.ticketInfo?.status) {
      return "";
    }
    switch (ticketSelected.ticketInfo?.status) {
      case TICKET_STATUS_PENDING:
        return "warning";
      case TICKET_STATUS_NOTAVAILABLE:
        return "error";
      case TICKET_STATUS_AVAILABLE:
        return "success";

      default:
        return "";
    }
  };
  const getTicketMessage = () => {
    if (!ticketSelected.ticketInfo?.status) {
      return "";
    }
    switch (ticketSelected.ticketInfo?.status) {
      case TICKET_STATUS_PENDING:
        return "Boleto pendiente de pago o verificacion";
      case TICKET_STATUS_NOTAVAILABLE:
        return "Boleto no disponible";
      case TICKET_STATUS_AVAILABLE:
        return "Boleto disponible";

      default:
        return "";
    }
  };

  return (
    <div id="tickets" className={`${styles.card} card mt-4 mb-5`}>
      <h1 className={`${styles.title}`}>Verificador de boletos</h1>
      <Grid container className={styles.verificadorInputContainer}>
        <Grid item xs={12}>
          <TextField
            className={styles.searcherInput}
            id="outlined-basic"
            label="Número de boleto"
            variant="outlined"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
            InputProps={{
              startAdornment: (
                <>
                  <FontAwesomeIcon icon={faSearch} width={25} height={25} />
                  &nbsp;
                </>
              ),
              endAdornment: searching ? (
                <span className={`searchLoader`}>
                  <LdsEllipsis />
                </span>
              ) : null,
            }}
          />
        </Grid>
        {ticketSelected && ticketSelected?.notFound && (
          <Grid item xs={12}>
            <Alert severity="success">Número de boleto disponible</Alert>
          </Grid>
        )}
        <Grid item xs={12} className="mt-2">
          <Button
            className={`${styles.counterButton} ${styles.regularButton} w-100`}
            variant="contained"
            onClick={() => searchNumber()}
            disabled={number === ""}
          >
            Buscar boleto
          </Button>
        </Grid>
      </Grid>

      {/* dialog to choose  tickets */}
      <Dialog
        open={openNumberSelector.isOpen && !searching}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose(setOpenNumberSelector)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Selecciona uno de los números encontrados"}</DialogTitle>
        <DialogContent>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={""}
            label=""
            onChange={(e) => showTicketNumber(e.target.value)}
            className="w-100"
          >
            {(openNumberSelector.allTickets ?? []).map((ticket) => (
              <MenuItem
                key={`menuItem-${ticket.ticket_number}`}
                value={ticket.ticket_number}
              >
                {ticket.ticket_number}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            className={`${styles.counterButton} ${styles.regularButton} w-100`}
            onClick={() => handleClose(setOpenNumberSelector)}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={ticketSelected.isOpen && !searching}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose(setIicketSelected)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="text-center">
          {ticketSelected?.ticketInfo?.ticket_number && (
            <ChipTicket
              selectableType={TYPE_SELECTED}
              ticketNumber={ticketSelected?.ticketInfo?.ticket_number}
              canBeDeleted={false}
              maxTickets={maxTickets}
            />
          )}
        </DialogTitle>
        <DialogContent style={{ minWidth: "300px" }}>
          <Grid container>
            <Grid item xs={12}>
              <Alert severity={getTicketSeverity()}>{getTicketMessage()}</Alert>
              <hr />
              <h6>
                <strong>Estado:</strong> &nbsp;
                {ticketSelected?.ticketInfo?.client_state}
              </h6>
              <h6>
                <strong>Nombre:</strong> &nbsp;
                {ticketSelected?.ticketInfo?.client_name}
              </h6>
              <h6>
                <strong>Telefono:</strong>
                &nbsp;
                {ticketSelected?.ticketInfo?.client_lada}&nbsp;
                {ticketSelected?.ticketInfo?.client_phone}
              </h6>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className={`${styles.counterButton} ${styles.regularButton} w-100`}
            onClick={() => handleClose(setIicketSelected)}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Verificador;
