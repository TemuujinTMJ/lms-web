import { Input, Select, Table, Tag } from "antd";
import React from "react";
import style from "./list.module.css";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
    tag: <Tag color="blue">used</Tag>,
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
    tag: <Tag color="blue">using</Tag>,
  },
];

const columns = [
  {
    title: "Шошго",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Төхөөрөмж",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Барааны зориулалт",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Модел",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Үйлдвэрлэсэн он",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Ашиглах цаг/хугацаа",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Хариуцаж буй багш",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "анги",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Төлөв",
    dataIndex: "tag",
    key: "tag",
  },
];

const index = () => {
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

export default index;
