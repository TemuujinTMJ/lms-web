/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { login, register } from '@/modules/auth/auth.services';
import { useAppDispatch, useAppSelector } from '@/modules/hooks';

import style from '../styles/Home.module.css';

const Home = () => {
  const router = useRouter();
  const [role, setRole] = useState('customer');
  const [modal1Open, setModal1Open] = useState(false);
  const [form] = Form.useForm();
  const { loadingLogin, loadingSignup } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [messageApi] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Хэрэглэгч амжилттай бүртгэгдлээ',
    });
  };
  const loggedIn = () => {
    messageApi.open({
      type: 'success',
      content: 'Амжилттай нэвтэрлээ',
    });
  };
  const failed = () => {
    messageApi.open({
      type: 'error',
      content: 'Нууц үг тохирохгүй байна',
    });
  };
  const failedLogin = () => {
    messageApi.open({
      type: 'error',
      content: 'Нэвтрэх нэр эсвэл нууц үг буруу байна.',
    });
  };
  const onFinish = (values: any) => {
    if (values?.password === values?.rePassword) {
      dispatch(register(values)).then((e) => {
        if (e?.payload?.success) {
          success();
          setModal1Open(false);
        }
      });
    } else failed();
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function loginApi() {
    dispatch(
      login({
        username,
        password,
        role,
      }),
    ).then((e) => {
      if (e?.payload?.success) {
        Cookies.set('token', e?.payload?.token);
        loggedIn();
        router.push(role === 'customer' ? 'user' : role === 'teacher' ? 'laborant' : 'admin');
      } else failedLogin();
    });
  }
  return (
    <>
      <Head>
        <title>lms</title>
        <meta name="description" content="Sict Lms" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.main}>
        <p style={{ fontSize: '32px', fontWeight: 'bold' }}>Та нэвтрэх төрлөө сонгоно уу?</p>
        <div className={style.roles}>
          <div
            className={style.role}
            onClick={() => [setRole('customer'), setPassword(''), setUsername('')]}
            style={{
              border: role === 'customer' ? '1px solid #7dd1fd' : '1px solid black',
            }}
          >
            <Image src="/images/user.png" alt="" width={200} height={200} />
            <p>Хэрэглэгч</p>
            <Image
              src="/icons/check.png"
              alt=""
              width={30}
              height={30}
              style={{
                position: 'absolute',
                right: -10,
                bottom: -10,
                display: role === 'customer' ? 'unset' : 'none',
              }}
            />
          </div>
          <div
            className={style.role}
            onClick={() => [setRole('teacher'), setPassword(''), setUsername('')]}
            style={{
              border: role === 'teacher' ? '1px solid #7dd1fd' : '1px solid black',
            }}
          >
            <Image src="/images/laborant.png" alt="" width={200} height={200} />
            <p>Лаборант</p>
            <Image
              src="/icons/check.png"
              alt=""
              width={30}
              height={30}
              style={{
                position: 'absolute',
                right: -10,
                bottom: -10,
                display: role === 'teacher' ? 'unset' : 'none',
              }}
            />
          </div>
          <div
            className={style.role}
            onClick={() => [setRole('admin'), setPassword(''), setUsername('')]}
            style={{
              border: role === 'admin' ? '1px solid #7dd1fd' : '1px solid black',
            }}
          >
            <Image src="/images/admin.png" alt="" width={200} height={200} />
            <p>Админ</p>
            <Image
              src="/icons/check.png"
              alt=""
              width={30}
              height={30}
              style={{
                position: 'absolute',
                right: -10,
                bottom: -10,
                display: role === 'admin' ? 'unset' : 'none',
              }}
            />
          </div>
        </div>
        <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '50px' }}>Тавтай морилно уу хэрэглэгч</p>
        {role === 'customer' ? (
          <>
            <div className={style.input}>
              <Image src="/icons/mail.png" alt="" width={20} height={20} />
              <Input
                placeholder="Нэвтрэх нэр"
                bordered={false}
                required
                value={username}
                onChange={(e) => setUsername(e?.target?.value)}
              />
            </div>
            <div className={style.input}>
              <Image src="/icons/lock.png" alt="" width={20} height={20} />
              <Input.Password
                placeholder="Нууц үг"
                bordered={false}
                required
                value={password}
                onChange={(e) => setPassword(e?.target?.value)}
              />
              <div className={style.reset}>Нууц үг мартсан</div>
            </div>
            <div className={style.btn}>
              <div>
                Бүртгэлгүй бол{' '}
                <span
                  onClick={() => setModal1Open(true)}
                  style={{
                    color: '#4E7197',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  энд
                </span>{' '}
                дарж бүртгүүлнэ үү
              </div>
              <Button className={style.login} onClick={loginApi} loading={loadingLogin}>
                Нэвтрэх
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={style.input}>
              <div className={style.span}>КОД</div>
              <Image src="/icons/mail.png" alt="" width={20} height={20} />
              <Input
                placeholder="Код"
                bordered={false}
                required
                value={username}
                onChange={(e) => setUsername(e?.target?.value)}
              />
            </div>
            <div className={style.input}>
              <Image src="/icons/lock.png" alt="" width={20} height={20} />
              <Input.Password
                placeholder="Нууц үг"
                bordered={false}
                required
                value={password}
                onChange={(e) => setPassword(e?.target?.value)}
              />
              <div className={style.reset}>Нууц үг мартсан</div>
            </div>
            <div className={style.btn}>
              <div></div>
              <Button className={style.login} onClick={loginApi} loading={loadingLogin}>
                Нэвтрэх
              </Button>
            </div>
          </>
        )}
        <Modal
          title="Шинээр хэрэглэгчийн бүртгэл үүсгэх"
          style={{ top: 20 }}
          open={modal1Open}
          onCancel={() => setModal1Open(false)}
          footer={false}
        >
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 800 }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item label="Овог" required name="last_name">
              <Input />
            </Form.Item>
            <Form.Item label="Нэр" required name="first_name">
              <Input />
            </Form.Item>
            <Form.Item label="И-мэйл хаяг" required name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Регистрын дугаар" required name="register_number">
              <Input />
            </Form.Item>
            <Form.Item label="Утасны дугаар" required name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Нууц үг" required name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Нууц үг давтах" required name="rePassword">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loadingSignup}>
                Бүртгүүлэх
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};

export default Home;
