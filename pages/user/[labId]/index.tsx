import { Carousel, Col, Image, Row, Table } from "antd";
import React from "react";
import style from "./index.module.css";

const Index = () => {
  const data = [
    {
      date: "2023-04-01",
      hours: [
        {
          hour: "08:00",
          status: "active",
          devices: [
            {
              id: "348334234",
              status: "active",
              type: "mac",
            },
            {
              id: "348334234",
              status: "active",
              type: "mac",
            },
          ],
        },
        {
          hour: "09:00",
          status: "active",
          devices: [
            {
              id: "348334234",
              status: "active",
              type: "mac",
            },
            {
              id: "348334234",
              status: "active",
              type: "mac",
            },
          ],
        },
      ],
    },
  ];

  const columns = [
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "08:00-09:00",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "09:00-10:00",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "10:00-11:00",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "11:00-12:00",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "12:00-13:00",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "13:00-14:00",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "15:00-16:00",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "16:00-17:00",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "18:00-19:00",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "19:00-20:00",
      dataIndex: "age",
      key: "age",
    },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <Row>
        <Col className={style.cols} span={8}>
          <div className={style.col}>
            <div className={style.text}>Сургууль</div>
            <div className={style.card}>МХТС</div>
          </div>
        </Col>
        <Col className={style.cols} span={8}>
          <div className={style.col}>
            <div className={style.text}>Лаботароийн ангийн дугаар</div>
            <div className={style.card}>МХТС</div>
          </div>
        </Col>
        <Col className={style.cols} span={8}>
          <div className={style.col}>
            <div className={style.text}>Давхар</div>
            <div className={style.card}>МХТС</div>
          </div>
        </Col>
        <Col className={style.cols} span={8}>
          <div className={style.col}>
            <div className={style.text}>Төхөөрөмжийн нэр</div>
            <div className={style.card}>МХТС</div>
          </div>
        </Col>
        <Col className={style.cols} span={8}>
          <div className={style.col}>
            <div className={style.text}>Төхөөрөмжийн код</div>
            <div className={style.card}>МХТС</div>
          </div>
        </Col>
        <Col className={style.cols} span={8}>
          <div className={style.col}>
            <div className={style.text}>Хариуцсан багшийн нэр</div>
            <div className={style.card}>МХТС</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12} className={style.cols}>
          <Carousel autoplay style={{ width: "400px" }}>
            <Image
              alt=""
              width={400}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Image
              alt=""
              width={400}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Carousel>
        </Col>
      </Row>
      <Row style={{ marginTop: "30px" }}>
        <Col span={12} className={style.cols}>
          <Image
            alt=""
            width={400}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
        <Col span={12}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </Col>
      </Row>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default Index;
