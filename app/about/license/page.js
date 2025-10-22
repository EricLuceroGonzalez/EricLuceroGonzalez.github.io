import ShowPath from "@/app/components/showPath";
import { MainBg } from "../../ui/ComponentsStyled";
import { Layout } from "@/app/ui/lugs";

const LicensePage = () => {
  return (
    <Layout>
      <MainBg>
        <ShowPath title={"licences"} />
        <h1>LicensePage</h1>
      </MainBg>
    </Layout>
  );
};

export default LicensePage;
