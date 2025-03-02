"use client";
import React, { memo, useEffect, useState } from "react";

import styles from "./tickets.module.css";
import { Chip } from "@mui/material";

export const TYPE_SELECTABLE = "TYPE_SELECTABLE";
export const TYPE_SELECTED = "TYPE_SELECTED";
export const TYPE_EMPTY = "TYPE_EMPTY";

const MAX_TIMEOUT_START = 100;

const ticketsListHasNumber = (ticketsList, ticketNumber) => {
  return ticketsList.find((ticket) => ticket.number === ticketNumber);
};

const areChipPropsEquals = (oldProps, newProps) => {
  const old_ticketNumber = oldProps.ticketNumber;
  const old_selectedTickets = oldProps.selectedTickets;
  const old_notAvailableTicketsNumbers = oldProps.notAvailableTicketsNumbers;
  const old_selectableType = oldProps.selectableType;
  const old_isLukyNumbers = oldProps.isLukyNumbers;

  const new_ticketNumber = newProps.ticketNumber;
  const new_selectedTickets = newProps.selectedTickets;
  const new_notAvailableTicketsNumbers = newProps.notAvailableTicketsNumbers;
  const new_selectableType = newProps.selectableType;
  const new_isLukyNumbers = newProps.isLukyNumbers;

  let areEquals = old_selectableType === new_selectableType;
  areEquals = areEquals && old_isLukyNumbers === new_isLukyNumbers;
  if (areEquals && old_selectableType === TYPE_SELECTABLE) {
    areEquals =
      areEquals &&
      old_notAvailableTicketsNumbers.includes(old_ticketNumber) ===
        new_notAvailableTicketsNumbers.includes(new_ticketNumber);
    areEquals =
      areEquals &&
      ticketsListHasNumber(old_selectedTickets, old_ticketNumber) ===
        ticketsListHasNumber(new_selectedTickets, new_ticketNumber);
  }
  areEquals = areEquals && old_ticketNumber === new_ticketNumber;
  return areEquals;
};

const getEmptyNumbers = (max, number, mask) => {
  const difference = `${max}`.length - `${number}`.length;
  let emptyNumbers = "";
  for (let idx = 0; idx < difference; idx++) {
    emptyNumbers = `${emptyNumbers}${mask ?? 0}`;
  }
  return emptyNumbers;
};

const ChipTicket = memo((props) => {
  const {
    selectableType,
    ticketNumber,
    selectedTickets,
    notAvailableTicketsNumbers,
    selectTicket,
    isLukyNumbers,
    canBeDeleted,
    maxTickets,
  } = props;

  const [isLukyNumbersEnabled, setIsLukyNumbersEnabled] = useState(false);

  useEffect(() => {
    if (isLukyNumbers) {
      let timerToStart = Math.random() * MAX_TIMEOUT_START;
      setTimeout(() => {
        setIsLukyNumbersEnabled(true);
      }, timerToStart);
    } else {
      setIsLukyNumbersEnabled(false);
    }
  }, [isLukyNumbers]);

  switch (selectableType) {
    case TYPE_SELECTABLE:
      return (
        <Chip
          className={`${styles.chipTicket} ${
            !notAvailableTicketsNumbers.includes(ticketNumber)
              ? ticketsListHasNumber(selectedTickets, ticketNumber)
                ? isLukyNumbersEnabled
                  ? styles.blinkChipSelected
                  : styles.chipSelected
                : isLukyNumbersEnabled
                ? styles.blinkChipEnabled
                : styles.chipEnabled
              : isLukyNumbersEnabled
              ? styles.blinkChipDisabled
              : styles.chipDisabled
          }`}
          label={<strong>{getEmptyNumbers(maxTickets, ticketNumber)}{ticketNumber}</strong>}
          onClick={
            notAvailableTicketsNumbers.includes(ticketNumber)
              ? null
              : () => selectTicket(ticketNumber)
          }
        />
      );
    case TYPE_SELECTED:
      return (
        <Chip
          className={`${styles.chipTicket} ${styles.chipSelected}`}
          label={<strong>{getEmptyNumbers(maxTickets, ticketNumber)}{ticketNumber}</strong>}
          onDelete={
            canBeDeleted !== false ? () => selectTicket(ticketNumber) : null
          }
        />
      );
    case TYPE_EMPTY:
      return (
        <Chip
          className={`${styles.chipTicket} ${styles.chipEmpty}`}
          label={<strong>{getEmptyNumbers(maxTickets, "", "_ ")}</strong>}
        />
      );
    default:
      break;
  }
}, areChipPropsEquals);

ChipTicket.displayName = "ChipTicket";

export default ChipTicket;
