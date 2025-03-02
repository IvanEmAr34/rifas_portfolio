'use client';

import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import rifasService from "./services/rifasService";

export default function Home() {
  useEffect(() => {
    document.location.href = 1;
    // rifasService
    //   .getRifas()
    //   .then((response) => {
    //     if(response.data.length === 1){
    //       document.location.href = response.data[0].id
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("err: ", err);
    //   });
  });

  return (
    <></>
  );
}
