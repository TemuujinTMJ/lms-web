import { Button, Card, Form, Input, Modal, Table, Upload } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import style from "./register.module.css";

//dummy data 
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
    delete: <a>хасах</a>
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
    delete: <a>хасах</a>
  },
];

const columns = [
  {
    title: "Сургууль",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Давхар",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Лабораторын ангийн дугаар",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Хариуцсан багшийн нэр",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Лабораторийн ангийн зураг",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "",
    dataIndex: "delete",
    key: "delete",
  },
];
const columns1 = [
    {
      title: "Овог",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Нэр",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Багшийн код",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Утасны дугаар",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Хаяг",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-mail",
      dataIndex: "name",
      key: "name",
    },
    {
        title: "",
        dataIndex: "delete",
        key: "delete",
      },
  ];
  const columns2 = [
    {
      title: "TAG ID",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Төхөөрөмж нэр",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Модель",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Сериал дугаар",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Үйлдвэрлэсэн он",
      dataIndex: "name",
      key: "name",
    },
    {
        title: "Үнэ",
        dataIndex: "name",
        key: "name",
      },
    {
      title: "",
      dataIndex: "delete",
      key: "delete",
    },
  ];
const Index = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState(1)
  const showModal = () => {

    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className={style.cards}>
        <div className={style.card} onClick={() => setType(1)}>
          <Image
            src="/icons/checkList.png"
            alt=""
            width={50}
            height={50}
            style={{ margin: "20px" }}
          />
          Лабораторын анги бүртгэл
        </div>
        <div className={style.card} onClick={() => setType(2)}>
          <Image
            src="/icons/user-tie.png"
            alt=""
            width={50}
            height={50}
            style={{ margin: "20px" }}
          />
          Лаборатори хариуцсан багшийн бүртгэл
        </div>
        <div className={style.card} onClick={() => setType(3)}>
          <Image
            src="/icons/note.png"
            alt=""
            width={50}
            height={50}
            style={{ margin: "20px" }}
          />
          Лабораторийн төхөөрөмж бүртгэл
        </div>
      </div>
      <div className={style.subTitle}>
        Бүртгэл харах
        <Button type="primary" onClick={showModal}>
          <Image
            src="/icons/add.png"
            alt=""
            width={10}
            height={10}
            style={{ marginRight: "10px" }}
          />{" "}
          {type === 1
            ? "Лабораторийн анги нэмэх"
            : type === 2
            ? "Лаборатори хариуцсан багш нэмэх"
            : "Лаборатори төхөөрөмж нэмэх"}
        </Button>
      </div>
      <Table dataSource={dataSource} columns={type === 1 ? columns : type === 2 ? columns1 : columns2 } />
      <Modal
        title={
          type === 1
            ? "Лабораторийн анги нэмэх"
            : type === 2
            ? "Лаборатори хариуцсан багш нэмэх"
            : "Лаборатори төхөөрөмж нэмэх"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Бүртгэх"
        cancelText="Буцах"

      >
        {type === 1 ? (
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 800 }}
          >
            <Form.Item label="Сургууль">
              <Input />
            </Form.Item>
            <Form.Item label="Давхар">
              <Input />
            </Form.Item>
            <Form.Item label="Лаботароийн ангийн дугаар">
              <Input />
            </Form.Item>
            <Form.Item label="Хариуцсан багшийн нэр">
              <Input />
            </Form.Item>

            <Form.Item label="Зураг оруулах" valuePropName="fileList">
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <div style={{ marginTop: 8 }}>Зураг оруулах</div>
                </div>
              </Upload>
            </Form.Item>
          </Form>
        ) : null}
        {type === 2 ? (
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 800 }}
          >
            <Form.Item label="Овог">
              <Input />
            </Form.Item>
            <Form.Item label="Нэр">
              <Input />
            </Form.Item>
            <Form.Item label="Лаботароийн ангийн дугаар">
              <Input />
            </Form.Item>
            <Form.Item label="e-mail хаяг">
              <Input />
            </Form.Item>

            <Form.Item label="Зураг оруулах">
            <Input />
            </Form.Item>
          </Form>
        ) : null}
        {type === 3 ? (
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 800 }}
          >
            <Form.Item label="TAG ID">
              <Input />
            </Form.Item>
            <Form.Item label="Төхөөрөмж нэр">
              <Input />
            </Form.Item>
            <Form.Item label="Модель">
              <Input />
            </Form.Item>
            <Form.Item label="Сериал дугаар">
              <Input />
            </Form.Item>

            <Form.Item label="Үйлдвэрлэсэн он">
              <Input />
            </Form.Item>
            <Form.Item label="Үнэ">
              <Input />
            </Form.Item>
          </Form>
        ) : null}
      </Modal>
    </div>
  );
};

export default Index;
