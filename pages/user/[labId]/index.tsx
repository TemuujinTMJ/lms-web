import {
  Button,
  Card,
  Carousel,
  Checkbox,
  Col,
  Image,
  Modal,
  Radio,
  Row,
} from "antd";
import React, { useState } from "react";
import style from "./index.module.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { Calendar, DateRange, RangeKeyDict } from "react-date-range";

dayjs.extend(customParseFormat);
const hours = [
  "09:00-10:00",
  "08:00-09:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
  "18:00-19:00",
  "19:00-20:00",
];

const disDays = [new Date(), new Date("2023-03-18")];

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [date, setDate] = useState(undefined);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
      color: undefined,
      autoFocus: undefined,
      disabled: undefined,
      showDateDisplay: undefined,
    },
  ]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

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
      <h1 style={{ marginLeft: "70px" }}>Төхөөрөмжүүд</h1>
      <Row wrap style={{ margin: "0px 10px 50px 10px" }}>
        <Col span={12} className={style.cols}>
          <Card
            hoverable
            title="IMAC 27inch"
            extra={<Button onClick={showModal}>Захиалах</Button>}
          >
            <div className={style.device}>
              <Image
                alt=""
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <ul style={{ margin: "0px" }}>
                <li className={style.list}>
                  <span style={{ fontWeight: "700" }}>- Төхөөрөмж:</span> Mac
                </li>
                <li className={style.list}>
                  <span style={{ fontWeight: "700" }}>- Үйлдвэрлэгч:</span>{" "}
                  Apple
                </li>
                <li className={style.list}>
                  <span style={{ fontWeight: "700" }}>- Модел:</span> IMac24
                </li>
                <li className={style.list}>
                  <span style={{ fontWeight: "700" }}>- Үйлдвэрлэсэн он:</span>{" "}
                  2022
                </li>
                <li className={style.list}>
                  <span style={{ fontWeight: "700" }}>- Зориулалт:</span>{" "}
                  Cургалт, судалгаанд
                </li>
              </ul>
            </div>
          </Card>
        </Col>
      </Row>
      <Modal
        title="IMac24"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Захиалах"
        cancelText="Цуцлах"
      >
        <div>
          <Radio.Group
            defaultValue="hour"
            size="large"
            onChange={(e) => setValue(e?.target?.value)}
          >
            <Radio.Button value="hour">Цагаар</Radio.Button>
            <Radio.Button value="day">Өдрөөр</Radio.Button>
          </Radio.Group>
          <Row style={{ marginTop: "20px", marginBottom: "50px" }}>
            {value === "day" ? (
              <Col span={24}>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item: any) => setState([item?.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  disabledDates={disDays}
                />
              </Col>
            ) : (
              <>
                <Col span={9}>
                  <div
                    style={{
                      border: "1px solid #eeeeee",
                      paddingBottom: "10px",
                    }}
                  >
                    <Calendar
                      onChange={(item: any) => setDate(item)}
                      date={date}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <Checkbox.Group onChange={onChange}>
                    <Row wrap>
                      {hours.map((e, key) => {
                        return (
                          <Col key={key} span={8} className={style.orderCard}>
                            <div>{e}</div>
                            <Checkbox value={e}>Захиалах</Checkbox>
                          </Col>
                        );
                      })}
                    </Row>
                  </Checkbox.Group>
                </Col>
                <Col
                  span={3}
                  style={{ border: "1px solid #eeeeee", paddingBottom: "10px" }}
                >
                  Сонголтууд:
                </Col>
              </>
            )}
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default Index;
