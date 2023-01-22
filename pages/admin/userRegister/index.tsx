import { Button, Form, Input, Modal, Select, Table, Tag } from "antd";
import React, { useState } from "react";
import style from "./userRegister.module.css";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
    tag: <Tag color="blue">used</Tag>,
    delete: <a>хасах</a>,
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
    tag: <Tag color="blue">using</Tag>,
    delete: <a>хасах</a>,
  },
];

const columns = [
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
    title: "И-мэйл хаяг *",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Утасны дугаар *",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Хаяг",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "нууц үг *",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Үйлдэл",
    dataIndex: "tag",
    key: "tag",
  },

  {
    title: "",
    dataIndex: "delete",
    key: "delete",
  },
];

const index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(1);

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
      <div className={style.header}>
        <div className={style.cards}>
          <div className={style.card} onClick={()=> setType(1)}>USER</div>
          <div className={style.card} onClick={()=> setType(2)}>LABORANT</div>
          <div className={style.card} onClick={()=> setType(3)}>ADMIN</div>
        </div>
        <div className={style.header1}>
          <Input
            placeholder="Хайх"
            style={{ width: "200px", marginRight: "10px" }}
          />
          {type === 3 ? null : (
            <Button type="primary" onClick={showModal}>
              {type === 1
                ? "хэрэглэгч нэмэх"
                : "Лаборатори хариуцсан багш нэмэх"}
            </Button>
          )}
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title={
          type === 1
            ? "Лабораторийн анги нэмэх"
            : "Лаборатори хариуцсан багш нэмэх"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Бүртгэх"
        cancelText="Буцах"
      >
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
        {type === 2 ? (
          <Form.Item label="Лаботароийн ангийн дугаар">
            <Input />
          </Form.Item>
        ) : null}
        <Form.Item label="e-mail хаяг">
          <Input />
        </Form.Item>
        <Form.Item label="Утасны дугаар оруулах">
          <Input />
        </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default index;
