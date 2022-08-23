import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./card.scss";

const Card = ({ data }) => {
  return (
    <div className="card">
      <div className="card__parcen">
        <div className="card__parcen_icon">{data.icons}</div>
        <div className="card__parcen_circula">
          <CircularProgressbar
            value={data.percentage}
            text={`${data.percentage}%`}
            strokeWidth={8}
            minValue={-10}
            maxValue={100}
            styles={buildStyles({
              pathColor: `${data.color}`,
              pathTransitionDuration: 0.5,
              textColor: `${data.percentage > 0 ? "black" : "red"}`,
            })}
          />
        </div>
      </div>
      <div className="card__content">
        <div className="card__title">{data.title}</div>
        <div className="card__count">
          {data.number > 0 ? (
            <span>{`${data.counts} - ${data.number}`}</span>
          ) : (
            <span>{data.counts}</span>
          )}
        </div>
        <div className="card__time">{data.subtitle}</div>
      </div>
      <div
        className="card__bg"
        style={{
          backgroundColor: `${data.color}`,
        }}
      ></div>
    </div>
  );
};

export default Card;
