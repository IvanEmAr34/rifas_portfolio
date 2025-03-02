"use client";
import React, { useEffect, useRef, useState } from "react";

import { Button, FormGroup, InputAdornment, TextField } from "@mui/material";
import styles from "./tickets.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { LdsEllipsis } from "@/loaders/loaders";

const DEBOUCE_TIME = 500;
const KEY_ESCAPE = "Escape";

const SearchTicket = (props) => {
  const { setNumberToSearch } = props;
  const timeoutSearchValue = useRef(null);
  const firstRender = useRef(true);
  const [newSearchValue, setNewSearchValue] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      createTimeout();
    }
  }, [newSearchValue]);

  const createTimeout = () => {
    if (timeoutSearchValue.current) {
      clearTimeout(timeoutSearchValue.current);
    }
    setSearching(true);

    timeoutSearchValue.current = setTimeout(() => {
      setSearching(false);
      setNumberToSearch(
        newSearchValue === "" || typeof newSearchValue === "number"
          ? newSearchValue
          : ""
      );
    }, DEBOUCE_TIME);
  };

  const searchNumber = (e) => {
    const nextValue = parseInt(e.target.value);
    setNewSearchValue(nextValue >= 0 ? nextValue : "");
  };

  return (
    <div className={styles.searchContainer}>
      <FormGroup className={styles.searchInputGroup}>
        {!searchEnabled && (
          <Button
            className={`${styles.counterButton} ${styles.regularButton}`}
            variant="contained"
            onClick={() => setSearchEnabled(true)}
            startIcon={
              <FontAwesomeIcon icon={faSearch} width={25} height={25} />
            }
          >
            Buscar
          </Button>
        )}
        {searchEnabled && (
          <TextField
            className={styles.searcherInput}
            id="outlined-basic"
            label="Buscar número de boleto"
            variant="outlined"
            onChange={searchNumber}
            onKeyDown={(e) => {
              if (e.key === KEY_ESCAPE) {
                setSearchEnabled(false);
                setNumberToSearch("");
              }
            }}
            name="ticketNumber"
            type="number"
            value={newSearchValue}
            autoFocus
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
            // color="secondary"
          />
        )}
      </FormGroup>
    </div>
  );
};

export default SearchTicket;
