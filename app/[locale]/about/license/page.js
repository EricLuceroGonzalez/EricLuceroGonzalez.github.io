import ShowPath from "@/app/components/showPath";
import { MainBg } from "../../../ui/ComponentsStyled";
import { Layout } from "@/app/ui/lugs";
import { useTranslations } from "next-intl";

const LicensePage = () => {
  const t = useTranslations("About");
  return (
    <Layout>
      <MainBg>
        <ShowPath title={"license"} />
        <h1>{t("license_title")}</h1>
        <p>{t("license_terms")}</p>
      </MainBg>
    </Layout>
  );
};

export default LicensePage;
