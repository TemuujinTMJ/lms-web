/* eslint-disable max-lines */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Popover,
  Table,
  Upload,
} from 'antd';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import moment from 'moment';

import { config } from '@/boot/config';
import { useAppDispatch, useAppSelector } from '@/modules/hooks';
import { deleteTeacherDevice, getTeacherDevice, postTeacherDevice } from '@/modules/lab/device/device.services';
import { getTeacherLaboratory } from '@/modules/lab/laboratory/laboratory.services';

import style from './index.module.css';

const Index = () => {
  const columns = [
    {
      title: 'Төхөөрөмж нэр',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Лаборатори',
      dataIndex: 'laboratory',
      key: 'laboratory',
      render: (_, record) => <>{record?.laboratory?.room}</>,
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
      render: (text) => <>{moment(text).format('YYYY-MM-DD')}</>,
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
      title: 'Төхөөрөмжийн зураг',
      key: 'name',
      render: (_, record) => (
        <Popover
          content={
            <div style={{ display: 'flex' }}>
              {record?.medias.map((med, key) => {
                return (
                  <Image
                    key={key}
                    alt=""
                    width={100}
                    height={100}
                    style={{ padding: '10px' }}
                    src={`${config.HOST}${med.path}`}
                  />
                );
              })}
            </div>
          }
          title="Лабораторийн зургууд"
          trigger="click"
        >
          <Button>Зураг харах</Button>
        </Popover>
      ),
    },
    {
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => Edit(record)}>Засах</Button>
          {/* <Popconfirm
            title="Төхөөрөмж устгах"
            description="Устгахдаа итгэлтай байна уу?"
            onConfirm={() => onDelete({ type: 'device' })}
            okText="Тийм"
            cancelText="Үгүй"
          >
            <Button danger>Устгах</Button>
          </Popconfirm> */}
        </div>
      ),
    },
  ];
  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState([]);
  const [img, setImg] = useState([]);

  function Edit(e) {
    setImg(e.medias?.filter((d) => d.type === 'pano').map((c) => c._id));
    setFiles(
      e.medias
        ?.filter((d) => d.type === 'pano')
        .map((c) => ({
          response: { image: { _id: c._id } },
          uid: c.id,
          name: c.name,
          status: 'done',
          url: `http://lims.sict.edu.mn/api${c.path}`,
        })),
    );
    form.setFieldsValue(e);
    form.setFieldsValue({ laboratory: e?.laboratory?._id });
    form.setFieldsValue({ teacher: e?.teacher?._id });
    form.setFieldsValue({ manufacturedDate: dayjs(moment(e?.manufacturedDate).format('YYYY/MM/DD'), 'YYYY/MM/DD') });
    setIsModalOpen(true);
    setEdit(true);
  }
  const dispatch = useAppDispatch();
  const { devices, loading } = useAppSelector((state) => state.teacherDeviceReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [labId, setLabId] = useState('');
  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
    setEdit(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(
      getTeacherDevice({
        pageSize: 0,
        pageNum: 0,
      }),
    );
    dispatch(
      getTeacherLaboratory({
        pageSize: 0,
        pageNum: 0,
      }),
    ).then((c) => {
      if (c.payload.success) {
        const lab = c.payload.laboratories.filter((labo) => labo.teacher._id === c.payload.userId);
        setLabId(lab[0]);
      }
    });
  }, []);
  const [messageApi] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Хэрэглэгч амжилттай бүртгэгдлээ',
    });
  };
  function onFinishDevice(values) {
    dispatch(postTeacherDevice({ ...values, medias: img, laboratory: labId._id })).then((e) => {
      if (e?.payload?.success) {
        success();
        setIsModalOpen(false);

        dispatch(
          getTeacherDevice({
            pageSize: 0,
            pageNum: 0,
          }),
        );
      }
    });
  }
  function onDelete() {
    dispatch(deleteTeacherDevice({ _id: form.getFieldValue('_id') })).then((d) => {
      if (d?.payload?.success) {
        success();
        setIsModalOpen(false);
        dispatch(
          getTeacherDevice({
            pageSize: 0,
            pageNum: 0,
          }),
        );
      }
    });
  }

  function handleUploadSingle(info: any) {
    setFiles(info.fileList);
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setImg(info?.fileList.map((image) => image?.response?.image._id));
  }
  function beforeUploadSingle(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt10M = file.size / 10240 / 10240 < 20;
    if (!isLt10M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt10M;
  }

  const uploadPropsSinlge = {
    maxCount: 1,
    name: 'image',
    action: `${config.HOST}/upload/image`,
    data: {
      type: 'pano',
    },
    listType: 'picture-card',
    headers: {
      authorization: Cookies.get('token'),
    },
    fileList: files,
    beforeUpload: beforeUploadSingle,
    onChange: handleUploadSingle,
  };
  return (
    <div>
      <div className={style.subTitle}>
        Лаборатори төхөөрөмжийн бүртгэл
        <Button type="primary" onClick={showModal} className={style.btn}>
          <Image src="/icons/add.png" alt="" width={10} height={10} style={{ marginRight: '10px' }} />
          Лаборатори төхөөрөмж нэмэх
        </Button>
      </div>
      <Table loading={loading} dataSource={devices.filter((c) => c?.laboratory._id === labId?._id)} columns={columns} />
      <Modal
        title="Лаборатори төхөөрөмж нэмэх"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        cancelText="Буцах"
        footer={false}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          style={{ maxWidth: 800 }}
          form={form}
          onFinish={onFinishDevice}
        >
          <Form.Item label="" name="_id" />
          <Form.Item label="Төхөөрөмж нэр" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Модель" name="model">
            <Input />
          </Form.Item>
          <Form.Item label="Үйлдвэрлэсэн он" name="manufacturedDate">
            <DatePicker />
          </Form.Item>
          <Form.Item label="TAG ID" name="tagID">
            <Input />
          </Form.Item>
          <Form.Item label="Сериал дугаар" name="serial">
            <Input />
          </Form.Item>
          <Form.Item label="Үнэ" name="price">
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item label="Зураг оруулах (Дээд хэмжээ 1)" valuePropName="fileList" name="medias">
            <>
              <Upload {...uploadPropsSinlge}>Зураг оруулах</Upload>
            </>
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                {edit ? (
                  <Popconfirm
                    title="Төхөөрөмж устгах"
                    description="Устгахдаа итгэлтай байна уу?"
                    onConfirm={() => onDelete({ type: 'device' })}
                    okText="Тийм"
                    cancelText="Үгүй"
                  >
                    <Button danger>Устгах</Button>
                  </Popconfirm>
                ) : null}
              </div>
              <Button type="primary" htmlType="submit" className={style.btn}>
                {edit ? 'Засах' : 'Бүртгүүлэх'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Index;
