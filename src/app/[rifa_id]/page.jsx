"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import "bootstrap/dist/css/bootstrap.min.css";
import rifasService from "../services/rifasService";

import styles from "./landing.module.css";
import Banner from "./banner/page";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Contacto from "../contacto/page";

const Tickets = dynamic(() => import("../tickets/page"), { ssr: false });
const Verificador = dynamic(() => import("../tickets/Verificador"), { ssr: false });

const RIFA_LOGO_ID = "rifaLogo";
const RIFA_BANNER_ID = "rifaBanner";

const DEFAULT_BANNER = "/banner.jpg";
const DEFAULT_LOGO = "/logo_rifas.jpg";

const formatNumber_00 = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

const setColors = (colors) => {
  colors.primary &&
    colors.primary !== "" &&
    document.documentElement.style.setProperty(
      "--primary-color",
      colors.primary
    );
  colors.secondary &&
    colors.secondary !== "" &&
    document.documentElement.style.setProperty(
      "--secondary-color",
      colors.secondary
    );
  colors.primaryLight &&
    colors.primaryLight !== "" &&
    document.documentElement.style.setProperty(
      "--primary-light-color",
      colors.primaryLight
    );
  colors.shadows &&
    colors.shadows !== "" &&
    document.documentElement.style.setProperty(
      "--shadow-color",
      colors.shadows
    );
  colors.black &&
    colors.black !== "" &&
    document.documentElement.style.setProperty("--black-color", colors.black);
};

const setImage = (imageId, logoB64, defaultImage) => {
  const imageInNav = document.getElementById(imageId);
  if (logoB64 && logoB64 !== "") {
    imageInNav.src = logoB64;
  } else {
    imageInNav.src = defaultImage;
  }
  imageInNav.classList.remove("d-none");
};

const Landing = (props) => {
  const { params } = props;
  const { rifa_id } = params;
  const [rifaInfo, setRifaInfo] = useState({
    date: "22/02/2023",
    date_start: "23/02/2023",
    date_end: "22/02/2024",
    hour: "12:00",
    title: "Gran rifa de prueba!",
    description: "Rifa con causa para apoyar al portafolio de Ivan Arredondo",
    maxTickets: 50000,
    ticketCost: 500,
    currency: "MXN",
    config: {},
    logo: null,
    banner: null,
    awards: [],
    notAvailableTicketsNumbers: [9, 19, 21],
    availableTicketsToBuy: null,
    bankAccounts: [
      {
        bank: "BBVA",
        account: 111111111111111111,
      },
      {
        bank: "Banorte",
        clabe: 1111111111,
      },
      {
        bank: "Santander",
        card: 123412341244321,
      },
    ],
  });

  useEffect(() => {
    rifa_id && loadRifaInfo();
  }, [rifa_id]);

  const loadRifaInfo = () => {
    setImage(RIFA_LOGO_ID, "", DEFAULT_LOGO);
    setImage(RIFA_BANNER_ID, "", DEFAULT_BANNER);
  };

  return (
    <>
      <div id="top"></div>
      <div className={styles.landingContent}>
        <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHA_SITE_KEY}>
          <Banner rifaInfo={rifaInfo} />
          {rifaInfo.maxTickets && (
            <Tickets
              {...props}
              rifaInfo={rifaInfo}
              rifa_id={parseInt(rifa_id)}
              reloadRifaInfo={loadRifaInfo}
            />
          )}
          <Verificador {...props} maxTickets={rifaInfo.maxTickets} />
          <Contacto />
        </GoogleReCaptchaProvider>
      </div>
    </>
  );
};

export default Landing;
