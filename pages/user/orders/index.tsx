import { Input, Select, Table, Tag } from "antd";
import React from "react";
import style from "./orderlist.module.css";

const dataSource = [
  {
    key: "1",
    school: "Must-Sict",
    floor: 3,
    class: "310",
    device: "Mac",
    deviceCode: "123",
    laborant: "Г.Мөнхбат",
    endDate: "2023-1-23",
    startDate: "2023-1-23",
    status: (<div style={{color: 'red'}}>Цуцлагдсан</div>)
  },
];

const columns = [
  {
    title: "Сургууль",
    dataIndex: "school",
    key: "school",
    link: "key",
  },
  {
    title: "Захиалсан өдөр",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "Захиалга дуусах өдөр",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Давхар",
    dataIndex: "floor",
    key: "floor",
  },
  {
    title: "Лабораторын ангийн дугаар",
    dataIndex: "class",
    key: "class",
  },
  {
    title: "төхөөрөмжийн төрөл",
    dataIndex: "device",
    key: "device",
  },
  {
    title: "төхөөрөмжийн код",
    dataIndex: "deviceCode",
    key: "deviceCode",
  },
  {
    title: "лаборант хариуцагч",
    dataIndex: "laborant",
    key: "laborant",
  },
  {
    title: "Төлөв",
    dataIndex: "status",
    key: "status",
  },
];

const Index = () => {
  return (
    <Table
      style={{ padding: "20px" }}
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default Index;
