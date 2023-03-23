import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import style from "../styles/Home.module.css";

const Home = () => {
  const [role, setRole] = useState("user");
  const [modal1Open, setModal1Open] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <Head>
        <title>lms</title>
        <meta name="description" content="Sict Lms" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.main}>
        <p style={{ fontSize: "32px", fontWeight: "bold" }}>
          Та нэвтрэх төрлөө сонгоно уу?
        </p>
        <div className={style.roles}>
          <div
            className={style.role}
            onClick={() => setRole("user")}
            style={{
              border: role === "user" ? "1px solid #7dd1fd" : "1px solid black",
            }}
          >
            <Image src="/images/user.png" alt={""} width={200} height={200} />
            <p>Хэрэглэгч</p>
            <Image
              src="/icons/check.png"
              alt={""}
              width={30}
              height={30}
              style={{
                position: "absolute",
                right: -10,
                bottom: -10,
                display: role === "user" ? "unset" : "none",
              }}
            />
          </div>
          <div
            className={style.role}
            onClick={() => setRole("lab")}
            style={{
              border: role === "lab" ? "1px solid #7dd1fd" : "1px solid black",
            }}
          >
            <Image
              src="/images/laborant.png"
              alt={""}
              width={200}
              height={200}
            />
            <p>Лаборант</p>
            <Image
              src="/icons/check.png"
              alt={""}
              width={30}
              height={30}
              style={{
                position: "absolute",
                right: -10,
                bottom: -10,
                display: role === "lab" ? "unset" : "none",
              }}
            />
          </div>
          <div
            className={style.role}
            onClick={() => setRole("admin")}
            style={{
              border:
                role === "admin" ? "1px solid #7dd1fd" : "1px solid black",
            }}
          >
            <Image src="/images/admin.png" alt={""} width={200} height={200} />
            <p>Админ</p>
            <Image
              src="/icons/check.png"
              alt={""}
              width={30}
              height={30}
              style={{
                position: "absolute",
                right: -10,
                bottom: -10,
                display: role === "admin" ? "unset" : "none",
              }}
            />
          </div>
        </div>
        <p style={{ fontSize: "16px", fontWeight: "bold", margin: "50px" }}>
          Тавтай морилно уу хэрэглэгч
        </p>
        {role === "user" ? (
          <>
            <div className={style.input}>
              <Image src="/icons/mail.png" alt={""} width={20} height={20} />
              <Input placeholder="Нэвтрэх нэр" bordered={false} required />
            </div>
            <div className={style.input}>
              <Image src="/icons/lock.png" alt={""} width={20} height={20} />
              <Input placeholder="Нууц үг" bordered={false} required />
              <div className={style.reset}>Нууц үг мартсан</div>
            </div>
            <div className={style.btn}>
              <div>
                Бүртгэлгүй бол{" "}
                <span
                  onClick={() => setModal1Open(true)}
                  style={{
                    color: "#4E7197",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  энд
                </span>{" "}
                дарж бүртгүүлнэ үү
              </div>
              <Button className={style.login} href="user">
                Нэвтрэх
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={style.input}>
              <div className={style.span}>КОД</div>
              <Image src="/icons/mail.png" alt={""} width={20} height={20} />
              <Input placeholder="Код" bordered={false} required />
            </div>
            <div className={style.input}>
              <Image src="/icons/lock.png" alt={""} width={20} height={20} />
              <Input placeholder="Нууц үг" bordered={false} required />
              <div className={style.reset}>Нууц үг мартсан</div>
            </div>
            <div className={style.btn}>
              <div></div>
              <Button
                className={style.login}
                href={role === "lab" ? "laborant" : "admin"}
              >
                Нэвтрэх
              </Button>
            </div>
          </>
        )}
        <Modal
          title="Шинээр хэрэглэгчийн бүртгэл үүсгэх"
          style={{ top: 20 }}
          open={modal1Open}
          onOk={() => setModal1Open(false)}
          onCancel={() => setModal1Open(false)}
          okText="Бүртгүүлэх"
          cancelText="Нэвтрэх"
        >
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 800 }}
            form={form}
          >
            <Form.Item label="Овог" required name="description_of_goods">
              <Input />
            </Form.Item>
            <Form.Item label="Нэр" required name="mongolianname">
              <Input />
            </Form.Item>
            <Form.Item label="ЗорИ-мэйл хаяг" required name="goodpurpose">
              <Input />
            </Form.Item>
            <Form.Item label="Регистрын дугаар" required name="manufacturer">
              <Input />
            </Form.Item>
            <Form.Item label="Утасны дугаар" required name="model_no">
              <Input />
            </Form.Item>
            <Form.Item label="Хаяг" required name="year_of_manufacture">
              <Input />
            </Form.Item>
            <Form.Item label="Нууц үг" required name="tagId">
              <Input />
            </Form.Item>
            <Form.Item label="Нууц үг давтах" required name="serialnumber">
              <Input />
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
