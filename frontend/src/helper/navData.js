import { TbReportAnalytics } from "react-icons/tb";
import { AiFillProduct } from 'react-icons/ai';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { RxDashboard } from "react-icons/rx";
import { VscLibrary } from "react-icons/vsc";

const navdata = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: RxDashboard,
  },
  {
    title: "Stocks",
    link: "/stock",
    icon: VscLibrary,
  },
  {
    title: "Bill",
    link: "/bill",
    icon: LiaFileInvoiceSolid,
  },
  {
    title: "Reports",
    link: "/reports",
    icon: TbReportAnalytics ,
  }
];

export default navdata;
