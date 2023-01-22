import Layout from "@/components/Layout";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import style from "./index.module.css";
import Image from "next/image";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const dataLine = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 90, 50, 13, 50, 123, 100],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const data = {
  labels: ["Ашиглагдаж байгаа", "Эвдрэл", "ирсэн захиалга", "Ашиглагдаагүй"],
  datasets: [
    {
      label: "тоо ширхэг",
      data: [12, 19, 3, 5],
      backgroundColor: ["#605CFF", "#2FE6A7", "#FF69B4", "#FFF"],
    },
  ],
};

const Admin = () => {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <div className={style.row}>
        <div style={{ width: "660px" }}>
          <Line options={options} data={dataLine} />
        </div>
        <div className={style.card}>
          <div className={style.item}>
            <Image src="/icons/people.png" width={70} height={70} alt="" />
            <div className={style.count}>3,230+</div>
            <div style={{ fontSize: "18px" }}>Хэрэглэгч</div>
          </div>
          <div className={style.item}>
            <Image src="/icons/graphic.png" width={70} height={70} alt="" />
            <div className={style.count}>3,230+</div>
            <div style={{ fontSize: "18px" }}>Нийт авсан үйлчилгээ</div>
          </div>
          <div className={style.item}>
            <Image src="/icons/device.png" width={70} height={70} alt="" />
            <div className={style.count}>3,230+</div>
            <div style={{ fontSize: "18px" }}>Төхөөрөмжийн тоо</div>
          </div>
        </div>
      </div>
      <div className={style.row}>
        <div style={{ width: "300px" }}>
          <Doughnut options={options} data={data} />
        </div>
        <div className={style.calendar}>
          <div className={style.schedule}>
            <div className={style.day}>
              <div className={style.month}>
                <div>{moment().format('MM')} сарын</div>
                <div>{moment().format('YYYY')}</div>
              </div>
              {moment().format('DD')}
            </div>
            <div className={style.list}>test</div>
            <div className={style.list}>title</div>
            <div className={style.title}>SCHEDULE</div>
            <div className={style.list}>
              <div>
              08:00 - 22:00
              </div>
              <div>
              Ажлын цаг
              </div>
            </div>
            <div className={style.list}>
            <div>
            02:00 - 03:00
              </div>
              <div>
            Цайны цаг
              </div>
            </div>
            <div className={style.list}>
            <div>
            12:00 - 12:30
              </div>
              <div>
              Хурлын цаг
              </div>
            </div>
            <div className={style.list}>
            <div>
            22:00 - 08:00
              </div>
              <div>
              Амралтын цаг
              </div>
            </div>
            {console.log(moment().format('DD'))}
          </div>
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
    </>
  );
};

export default Admin;
