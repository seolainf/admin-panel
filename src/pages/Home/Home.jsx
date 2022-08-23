import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { billsData, chartData, invoicesData } from "../../assets/data/data";
import chart from "../../assets/images/chart.png";
import Card from "../../components/Card/Card";
import Section from "../../components/Section/Section";
import "./home.scss";

const Home = () => {
  return (
    <div className="home" style={{ padding: "20px" }}>
      <Section title={"Bills"} />
      <div className="home__bills">
        {billsData && billsData.map((item) => <Card data={item} key={item.id} />)}
      </div>
      <Section title={"Invoices"} />
      <div className="home__invoices">
        <div className="home__invoices_img">
          <img src={chart} alt="" />
        </div>
        <div className="home__invoices_chart">
          <div className="home___card">
            {invoicesData && invoicesData.map((item) => <Card data={item} key={item.id} />)}
          </div>
          <div className="home___chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={510}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 30,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="" fill="#8884d8" />
                <Bar dataKey="2021" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
