import { MdSubHeadB } from "@/app/ui/MarkDownComponents";
import { FaLink } from "react-icons/fa";

const getAnchor = (anchorText) => {
  return anchorText
    .normalize("NFD") // separa los acentos de las letras
    .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
    .toLowerCase()
    .replace(/\s*[^a-zA-Z0-9]+\s*/g, "")
    .replace(/[]/g, "-");
};
const H3Header = ({ children }) => {
  const anchor = getAnchor(children[1]);
  const link = `#${anchor}`;

  return (
    <MdSubHeadB id={anchor}>
      {children}
      <a href={link}>
        {" "}
        <FaLink />
      </a>
    </MdSubHeadB>
  );
};

export default H3Header;
