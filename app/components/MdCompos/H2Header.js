import { MdSubHeadA } from "@/app/ui/MarkDownComponents";
import { FaLink } from "react-icons/fa";
const extractText = (node) => {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && node?.props?.children) {
    return extractText(node.props.children);
  }
  return "";
};
// const getAnchor = (anchorText) => {
//   return (
//     anchorText
//       // .normalize("NFD") // separa los acentos de las letras
//       .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
//       .toLowerCase()
//       .replace(/[^a-z0-9]/g, "")
//       .replace(/[]/g, "-")
//   );
// };
const getAnchor = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-") // Recomiendo usar guiones en lugar de nada para separar palabras
    .replace(/^-+|-+$/g, ""); // Elimina guiones al inicio o final
};
const H2Header = ({ children }) => {
  const anchorText = extractText(children);
  const anchor = getAnchor(anchorText);
  // const anchor = getAnchor(children[1]);
  const link = `#${anchor}`;

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
