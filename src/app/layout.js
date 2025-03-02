import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faGift,
  faTicket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./layout.module.css";
import Image from "next/image";

export const metadata = {
  title: "Rifas mas GDL",
  description: "Gran rifa! prueba tu suerte",
};

const Navbar = ({ navPages }) => {
  return (
    <nav
      id="navbar"
      className={`${styles["navbar"]} navbar fixed-top navbar-expand-lg navbar-header navbar-mobile`}
    >
      <div className="navbar-container container">
        {/* <!-- LOGO --> */}
        <div className={styles["navbar-brand"]}>
          <a className={styles["navbar-brand-logo"]} href="#">
            <Image
              id="rifaLogo"
              className=""
              src="/logo_rifas.jpg"
              width={200}
              height={35}
              alt="logo"
            />
          </a>
        </div>
        <div
          className="collapse navbar-collapse justify-content-around"
          id="navbarNav"
        >
          <ul
            className={`${styles["navbar-nav"]} ${styles["menu-navbar-nav"]} navbar-nav menu-navbar-nav`}
          >
            {(navPages ?? []).map((page, idx) =>
              page.hidden ? null : (
                <li
                  key={`navitem-${idx}`}
                  className={`${styles["nav-item"]} nav-item`}
                >
                  <a
                    className={`${styles["nav-link"]} nav-link ${
                      page.isPrimary ? styles.primary : styles.regular
                    }`}
                    href={page.url ?? "#"}
                  >
                    {page.description && (
                      <p
                        className={`${styles["nav-link-number"]} ${styles["description"]}`}
                      >
                        {page.description}
                      </p>
                    )}
                    <p className={`${styles["nav-link-menu"]}`}>
                      {page.icon ?? null} {page.title ?? ""}
                    </p>
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default function RootLayout({ children }) {
  const navPages = [
    // {
    //   url: "#top",
    //   description: "Home",
    //   title: "INICIO",
    //   icon: <FontAwesomeIcon icon={faHome} width={25} className="m-2" />,
    // },
    {
      url: "#awards",
      description: "Ver las fotos",
      title: "PREMIOS",
      hidden: true,
      icon: <FontAwesomeIcon icon={faGift} width={25} className="m-2" />,
    },
    {
      url: "#tickets",
      description: "Buscar tus números",
      title: "VERIFICADOR",
      hidden: false,
      icon: <FontAwesomeIcon icon={faCheckCircle} width={25} className="m-2" />,
    },
    // {
    //   url: "#faq",
    //   description: "Dudas Frecuentes",
    //   title: "PREGUNTAS",
    //   icon: (
    //     <FontAwesomeIcon icon={faQuestionCircle} width={25} className="m-2" />
    //   ),
    // },
    {
      url: "#comprar",
      description: "Comprar boletos",
      title: "LISTA DE BOLETOS",
      icon: <FontAwesomeIcon icon={faTicket} width={25} className="m-2" />,
      isPrimary: true,
    },
    {
      url: "#contacto",
      description: "WhatsApp Ayuda",
      title: "CONTACTO",
      icon: <FontAwesomeIcon icon={faUserCircle} width={25} className="m-2" />,
    },
  ];
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icono.svg" sizes="any" />
        <script src="https://www.google.com/recaptcha/api.js"></script>
      </head>
      <body className="">
        <Navbar navPages={navPages} />
        {children}
      </body>
    </html>
  );
}
