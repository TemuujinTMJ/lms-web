import { Input, Select, Table, Tag } from "antd";
import React from "react";
import style from "./index.module.css";

const dataSource = [
  {
    key: "1",
    school: "Must-Sict",
    floor: 3,
    class: "310",
    device: "Mac",
    deviceCode: "123",
    laborant: "Г.Мөнхбат",
  },
];

const columns = [
  {
    title: "Сургууль",
    dataIndex: "school",
    key: "school",
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
];

const User = () => {
  return (
    <div>
      <div className={style.header}>
        <div>
          Анги:
          <Select
            placeholder="сонгоно уу"
            style={{ marginLeft: "10px", width: "200px" }}
          />
        </div>
        <Input placeholder="Хайх" style={{ width: "200px" }} />
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default User;
