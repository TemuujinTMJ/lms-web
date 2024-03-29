/* eslint-disable max-lines */
// @ts-ignore-file
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
  Select,
  Table,
  Upload,
} from 'antd';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import moment from 'moment';

import { config } from '@/boot/config';
import { deleteAdminDevice, getAdminDevice, postAdminDevice } from '@/modules/admin/device/device.services';
import {
  deleteAdminLaboratory,
  getAdminLaboratory,
  postAdminLaboratory,
} from '@/modules/admin/laboratory/laboratory.services';
import { deleteAdminTeacher, getAdminTeacher, postAdminTeacher } from '@/modules/admin/teacher/teacher.services';
import { deleteAdminUser, getAdminUser, postAdminUser } from '@/modules/admin/user/user.services';
import { useAppDispatch, useAppSelector } from '@/modules/hooks';

import style from './register.module.css';

const Index = () => {
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
      title: 'Лабораторийн ангийн дугаар',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Хариуцсан багшийн нэр',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (_, record) => <div>{record?.teacher?.first_name}</div>,
    },
    {
      title: 'Лабораторийн ангийн зураг',
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
          <Button>Зургууд харах</Button>
        </Popover>
      ),
    },
    {
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => Edit(record)}>Засах</Button>
          {/* <Popconfirm
            title="Лаборатори устгах"
            description="Устгахдаа итгэлтай байна уу?"
            onConfirm={() => onDelete({ type: 'lab' })}
            okText="Тийм"
            cancelText="Үгүй"
          >
            <Button danger>Устгах</Button>
          </Popconfirm> */}
        </div>
      ),
    },
  ];
  const columns0 = [
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
      title: 'Утасны дугаар',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Хаяг',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      render: (_, record) => <Button onClick={() => Edit(record)}>Засах</Button>,
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
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      render: (_, record) => <Button onClick={() => Edit(record)}>Засах</Button>,
    },
  ];

  const columns2 = [
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
  const [fileList, setFileList] = useState([]);
  const [files, setFiles] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [img, setImg] = useState([]);

  function Edit(e) {
    setImgs(e.medias?.filter((d) => d.type === 'image').map((c) => c._id));
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
    setFileList(
      e.medias
        ?.filter((d) => d.type === 'image')
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
  const { teachers } = useAppSelector((state) => state.adminTeacherReducer);
  const { laboratories } = useAppSelector((state) => state.adminLaboratoryReducer);
  const { devices } = useAppSelector((state) => state.adminDeviceReducer);
  const { users } = useAppSelector((state) => state.adminUserReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(0);
  const [form] = Form.useForm();
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
      getAdminUser({
        pageSize: 0,
        pageNum: 0,
      }),
    );
    dispatch(
      getAdminTeacher({
        pageSize: 0,
        pageNum: 0,
      }),
    );
    dispatch(
      getAdminDevice({
        pageSize: 0,
        pageNum: 0,
      }),
    );
    dispatch(
      getAdminLaboratory({
        pageSize: 0,
        pageNum: 0,
      }),
    );
  }, []);
  const [messageApi] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Хэрэглэгч амжилттай бүртгэгдлээ',
    });
  };
  function onFinishDevice(values) {
    dispatch(postAdminDevice({ ...values, medias: img })).then((e) => {
      if (e?.payload?.success) {
        success();
        setIsModalOpen(false);

        dispatch(
          getAdminDevice({
            pageSize: 0,
            pageNum: 0,
          }),
        );
      }
    });
  }
  function onFinishUser(values) {
    dispatch(postAdminUser({ role: 'customer', ...values })).then((e) => {
      if (e?.payload?.success) {
        success();
        setIsModalOpen(false);
        dispatch(
          getAdminUser({
            pageSize: 0,
            pageNum: 0,
          }),
        );
      }
    });
  }
  function onFinishTeacher(values) {
    dispatch(postAdminTeacher(values)).then((e) => {
      if (e?.payload?.success) {
        success();
        setIsModalOpen(false);
        dispatch(
          getAdminTeacher({
            pageSize: 0,
            pageNum: 0,
          }),
        );
      }
    });
  }
  function onFinishLaboratory(values) {
    dispatch(postAdminLaboratory({ ...values, medias: imgs.concat(img) })).then((e) => {
      if (e?.payload?.success) {
        success();
        setIsModalOpen(false);
        dispatch(
          getAdminLaboratory({
            pageSize: 0,
            pageNum: 0,
          }),
        );
      }
    });
  }
  function onDelete(e) {
    if (e?.type === 'user') {
      dispatch(deleteAdminUser({ _id: form.getFieldValue('_id') })).then((d) => {
        if (d?.payload?.success) {
          success();
          setIsModalOpen(false);
          dispatch(
            getAdminUser({
              pageSize: 0,
              pageNum: 0,
            }),
          );
        }
      });
    }
    if (e?.type === 'device') {
      dispatch(deleteAdminDevice({ _id: form.getFieldValue('_id') })).then((d) => {
        if (d?.payload?.success) {
          success();
          setIsModalOpen(false);
          dispatch(
            getAdminDevice({
              pageSize: 0,
              pageNum: 0,
            }),
          );
        }
      });
    }
    if (e?.type === 'laborant') {
      dispatch(deleteAdminTeacher({ _id: form.getFieldValue('_id') })).then((d) => {
        if (d?.payload?.success) {
          success();
          setIsModalOpen(false);
          dispatch(
            getAdminTeacher({
              pageSize: 0,
              pageNum: 0,
            }),
          );
        }
      });
    }
    if (e?.type === 'lab') {
      dispatch(deleteAdminLaboratory({ _id: form.getFieldValue('_id') })).then((d) => {
        if (d?.payload?.success) {
          success();
          setIsModalOpen(false);
          dispatch(
            getAdminLaboratory({
              pageSize: 0,
              pageNum: 0,
            }),
          );
        }
      });
    }
  }
  function handleUpload(info: any) {
    setFileList(info.fileList);
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setImgs(info?.fileList.map((image) => image?.response?.image._id));
  }
  function beforeUpload(file: any) {
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
  const uploadProps = {
    maxCount: 5,
    name: 'image',
    action: `${config.HOST}/upload/image`,
    data: {
      type: 'image',
    },
    listType: 'picture-card',
    headers: {
      authorization: Cookies.get('token'),
    },
    fileList,
    beforeUpload,
    onChange: handleUpload,
  };

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
      <div className={style.cards}>
        <div
          className={style.card}
          onClick={() => setType(0)}
          style={{ backgroundColor: type === 0 ? '#52769A' : '#9EB6CD' }}
        >
          <Image src="/icons/user-tie.png" alt="" width={50} height={50} preview={false} />
          <div style={{ width: '160px' }}>Хэрэглэгчийн бүртгэл</div>
        </div>
        <div
          className={style.card}
          onClick={() => setType(1)}
          style={{ backgroundColor: type === 1 ? '#52769A' : '#9EB6CD' }}
        >
          <Image src="/icons/checkList.png" alt="" width={50} height={50} preview={false} />
          <div style={{ width: '160px' }}>Лабораторийн анги бүртгэл</div>
        </div>
        <div
          className={style.card}
          onClick={() => setType(2)}
          style={{ backgroundColor: type === 2 ? '#52769A' : '#9EB6CD' }}
        >
          <Image src="/icons/user-tie.png" alt="" width={50} height={50} preview={false} />
          <div style={{ width: '160px' }}>Лаборатори хариуцсан багшийн бүртгэл</div>
        </div>
        <div
          className={style.card}
          onClick={() => setType(3)}
          style={{ backgroundColor: type === 3 ? '#52769A' : '#9EB6CD' }}
        >
          <Image src="/icons/note.png" alt="" width={50} height={50} preview={false} />
          <div style={{ width: '160px' }}>Лабораторийн төхөөрөмж бүртгэл</div>
        </div>
      </div>
      <div className={style.subTitle}>
        {type === 0
          ? 'Хэрэглэгчийн бүртгэл'
          : type === 1
          ? 'Лабораторийн ангийн бүртгэл'
          : type === 2
          ? 'Лаборатори хариуцсан багшийн бүртгэл'
          : 'Лаборатори төхөөрөмжийн бүртгэл'}
        <Button type="primary" onClick={showModal} className={style.btn}>
          <Image src="/icons/add.png" alt="" width={10} height={10} style={{ marginRight: '10px' }} />{' '}
          {type === 0
            ? 'Хэрэглэгч нэмэх'
            : type === 1
            ? 'Лабораторийн анги нэмэх'
            : type === 2
            ? 'Лаборатори хариуцсан багш нэмэх'
            : 'Лаборатори төхөөрөмж нэмэх'}
        </Button>
      </div>
      <Table
        dataSource={type === 0 ? users : type === 1 ? laboratories : type === 2 ? teachers : devices}
        columns={type === 0 ? columns0 : type === 1 ? columns : type === 2 ? columns1 : columns2}
      />
      <Modal
        title={
          type === 0
            ? 'Хэрэглэгч нэмэх'
            : type === 1
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
        {type === 0 ? (
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 800 }}
            form={form}
            onFinish={onFinishUser}
          >
            {edit ? <Form.Item label="" name="_id" /> : null}
            <Form.Item label="Овог" name="last_name">
              <Input />
            </Form.Item>
            <Form.Item label="Нэр" name="first_name">
              <Input />
            </Form.Item>
            <Form.Item label="Утас" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Лаботароийн ангийн дугаар" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="e-mail хаяг" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Нууц үг" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {edit ? (
                    <Popconfirm
                      title="Хэрэглэгч устгах"
                      description="Устгахдаа итгэлтай байна уу?"
                      onConfirm={() => onDelete({ type: 'user' })}
                      okText="Тийм"
                      cancelText="Үгүй"
                    >
                      <Button danger>Устгах</Button>
                    </Popconfirm>
                  ) : null}
                </div>
                <Button type="primary" htmlType="submit" className={style.btn}>
                  Бүртгүүлэх
                </Button>
              </div>
            </Form.Item>
          </Form>
        ) : null}
        {type === 1 ? (
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 800 }}
            form={form}
            onFinish={onFinishLaboratory}
          >
            {edit ? <Form.Item label="" name="_id" /> : null}
            <Form.Item label="Сургууль" name="school">
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  {
                    value: 'SICT',
                    label: 'SICT',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Лабораторийн нэршил" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Давхар" name="floor">
              <Input />
            </Form.Item>
            <Form.Item label="Лаботароийн ангийн дугаар" name="room">
              <Input />
            </Form.Item>
            <Form.Item label="Хариуцсан багшийн нэр" name="teacher">
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={(teachers || [])?.map((aa) => ({ label: aa?.first_name, value: aa?._id }))}
              />
            </Form.Item>

            <Form.Item label="Зураг оруулах (Дээд хэмжээ 5)" valuePropName="fileList" name="medias">
              <>
                <Upload {...uploadProps}>Зураг оруулах</Upload>
              </>
            </Form.Item>
            <Form.Item label="360 Зураг оруулах (Дээд хэмжээ 1)" valuePropName="fileList" name="medias">
              <>
                <Upload {...uploadPropsSinlge}>Зураг оруулах</Upload>
              </>
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {edit ? (
                    <Popconfirm
                      title="Лаборатори устгах"
                      description="Устгахдаа итгэлтай байна уу?"
                      onConfirm={() => onDelete({ type: 'lab' })}
                      okText="Тийм"
                      cancelText="Үгүй"
                    >
                      <Button danger>Устгах</Button>
                    </Popconfirm>
                  ) : null}
                </div>
                <Button type="primary" htmlType="submit" className={style.btn}>
                  Бүртгүүлэх
                </Button>
              </div>
            </Form.Item>
          </Form>
        ) : null}
        {type === 2 ? (
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 800 }}
            form={form}
            onFinish={onFinishTeacher}
          >
            {edit ? <Form.Item label="" name="_id" /> : null}
            <Form.Item label="Овог" name="last_name">
              <Input />
            </Form.Item>
            <Form.Item label="Нэр" name="first_name">
              <Input />
            </Form.Item>
            <Form.Item label="Багшийн код" name="code">
              <Input />
            </Form.Item>
            <Form.Item label="Утас" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Лаботароийн ангийн дугаар" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="e-mail хаяг" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Нууц үг" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {edit ? (
                    <Popconfirm
                      title="Лаборант устгах"
                      description="Устгахдаа итгэлтай байна уу?"
                      onConfirm={() => onDelete({ type: 'laborant' })}
                      okText="Тийм"
                      cancelText="Үгүй"
                    >
                      <Button danger>Устгах</Button>
                    </Popconfirm>
                  ) : null}
                </div>
                <Button type="primary" htmlType="submit" className={style.btn}>
                  Бүртгүүлэх
                </Button>
              </div>
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
            {edit ? <Form.Item label="" name="_id" /> : null}
            <Form.Item label="Төхөөрөмж нэр" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Лаборатори" name="laboratory">
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={(laboratories || [])?.map((aa) => ({ label: aa?.title, value: aa?._id }))}
              />
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
        ) : null}
      </Modal>
    </div>
  );
};

export default Index;
