"use client";
import React, { useEffect, useRef, useState } from "react";

import styles from "./tickets.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { LdsEllipsis } from "@/loaders/loaders";
import ChipTicket, { TYPE_SELECTABLE } from "./ChipTicket";
import SearchTicket from "./SearchTicket";
import { Button, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClover } from "@fortawesome/free-solid-svg-icons";

const NUMBERS_FIRST_PAGE = 300;
const NUMBERS_REST_PAGES = 60;
const TIMEOUT_RANDOM_SELECT = 5000;

const getArrayOfNumbers = (maxTickets) => {
  return Array.from({ length: maxTickets }, (_, i) => i + 1);
};

const SelectTickets = (props) => {
  const {
    maxTickets,
    notAvailableTicketsNumbers,
    selectedTickets,
    selectTicket,
    selectTickets,
    renderSelectFooter,
    ticketsCounter,
  } = props;

  const allTicketsNumbers = useRef(getArrayOfNumbers(maxTickets));
  const searchedNumbers = useRef(null);
  const [page, setPage] = useState(0);
  const [numberToSearch, setNumberToSearch] = useState("");
  const [isLukyNumbers, setIsLukyNumbers] = useState(false);
  const itemsPerPage =
    page <= 1
      ? page * NUMBERS_FIRST_PAGE
      : (page - 1) * NUMBERS_REST_PAGES + NUMBERS_FIRST_PAGE;

  const maxTicketsToShow = searchedNumbers?.current?.length ?? maxTickets;

  useEffect(() => {
    addNextPage();
  }, []);

  useEffect(() => {
    searchNumber();
  }, [numberToSearch]);

  useEffect(() => {
    if (!isLukyNumbers) {
      return;
    }
    location.href = "#comprar";
    let numbersSelected = [];
    for (let ticketIdx = 0; ticketIdx < selectedTickets.length; ticketIdx++) {
      let nextNumberSelected = 0;
      nextNumberSelected = parseInt(Math.random() * maxTickets + 1);
      while (
        numbersSelected.includes(nextNumberSelected) ||
        (notAvailableTicketsNumbers ?? []).includes(nextNumberSelected) ||
        nextNumberSelected > maxTickets
      ) {
        nextNumberSelected++;
        if (nextNumberSelected > maxTickets) {
          nextNumberSelected = 1;
        }
      }
      numbersSelected.push(nextNumberSelected);
    }
    setTimeout(() => {
      selectTickets(numbersSelected);
      setIsLukyNumbers(false);
    }, TIMEOUT_RANDOM_SELECT);
  }, [isLukyNumbers]);

  const searchNumber = () => {
    if (numberToSearch == "") {
      searchedNumbers.current = null;
    } else {
      const foundedNumbers = allTicketsNumbers.current.filter((ticketNumber) =>
        `${ticketNumber}`.includes(`${numberToSearch}`)
      );
      if (foundedNumbers.length > 0) {
        searchedNumbers.current = foundedNumbers;
      } else {
        searchedNumbers.current = [];
      }
    }
    setPage((prevPage) => (prevPage == 1 ? prevPage + 1 : 1));
  };

  const addNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const selectRandomNumbers = () => {
    setPage(1);
    setIsLukyNumbers(true);
  };

  return (
    <>
      <Grid container className="mb-1 mt-1">
        <Grid item xs={12} md={6}>
          <Button
            className={`${styles.counterButton} ${styles.regularButton}`}
            variant="contained"
            onClick={selectRandomNumbers}
            startIcon={
              <FontAwesomeIcon icon={faClover} width={25} height={25} />
            }
            endIcon={<FontAwesomeIcon icon={faClover} width={25} height={25} />}
            disabled={isLukyNumbers}
          >
            Números a la suerte
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <SearchTicket
            numberToSearch={numberToSearch}
            setNumberToSearch={setNumberToSearch}
          />
        </Grid>
      </Grid>
      <InfiniteScroll
        dataLength={itemsPerPage}
        next={addNextPage}
        hasMore={!isLukyNumbers && itemsPerPage < maxTicketsToShow}
        loader={<LdsEllipsis />}
        height={300}
      >
        <div>
          {(searchedNumbers.current ?? allTicketsNumbers.current ?? []).map(
            (ticketNumber, indexTicket) => {
              return indexTicket <= itemsPerPage ? (
                <ChipTicket
                  key={`ticket-${ticketNumber}`}
                  ticketNumber={ticketNumber}
                  selectedTickets={selectedTickets}
                  notAvailableTicketsNumbers={notAvailableTicketsNumbers}
                  selectTicket={selectTicket}
                  selectableType={TYPE_SELECTABLE}
                  isLukyNumbers={isLukyNumbers}
                  maxTickets={maxTickets}
                />
              ) : null;
            }
          )}
        </div>
      </InfiniteScroll>
      {renderSelectFooter()}
    </>
  );
};

export default SelectTickets;
