"use client";

import React, { useEffect, useState } from "react";

import styles from "./tickets.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowUp,
  faMoneyBillTransfer,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import Image from "next/image";

const BANK_BBVA = "BBVA";
const BANK_BANORTE = "Banorte";
const BANK_SANTANDER = "Santander";

const BANK_BBVA_IMAGE = "sel-bbva.png";
const BANK_BANORTE_IMAGE = "sel-banorte.png";
const BANK_SANTANDER_IMAGE = "sel-santanderc.png";

const BANKS_INFO = {
  [BANK_BBVA]: {
    image: BANK_BBVA_IMAGE,
    name: BANK_BBVA,
  },
  [BANK_BANORTE]: {
    image: BANK_BANORTE_IMAGE,
    name: BANK_BANORTE,
  },
  [BANK_SANTANDER]: {
    image: BANK_SANTANDER_IMAGE,
    name: BANK_SANTANDER,
  },
};

const FILE_INPUT_NAME = "voucher";

const transformFileToB64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
      reject(reject);
    };
  });
};

const FormBank = (props) => {
  const { setFormData, ticketsState, rifaInfo } = props;
  const { bankAccounts } = rifaInfo;
  const [bankSelected, setBankSelected] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const file = ticketsState[FILE_INPUT_NAME];

  useEffect(() => {
    setBankSelected(bankAccounts ? bankAccounts[0] ?? {} : {});
  }, [bankAccounts]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = (e.dataTransfer ?? e.target)?.files;
    if (!files || files.length === 0) {
      setFormData(FILE_INPUT_NAME, { info: null, b64: null });
      return;
    }
    const nextFile = files[0];

    if (
      !nextFile.type.match("image.*") &&
      nextFile.type !== "application/pdf"
    ) {
      alert("Only images and PDFs are allowed.");
    }
    await transformFileToB64(nextFile)
      .then((result) => {
        const REGEX_MIMETYPE_B64 = /^data:(.*?);base64,/;
        const b64 = result.replace(REGEX_MIMETYPE_B64, "");

        setFormData(FILE_INPUT_NAME, {
          info: {
            lastModified: nextFile.lastModified,
            lastModifiedDate: nextFile.lastModifiedDate,
            name: nextFile.name,
            size: nextFile.size,
            type: nextFile.type,
            webkitRelativePath: nextFile.webkitRelativePath,
          },
          b64,
        });
      })
      .catch((err) => {
        console.error("Error reading file.", err);
        alert("Error reading file.");
      });
  };

  return (
    <div className={styles.formUserContainer}>
      <h4 className={styles.formUserTitle}>
        <FontAwesomeIcon icon={faMoneyCheck} width={25} /> Datos bancarios
      </h4>
      <div className={styles.bankSelector}>
        {(bankAccounts ?? []).map((bankAccount, idx) => (
          <Button
            key={`bankAccount:${bankAccount.bank}:${idx}`}
            variant="text"
            className={`${styles.bankOption} ${
              BANKS_INFO[bankAccount.bank].name ===
              BANKS_INFO[bankSelected.bank]?.name
                ? styles.selected
                : ""
            }`}
            onClick={() => setBankSelected(bankAccount)}
          >
            <Image
              src={`/${BANKS_INFO[bankAccount.bank].image}`}
              width={50}
              height={50}
              alt={BANKS_INFO[bankAccount.bank].name}
            />
          </Button>
        ))}
      </div>
      <h5 className={`${styles.bankLabel} mt-2`}>{bankSelected.name}</h5>
      <div>
        {bankSelected.account && (
          <>
            <span className={styles.bankLabel}>
              Número de cuenta:&nbsp;
              <strong className={styles.bankValue}>
                {bankSelected.account}
              </strong>{" "}
            </span>
            <br />
          </>
        )}
        {bankSelected.clabe && (
          <>
            <span className={styles.bankLabel}>
              CLABE:&nbsp;
              <strong className={styles.bankValue}>
                {bankSelected.clabe}
              </strong>{" "}
            </span>
            <br />
          </>
        )}
        {bankSelected.card && (
          <>
            <span className={styles.bankLabel}>
              Número de tarjeta:&nbsp;
              <strong className={styles.bankValue}>
                {bankSelected.card}
              </strong>{" "}
            </span>
          </>
        )}
      </div>

      <h4 className={styles.formUserTitle}>
        <FontAwesomeIcon icon={faMoneyBillTransfer} width={25} /> Comprobante de
        pago
      </h4>
      <div>
        <input
          className="d-none"
          type="file"
          id="voucher"
          onChange={handleDrop}
          accept="application/pdf, image/*"
        />
        <label
          htmlFor="voucher"
          className={`
          ${styles.dropFileInput}  
          ${file?.info ? styles.fileInputSelected : styles.fileInputEmpty} 
          ${isDragging ? styles.draggingOverFileInput : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FontAwesomeIcon icon={faFileArrowUp} /> &nbsp;
          <span>{file?.info?.name ?? "Adjunta tu comprobante"}</span>
          &nbsp;
          <FontAwesomeIcon icon={faFileArrowUp} />
        </label>
      </div>
    </div>
  );
};

export default FormBank;
