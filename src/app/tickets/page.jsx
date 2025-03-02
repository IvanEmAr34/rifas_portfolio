"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import styles from "./tickets.module.css";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import SelectTickets from "./SelectTickets";
import ChipTicket, { TYPE_EMPTY, TYPE_SELECTED } from "./ChipTicket";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Slide,
  Snackbar,
} from "@mui/material";
import Swal from "sweetalert2";
import ticketsService from "../services/ticketsService";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Policies from "@/policies/policies";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});

const FormUserData = dynamic(() => import("./FormUserData"), { ssr: false });

const INCREASE_TICKET_COUNT = "INCREASE_TICKET_COUNT";
const DECREASE_TICKET_COUNT = "DECREASE_TICKET_COUNT";

const NOT_AVAIABLE_TICKET = "NOT_AVAIABLE_TICKET";
const BAD_REQUEST = "BAD_REQUEST";

const messageErrors = {
  default: "Intente mas tarde",
  [NOT_AVAIABLE_TICKET]: "Boletos seleccionados no disponibles",
  [BAD_REQUEST]: "Datos no validos",
};

const getEmptyTicket = (numberValue = 0) => ({
  number: numberValue,
});

const getEmptyTicketsComponent = (tickets = [], maxTickets) => {
  return tickets
    .filter((ticket) => ticket.number === 0)
    .map((ticket, idx) => (
      <ChipTicket
        key={`emptyTicket-${idx}`}
        selectableType={TYPE_EMPTY}
        maxTickets={maxTickets}
      />
    ));
};

const TicketCounter = (props) => {
  const {
    decreaseTicket,
    increaseTicket,
    selectedTickets,
    availableTicketsToBuy,
  } = props;
  const ticketsCounter = (selectedTickets ?? []).length;
  return (
    <div className={`${styles.counterContainer} `}>
      <IconButton
        className={`${styles.counterButton} ${styles.left}`}
        aria-label="Decrease"
        onClick={decreaseTicket}
        disabled={
          ticketsCounter <= 1 ||
          !selectedTickets.find((ticket) => ticket.number === 0)
        }
      >
        <FontAwesomeIcon icon={faMinus} />
      </IconButton>
      <span className={styles.counterValueSection}>
        <strong className={`${styles.counterValue} `}>
          {ticketsCounter ?? 0}
        </strong>
        <small>Boletos</small>
      </span>
      <IconButton
        className={`${styles.counterButton} ${styles.right}`}
        aria-label="Increase"
        onClick={increaseTicket}
        disabled={ticketsCounter >= availableTicketsToBuy}
      >
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
    </div>
  );
};

const Page = (props) => {
  const {
    rifaInfo = {
      notAvailableTicketsNumbers: [],
      availableTicketsToBuy: 0,
      ticketCost: 0,
    },
    rifa_id= null ,
    reloadRifaInfo = () => {}
  } = props;
  const { notAvailableTicketsNumbers, availableTicketsToBuy, ticketCost } =
    rifaInfo;
  const [ticketsState, setTicketsState] = useState({
    selectedTickets: [],
    total: 0,
  });
  const [savingClientInfo, setSavingClientInfo] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const [formError, setFormError] = useState({
    isOpen: false,
    message: "",
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    changeTicketCounter(INCREASE_TICKET_COUNT, [getEmptyTicket()]);
  }, []);

  const handleClosePolicies = () => setShowPolicies(false);
  const handleCloseError = () => setFormError({ isOpen: false, message: "" });
  const openErrorMessage = (message) => setFormError({ isOpen: true, message });

  const increaseTicket = () => changeTicketCounter(INCREASE_TICKET_COUNT);
  const decreaseTicket = () => changeTicketCounter(DECREASE_TICKET_COUNT);
  const getTotalCost = (totalTickets) => totalTickets * ticketCost;

  const changeTicketCounter = (changeType, newValue = null) => {
    setTicketsState((prevTicketsState) => {
      let nextTickets = prevTicketsState.selectedTickets;
      let nextTotal = prevTicketsState.total;
      switch (changeType) {
        case INCREASE_TICKET_COUNT:
          nextTickets = [...nextTickets, getEmptyTicket()];
          break;
        case DECREASE_TICKET_COUNT:
          let ticketIndex = prevTicketsState.selectedTickets.findIndex(
            (ticket) => ticket.number === 0
          );
          nextTickets = prevTicketsState.selectedTickets.filter(
            (ticket, ticketIdx) => ticketIdx !== ticketIndex
          );
          break;

        default:
          break;
      }

      nextTickets = newValue ?? nextTickets;
      nextTotal = getTotalCost(nextTickets.length);
      return {
        ...prevTicketsState,
        selectedTickets: nextTickets,
        total: nextTotal,
      };
    });
  };

  const saveClientInfo = async () => {
    if (
      !ticketsState.selectedTickets ||
      ticketsState.selectedTickets?.length < 1 ||
      ticketsState.selectedTickets?.find((ticket) => ticket.number === 0)
    ) {
      return openErrorMessage("Debe seleccionar almenos un número");
    }
    if (
      !ticketsState.clientName ||
      ticketsState.clientName?.length < 5 ||
      !ticketsState.clientPhone ||
      ticketsState.clientPhone?.length < 10 ||
      !ticketsState.clientState ||
      ticketsState.clientState === ""
    ) {
      return openErrorMessage("Debe llenar sus datos personales");
    }
    if (!ticketsState.voucher?.b64) {
      return openErrorMessage("Favor de adjuntar el comprobante de pago");
    }

    const token = await executeRecaptcha("submit");
    setSavingClientInfo(true);
    ticketsService
      .setTicketInfo({ ...ticketsState, rifa_id, token })
      .then((response) => {
        setSavingClientInfo(false);
        Swal.fire({
          title: "Boletos guardados",
          icon: "success",
          text: "con exito!",
          confirmButtonText: "Genial!",
          focusConfirm: true,
        }).then((result) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        console.error("err saving tickets: ", err);
        setSavingClientInfo(false);
        if (err.response?.data?.body) {
          reloadRifaInfo();
        }
        Swal.fire({
          title: "Error al guardar los boletos",
          icon: "error",
          text: messageErrors[err.response?.data?.body ?? "default"],
          confirmButtonText: "Cerrar",
          focusConfirm: true,
        });
      });
  };

  const selectTicket = (ticketNumberSelected) => {
    setTicketsState((prevTicketsState) => {
      let nextSelectedTickets = prevTicketsState.selectedTickets.filter(
        (ticket) => ticket.number !== ticketNumberSelected
      );
      let emptyTicketIndex = -1;

      if (
        prevTicketsState.selectedTickets.length === nextSelectedTickets.length
      ) {
        emptyTicketIndex = prevTicketsState.selectedTickets.findIndex(
          (ticket) => ticket.number === 0
        );
        if (emptyTicketIndex >= 0) {
          nextSelectedTickets = prevTicketsState.selectedTickets.map(
            (ticket, ticketIdx) => {
              if (ticketIdx === emptyTicketIndex) {
                return {
                  ...ticket,
                  number: ticketNumberSelected,
                };
              }
              return ticket;
            }
          );
        } else {
          nextSelectedTickets = [
            ...prevTicketsState.selectedTickets,
            getEmptyTicket(ticketNumberSelected),
          ];
        }
      }
      return {
        ...prevTicketsState,
        selectedTickets: nextSelectedTickets,
        total: getTotalCost(nextSelectedTickets.length),
      };
    });
  };

  const selectTickets = (ticketsSelectedNumbers = []) => {
    setTicketsState((prevTicketsState) => {
      return {
        ...prevTicketsState,
        selectedTickets: ticketsSelectedNumbers.map((ticketNumber) =>
          getEmptyTicket(ticketNumber)
        ),
      };
    });
  };

  const setFormData = (name, value = "") => {
    if (!name || name === "") {
      return;
    }
    setTicketsState((prevTicketsState) => {
      return {
        ...prevTicketsState,
        [name]: value,
      };
    });
  };

  return (
    <div id="comprar" className={`${styles.card} card`}>
      <h1 className={`${styles.title}`}>Lista de boletos</h1>
      <Grid container>
        <Grid item xs={12}>
          <TicketCounter
            increaseTicket={() => increaseTicket()}
            decreaseTicket={() => decreaseTicket()}
            selectedTickets={ticketsState.selectedTickets}
            availableTickets={availableTicketsToBuy}
          />
        </Grid>
        <Grid item xs={12}>
          <strong className={styles.counterTotal}>
            Total: $
            {ticketsState.total < ticketCost ? ticketCost : ticketsState.total}
          </strong>
          <br />
          <small>Costo: ${rifaInfo.ticketCost} por boleto</small>
          {rifaInfo.maxTickets && (
            <SelectTickets
              {...rifaInfo}
              selectedTickets={ticketsState.selectedTickets}
              selectTicket={selectTicket}
              selectTickets={selectTickets}
              renderSelectFooter={() => {
                return (
                  <div
                    id="numerosSeleccionados"
                    className={styles.ticketsContainer}
                  >
                    <strong className={styles.counterTotal}>
                      Seleccionados:&nbsp;
                      {
                        ticketsState.selectedTickets.filter(
                          (ticket) => ticket.number !== 0
                        ).length
                      }
                      &nbsp;de&nbsp;{ticketsState.selectedTickets.length}
                    </strong>
                    <div>
                      {(ticketsState.selectedTickets ?? [])
                        .filter((ticket) => ticket.number !== 0)
                        .map((ticket) => (
                          <ChipTicket
                            key={`selectedTickets:fromlist:${ticket.number}`}
                            ticketNumber={ticket.number}
                            selectedTickets={ticketsState.selectedTickets}
                            notAvailableTicketsNumbers={
                              notAvailableTicketsNumbers
                            }
                            selectTicket={selectTicket}
                            selectableType={TYPE_SELECTED}
                            maxTickets={rifaInfo.maxTickets}
                          />
                        ))}
                      {getEmptyTicketsComponent(
                        ticketsState.selectedTickets,
                        rifaInfo.maxTickets
                      )}
                    </div>
                  </div>
                );
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <FormUserData
            setFormData={setFormData}
            ticketsState={ticketsState}
            rifaInfo={rifaInfo}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={`${styles.counterButton} ${styles.regularButton}`}
            variant="contained"
            onClick={saveClientInfo}
            disabled={savingClientInfo}
            startIcon={
              savingClientInfo ? (
                <div class="lds-ring confirmLoader">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : null
            }
          >
            Confirmar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <small>
            Al confirmar autorizo el uso de mis{" "}
            <Button
              variant="text"
              size="small"
              onClick={() => setShowPolicies(true)}
            >
              datos personales
            </Button>
          </small>
        </Grid>
      </Grid>

      <Dialog
        open={showPolicies}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClosePolicies}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent style={{ minWidth: "300px" }}>
          <Grid container>
            <Grid item xs={12}>
              <Policies />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className={`${styles.counterButton} ${styles.regularButton} w-100`}
            onClick={handleClosePolicies}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={formError.isOpen}
        autoHideDuration={5000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {formError.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Page;
