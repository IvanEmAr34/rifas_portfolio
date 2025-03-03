import React from "react";
import Image from "next/image";

import styles from "./banner.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faClock,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@mui/material";

const Banner = (props) => {
  const { rifaInfo = {awards:{}} } = props;
  const { awards } = rifaInfo;
  const awardsOrdered = Object.keys(awards).sort();

  return (
    <Grid container className={styles.bannerContainer}>
      <Grid item xs={12}>
        <div className={styles.banner}>
          <Image
            id="rifaBanner"
            className="d-none"
            src={""}
            width={200}
            height={200}
            alt="banner"
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={styles.description}>
          <div className={styles.sideInfoContent}>
            <p className={styles.sideInfoContent}>
              <FontAwesomeIcon icon={faCalendarDay} className={styles.icon} />
              <strong className={styles.sideInfo}>{rifaInfo.date}</strong>
            </p>
            <p className={styles.sideInfoContent}>
              <FontAwesomeIcon icon={faClock} className={styles.icon} />
              <strong className={styles.sideInfo}>{rifaInfo.hour}</strong>
            </p>
          </div>
          <h1 className={styles.title}>
            <strong>{rifaInfo.title}</strong>
          </h1>
          <p>
            <strong className={styles.sideInfo}>{rifaInfo.description}</strong>
          </p>
          <h2>
            <strong>{rifaInfo.maxTickets}&nbsp;Boletos</strong>
          </h2>
          <br />

          {(awardsOrdered ?? []).map((awardPosition, idx) => (
            <p key={`awardContent-${idx}`} className={styles.awardContent}>
              <FontAwesomeIcon icon={faMedal} className={styles.icon} />
              <strong className={styles.sideInfo}>
                {awards[awardPosition].position}: {awards[awardPosition].award}
              </strong>
            </p>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default Banner;
