import { MdSubHeadA } from "@/app/ui/MarkDownComponents";
import { FaLink } from "react-icons/fa";

const getAnchor = (anchorText) => {
  return anchorText
    .normalize("NFD") // separa los acentos de las letras
    .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/[]/g, "-");
};
const H2Header = ({ children }) => {
  const anchor = getAnchor(children[1]);
  const link = `#${anchor}`;
  console.log(children[1]);
  console.log(link);

  return (
    <MdSubHeadA id={anchor}>
      {children}
      <a href={link}>
        {" "}
        <FaLink />
      </a>
    </MdSubHeadA>
  );
};

export default H2Header;
