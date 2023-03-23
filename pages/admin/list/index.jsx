import { Input, Select, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
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
    dataIndex: "mongolianname",
    key: "mongolianname",
  },
  {
    title: "Төхөөрөмж",
    dataIndex: "description_of_goods",
    key: "description_of_goods",
  },
  {
    title: "Барааны зориулалт",
    dataIndex: "goodpurpose",
    key: "goodpurpose",
  },
  {
    title: "Модел",
    dataIndex: "model_no",
    key: "model_no",
  },
  {
    title: "Үйлдвэрлэсэн он",
    dataIndex: "year_of_manufacture",
    key: "year_of_manufacture",
  },
  // {
  //   title: "Ашиглах цаг/хугацаа",
  //   dataIndex: "address",
  //   key: "address",
  // },
  // {
  //   title: "Хариуцаж буй багш",
  //   dataIndex: "address",
  //   key: "address",
  // },
  // {
  //   title: "анги",
  //   dataIndex: "address",
  //   key: "address",
  // },
  // {
  //   title: "Төлөв",
  //   dataIndex: "tag",
  //   key: "tag",
  // },
];

const Index = () => {
  const [data, setData] = useState(null);
  const axios = require("axios");
  useEffect(() => {
    axios
      .get("/api/equipment")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [axios]);
  console.log(data, "data");
  console.log("jkdsljklsd");
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
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default Index;
