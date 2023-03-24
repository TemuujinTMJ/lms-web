import { Button, Form, Input, Modal, Select, Table, Tag } from "antd";
import React, { useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import style from "./userRegister.module.css";
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
const dataSource = [
  {
    key: "1",
    name: "Э.Тэнгис",
    code: "В201900002",
    device: "IMAC",
    date: "2023-02-08 15:30-16:30 ",
    description: "Бие даалт хийх",
  },
];

const columns = [
  {
    title: "Нэр",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Оюутны код",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Хэрэглэх төхөөрөмж",
    dataIndex: "device",
    key: "device",
  },
  {
    title: "Тайлбар",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Дуусах хугацаа",
    dataIndex: "date",
    key: "date",
  },
];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: '2022-2023 оны лаборатори ашигласан байдал',
    },
  },
};
export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: 'Хэрэглэгдэж буй төхөөрөмжийн мэдээлэл',
    },
  },
};
export const data = {
  labels: ["Ашиглагдаж байгаа төхөөрөмж", "Сул байгаа төхөөрөмж"],
  datasets: [
    {
      label: "тоо ширхэг",
      data: [12, 5],
      backgroundColor: ["#605CFF", "#FFF"],
    },
  ],
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

const Index = () => {
  return (
    <>
      <div className={style.row}>
        <div style={{ width: "400px" }}>
          <Doughnut options={options2} data={data} />
        </div>
        <div style={{ width: "700px" }}>
          <Line options={options} data={dataLine} />
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Index;
