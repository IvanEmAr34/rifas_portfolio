"use client";
import React, { useState } from "react";

import {
  FormGroup,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import styles from "./tickets.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTag } from "@fortawesome/free-solid-svg-icons";
import FormBank from "./FormBank";

const NAME_CLENT_NAME = "clientName";
const NAME_CLENT_PHONE = "clientPhone";
const NAME_CLENT_STATE = "clientState";

const states = [
  { label: "Aguascalientes", value: "Aguascalientes" },
  { label: "Baja California", value: "Baja California" },
  { label: "Baja California Sur", value: "Baja California Sur" },
  { label: "Campeche", value: "Campeche" },
  { label: "Chiapas", value: "Chiapas" },
  { label: "Chihuahua", value: "Chihuahua" },
  { label: "Ciudad de México", value: "Ciudad de México" },
  { label: "Coahuila", value: "Coahuila" },
  { label: "Colima", value: "Colima" },
  { label: "Durango", value: "Durango" },
  { label: "Guanajuato", value: "Guanajuato" },
  { label: "Guerrero", value: "Guerrero" },
  { label: "Hidalgo", value: "Hidalgo" },
  { label: "Jalisco", value: "Jalisco" },
  { label: "México", value: "México" },
  { label: "Michoacán", value: "Michoacán" },
  { label: "Morelos", value: "Morelos" },
  { label: "Nayarit", value: "Nayarit" },
  { label: "Nuevo León", value: "Nuevo León" },
  { label: "Oaxaca", value: "Oaxaca" },
  { label: "Puebla", value: "Puebla" },
  { label: "Querétaro", value: "Querétaro" },
  { label: "Quintana Roo", value: "Quintana Roo" },
  { label: "San Luis Potosí", value: "San Luis Potosí" },
  { label: "Sinaloa", value: "Sinaloa" },
  { label: "Sonora", value: "Sonora" },
  { label: "Tabasco", value: "Tabasco" },
  { label: "Tamaulipas", value: "Tamaulipas" },
  { label: "Tlaxcala", value: "Tlaxcala" },
  { label: "Veracruz", value: "Veracruz" },
  { label: "Yucatán", value: "Yucatán" },
  { label: "Zacatecas", value: "Zacatecas" },
];

const FormUserData = (props) => {
  const [captchaValue, setCaptchaValue] = useState(null);
  const { ticketsState, setFormData, rifaInfo } = props;
  const changeInput = (e) => {
    const inputName = e.target.name;
    let nextValue = e.target.value;
    switch (inputName) {
      case NAME_CLENT_NAME:
      case NAME_CLENT_STATE:
        nextValue = nextValue.replace(/[^a-zA-Z ]/g, "");
        break;
      case NAME_CLENT_PHONE:
        nextValue = nextValue.substring(0, 10);
        break;

      default:
        break;
    }
    setFormData(inputName, nextValue);
  };

  return (
    <div className={styles.formUserContainer}>
      <h4 className={styles.formUserTitle}>
        <FontAwesomeIcon icon={faUserTag} width={25} /> Datos personales
      </h4>
      <Grid container className={styles.personalDataContainer}>
        <Grid item xs={12} md={6}>
          <FormGroup className={`${styles.personalDataInputGroup} w-100`}>
            <TextField
              id="outlined-basic"
              label="Nombre y Apellidos"
              variant="outlined"
              name="clientName"
              value={ticketsState.clientName ?? ""}
              onChange={changeInput}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormGroup className={`${styles.personalDataInputGroup} w-100`}>
            <TextField
              id="outlined-basic"
              label="Celular"
              variant="outlined"
              name="clientPhone"
              value={ticketsState.clientPhone ?? ""}
              onChange={changeInput}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+52</InputAdornment>
                ),
              }}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormGroup className={`${styles.personalDataInputGroup} w-100`}>
            <TextField
              id="outlined-basic"
              label="Estado"
              variant="outlined"
              name="clientState"
              value={ticketsState.clientState ?? ""}
              onChange={changeInput}
              select
            >
              {states.map((state) => (
                <MenuItem key={state.value} value={state.value}>
                  {state.label}
                </MenuItem>
              ))}
            </TextField>
          </FormGroup>
        </Grid>
      </Grid>
      <FormBank
        setFormData={setFormData}
        ticketsState={ticketsState}
        rifaInfo={rifaInfo}
      />
    </div>
  );
};

export default FormUserData;
