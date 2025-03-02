import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const NuestroFacebookOficial = () => {
  return (
    <a
      href="https://www.facebook.com/share/efqXpMcibCrSy2YF/?mibextid=LQQJ4d"
      target="_blank"
    >
      Nuestro Facebook oficial
    </a>
  );
};

export default function Policies() {
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<FontAwesomeIcon icon={faCaretDown} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            <h2>Uso de Datos</h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              En <strong>Rifas mas GDL</strong>, nos tomamos muy en serio la
              privacidad de nuestros usuarios y la protección de sus datos
              personales. Esta política de uso de datos explica cómo
              recopilamos, utilizamos y protegemos su información personal
              cuando utiliza nuestro sitio web.
            </p>

            <h4>1. Recopilación de Datos:</h4>
            <p>
              Recopilamos la siguiente información personal cuando usted utiliza
              nuestro sitio web:
            </p>
            <ul>
              <li>Nombre</li>
              <li>Teléfono</li>
              <li>Estado de México donde reside</li>
              {/* <li>Información de pago (tarjeta de crédito, PayPal, etc.)</li> */}
            </ul>

            <h4>2. Uso de Datos:</h4>
            <p>
              Utilizamos los datos recopilados para los siguientes propósitos:
            </p>
            <ul>
              <li>Procesar sus compras de boletos de rifas</li>
              <li>Ponernos en contacto al momento de entregar los premios</li>
              {/* <li>Enviarle confirmaciones de pedidos y actualizaciones</li>
              <li>
                Enviar comunicaciones promocionales y ofertas especiales, con su
                consentimiento
              </li>
              <li>Mejorar nuestro sitio web y servicios</li>
              <li>Cumplir con las obligaciones legales y reglamentarias</li> */}
            </ul>

            <h4>3. Protección de Datos:</h4>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para
              proteger sus datos personales contra acceso no autorizado,
              pérdida, alteración o divulgación. Sin embargo, tenga en cuenta
              que ningún sistema de transmisión de datos o almacenamiento es
              completamente seguro.
            </p>

            <h4>4. Compartición de Datos:</h4>
            <p>
              No vendemos, intercambiamos ni transferimos a terceros sus datos
              personales, excepto en los siguientes casos:
            </p>
            <ul>
              <li>
                Proveedores de servicios que nos ayudan a operar nuestro sitio
                web y prestar nuestros servicios (por ejemplo, procesadores de
                pagos)
              </li>
              <li>
                Cumplimiento de la ley, regulaciones o requerimientos judiciales
              </li>
              <li>Protección de nuestros derechos, propiedad y seguridad</li>
            </ul>

            <h4>5. Cambios en la Política:</h4>
            <p>
              Podemos actualizar esta política de uso de datos ocasionalmente.
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<FontAwesomeIcon icon={faCaretDown} />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>
            <h2>Política de Transparencia</h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              En <strong>Rifas mas GDL</strong>, valoramos la transparencia y la
              confianza de nuestros usuarios. Esta política de transparencia
              describe nuestros compromisos y prácticas para garantizar que
              nuestras operaciones sean claras y accesibles para todos los
              usuarios.
            </p>

            <h4>1. Operaciones Transparentes:</h4>
            <p>
              Nos comprometemos a proporcionar información clara y precisa sobre
              nuestras rifas, incluyendo:
            </p>
            <ul>
              <li>Reglas y términos de participación</li>
              <li>Métodos de selección de ganadores</li>
              <li>Procedimientos de notificación y entrega de premios</li>
            </ul>

            <h4>2. Comunicación Abierta:</h4>
            <p>
              Mantenemos una comunicación abierta y honesta con nuestros
              usuarios. Nos esforzamos por responder a todas las consultas y
              preocupaciones de manera rápida y efectiva a través de{" "}
              <NuestroFacebookOficial />.
            </p>

            <h4>3. Informe de Resultados:</h4>
            <p>
              Publicamos los resultados de cada rifa de manera oportuna y
              accesible. Los ganadores serán anunciados en nuestro sitio web y
              se les notificará directamente a través de{" "}
              <NuestroFacebookOficial />.
            </p>

            <h4>4. Auditorías y Revisión:</h4>
            <p>
              Realizamos auditorías internas y revisiones periódicas de nuestras
              operaciones para garantizar que cumplimos con nuestros estándares
              de transparencia y las leyes aplicables.
            </p>

            <h4>5. Participación del Usuario:</h4>
            <p>
              Animamos a nuestros usuarios a participar en la mejora continua de
              nuestros servicios. Puede proporcionar comentarios y sugerencias a
              través de <NuestroFacebookOficial />, y consideraremos todas las
              recomendaciones de buena fe.
            </p>

            <h4>6. Actualizaciones de la Política:</h4>
            <p>
              Podemos actualizar esta política de transparencia ocasionalmente.
            </p>

            <h4>Contacto:</h4>
            <p>
              Si tiene alguna pregunta o inquietud sobre nuestra política de
              transparencia, no dude en contactarnos a través de{" "}
              <NuestroFacebookOficial />.
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
