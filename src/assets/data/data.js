import {
  BsCalendarRange,
  BsJournalBookmark,
  BsCalendarCheck,
  BsCalendar2Date,
  BsWallet2,
} from "react-icons/bs";
import { FiRadio } from "react-icons/fi";

export const billsData = [
  {
    id: 1,
    title: "Ready to assign",
    counts: 200,
    number: 42,
    color: "#615FFE",
    icons: <BsCalendarRange />,
    subtitle: "Bills in this week 221",
    percentage: +42,
  },
  {
    id: 2,
    title: "Pending sign offs",
    counts: 63,
    number: 17,
    color: "#76BEED",
    icons: <BsJournalBookmark />,
    subtitle: "Singed off in this week 221",
    percentage: +22,
  },
  {
    id: 3,
    title: "Declined",
    counts: 5,
    number: 0,
    color: "#735ADC",
    icons: <BsCalendarCheck />,
    subtitle: "Diclined this week 2",
    percentage: -5,
  },
  {
    id: 4,
    title: "RFI",
    counts: 13,
    number: 17,
    color: "#2ACA92",
    icons: <BsCalendar2Date />,
    subtitle: "Requested this week 2",
    percentage: +5,
  },
];

export const invoicesData = [
  {
    id: 1,
    title: "Paid Invoices",
    counts: 9034.49,
    number: 0,
    color: "#0f0f10",
    icons: <BsWallet2 />,
    subtitle: "Current finacial year",
    percentage: +5,
  },
  {
    id: 2,
    title: "Live jobs value",
    counts: 2378.32,
    number: 0,
    color: "#7f08f6",
    icons: <FiRadio />,
    subtitle: "Current finacial year",
    percentage: +85,
  },
];

export const chartData = [
  {
    name: "Feb",
    2021: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Mar",
    2021: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Apr",
    2021: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "May",
    2021: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Jun",
    2021: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jul",
    2021: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Aug",
    2021: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const productsInput = [
  {
    id: 1,
    label: "Product name",
    type: "text",
    tag: "name",
    placeholder: "Ex: Apple Macbook Pro",
  },
  {
    id: 2,
    label: "Product code",
    type: "text",
    tag: "code",
    placeholder: "Ex: AKM411",
  },
  {
    id: 3,
    label: "Price",
    type: "float",
    tag: "price",
    placeholder: "Ex: 200000",
  },
  {
    id: 4,
    label: "Color",
    type: "text",
    tag: "color",
    placeholder: "Ex: Apple Macbook Pro",
  },
  {
    id: 5,
    label: "Images",
    type: "file",
    tag: "img",
    placeholder: "",
  },
  {
    id: 6,
    label: "Size",
    type: "text",
    tag: "size",
    placeholder: "Ex: S, M, L...",
  },
  {
    id: 7,
    label: "Featured",
    type: "text",
    tag: "featured",
    placeholder: "Ex: Good an product",
  },
];
