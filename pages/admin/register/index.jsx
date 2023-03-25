/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Space, Table, Upload } from 'antd';
import Image from 'next/image';

import { getAdminDevice, postAdminDevice } from '@/modules/admin/device/device.services';
import { getAdminLaboratory, postAdminLaboratory } from '@/modules/admin/laboratory/laboratory.services';
import { getAdminTeacher, postAdminTeacher } from '@/modules/admin/teacher/teacher.services';
import { useAppDispatch, useAppSelector } from '@/modules/hooks';

import style from './register.module.css';

const Index = () => {
  const dataSource = [
    {
      key: '1',
      last_name: 'Mi10 Downing Streetke',
      age: 32,
      first_name: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Сургууль',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: 'Давхар',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Лабораторын ангийн дугаар',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Хариуцсан багшийн нэр',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Лабораторийн ангийн зураг',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const columns1 = [
    {
      title: 'Овог',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Нэр',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Багшийн код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Утасны дугаар',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Хаяг',
      dataIndex: 'room',
      key: 'address',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => <Button onClick={() => Edit(record)}>edit</Button>,
    },
  ];

  const columns2 = [
    {
      title: 'Төхөөрөмж нэр',
      dataIndex: 'mongolianname',
      key: 'mongolianname',
    },
    {
      title: 'Үйлдвэрлэгч',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: 'Модель',
      dataIndex: 'model',
      key: 'model',
    },

    {
      title: 'Үйлдвэрлэсэн он',
      dataIndex: 'manufacturedDate',
      key: 'manufacturedDate',
    },
    {
      title: 'TAG ID',
      dataIndex: 'tagID',
      key: 'tagID',
    },
    {
      title: 'Сериал дугаар',
      dataIndex: 'serial',
      key: 'serial',
    },
    {
      title: 'Үнэ',
      dataIndex: 'price',
      key: 'price',
    },
    {
      key: 'key',
      render: () => {
        return <Button>Засах</Button>;
      },
    },
  ];

  function Edit() {
    setIsModalOpen(true);
  }
  const dispatch = useAppDispatch();
  // const { teachers } = useAppSelector((state) => state.adminTeacherReducer);
  const { laboratories } = useAppSelector((state) => state.adminLaboratoryReducer);
  const { devices } = useAppSelector((state) => state.adminDeviceReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(1);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(
      getAdminTeacher({
        pageSize: 10,
        pageNum: 0,
      }),
    );
    dispatch(
      getAdminDevice({
        pageSize: 10,
        pageNum: 0,
      }),
    );
    dispatch(
      getAdminLaboratory({
        pageSize: 10,
        pageNum: 0,
      }),
    );
  }, []);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Хэрэглэгч амжилттай бүртгэгдлээ',
    });
  };
  function onFinishLaboratory(values) {
    dispatch(postAdminDevice(values)).then((e) => {
      if (e?.payload?.success) {
        success();
      }
    });
  }
  function onFinishTeacher(values) {
    dispatch(postAdminTeacher(values)).then((e) => {
      if (e?.payload?.success) {
        success();
      }
    });
  }
  function onFinishDevice(values) {
    dispatch(postAdminLaboratory(values)).then((e) => {
      if (e?.payload?.success) {
        success();
      }
    });
  }
  return (
    <div>
      {contextHolder}
      <div className={style.cards}>
        <div className={style.card} onClick={() => setType(1)}>
          <Image src="/icons/checkList.png" alt="" width={50} height={50} style={{ margin: '20px' }} />
          Лабораторын анги бүртгэл
        </div>
        <div className={style.card} onClick={() => setType(2)}>
          <Image src="/icons/user-tie.png" alt="" width={50} height={50} style={{ margin: '20px' }} />
          Лаборатори хариуцсан багшийн бүртгэл
        </div>
        <div className={style.card} onClick={() => setType(3)}>
          <Image src="/icons/note.png" alt="" width={50} height={50} style={{ margin: '20px' }} />
          Лабораторийн төхөөрөмж бүртгэл
        </div>
      </div>
      <div className={style.subTitle}>
        Бүртгэл харах
        <Button type="primary" onClick={showModal}>
          <Image src="/icons/add.png" alt="" width={10} height={10} style={{ marginRight: '10px' }} />{' '}
          {type === 1
            ? 'Лабораторийн анги нэмэх'
            : type === 2
            ? 'Лаборатори хариуцсан багш нэмэх'
            : 'Лаборатори төхөөрөмж нэмэх'}
        </Button>
      </div>
      <Table
        dataSource={type === 1 ? laboratories : type === 2 ? dataSource : devices}
        columns={type === 1 ? columns : type === 2 ? columns1 : columns2}
      />
      <Modal
        title={
          type === 1
            ? 'Лабораторийн анги нэмэх'
            : type === 2
            ? 'Лаборатори хариуцсан багш нэмэх'
            : 'Лаборатори төхөөрөмж нэмэх'
        }
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        cancelText="Буцах"
        footer={false}
      >
        {type === 1 ? (
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 800 }}
            form={form2}
            onFinish={onFinishLaboratory}
          >
            <Form.Item label="Сургууль" name="school">
              <Input />
            </Form.Item>
            <Form.Item label="Давхар" name="floor">
              <Input />
            </Form.Item>
            <Form.Item label="Лаботароийн ангийн дугаар" name="room">
              <Input />
            </Form.Item>
            <Form.Item label="Хариуцсан багшийн нэр" name="teacher">
              <Input />
            </Form.Item>

            <Form.Item label="Зураг оруулах" valuePropName="fileList" name="medias">
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <div style={{ marginTop: 8 }}>Зураг оруулах</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Бүртгүүлэх
              </Button>
            </Form.Item>
          </Form>
        ) : null}
        {type === 2 ? (
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 800 }}
            form={form1}
            onFinish={onFinishTeacher}
          >
            <Form.Item label="Овог" name="last_name">
              <Input />
            </Form.Item>
            <Form.Item label="Нэр" name="first_name">
              <Input />
            </Form.Item>
            <Form.Item label="Лаботароийн ангийн дугаар" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="e-mail хаяг" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Нууц үг" name="password">
              <Input />
            </Form.Item>
            <Form.Item label="Зураг оруулах">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Бүртгүүлэх
              </Button>
            </Form.Item>
          </Form>
        ) : null}
        {type === 3 ? (
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 800 }}
            form={form}
            onFinish={onFinishDevice}
          >
            <Form.Item label="Төхөөрөмжийн тайлбар" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Төхөөрөмж нэр" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Лабортор" name="laboratory">
              <Input />
            </Form.Item>
            <Form.Item label="Үйлдвэрлэгч" name="manufacturer">
              <Input />
            </Form.Item>
            <Form.Item label="Модель" name="model">
              <Input />
            </Form.Item>
            <Form.Item label="Үйлдвэрлэсэн он" name="manufacturedDate">
              <Input />
            </Form.Item>
            <Form.Item label="TAG ID" name="tagID">
              <Input />
            </Form.Item>
            <Form.Item label="Сериал дугаар" name="serial">
              <Input />
            </Form.Item>
            <Form.Item label="Үнэ" name="price">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Бүртгүүлэх
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </Modal>
    </div>
  );
};

export default Index;
