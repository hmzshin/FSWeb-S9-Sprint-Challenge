import axios from "axios";
import React, { useEffect, useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initiaCoordinate = [2, 2]; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // define  states
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(0);
  const [coordinate, setCoordinate] = useState(initiaCoordinate);
  const [direction, setDirection] = useState([]);
  const [index, setIndex] = useState(4);

  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setCoordinate(initiaCoordinate);
  }

  useEffect(() => {
    if (direction[0] == "right") {
      if (coordinate[1] <= 2) {
        setCoordinate([coordinate[0], coordinate[1] + 1]);
        setSteps(steps + 1);
      } else {
        setMessage("Sağa gidemezsiniz");
      }
      if (coordinate[1] == 1) {
        setMessage("");
      }
    } else if (direction == "up") {
      if (coordinate[0] >= 2) {
        setCoordinate([coordinate[0] - 1, coordinate[1]]);
        setSteps(steps + 1);
      } else {
        setMessage("Yukarıya gidemezsiniz");
      }

      if (coordinate[0] == 3) {
        setMessage("");
      }
    } else if (direction == "left") {
      if (coordinate[1] >= 2) {
        setCoordinate([coordinate[0], coordinate[1] - 1]);
        setSteps(steps + 1);
      } else {
        setMessage("Sola gidemezsiniz");
      }

      if (coordinate[1] == 3) {
        setMessage("");
      }
    } else if (direction == "down") {
      if (coordinate[0] <= 2) {
        setCoordinate([coordinate[0] + 1, coordinate[1]]);
        setSteps(steps + 1);
      } else {
        setMessage("Aşağıya gidemezsiniz");
      }
      if (coordinate[0] == 1) {
        setMessage("");
      }
    }

    console.log("direction:", direction);
  }, [direction]);

  useEffect(() => {
    if (coordinate[0] == 1 && coordinate[1] == 1) {
      setIndex(0);
    } else if (coordinate[0] == 1 && coordinate[1] == 2) {
      setIndex(1);
    } else if (coordinate[0] == 1 && coordinate[1] == 3) {
      setIndex(2);
    } else if (coordinate[0] == 2 && coordinate[1] == 1) {
      setIndex(3);
    } else if (coordinate[0] == 2 && coordinate[1] == 2) {
      setIndex(4);
    } else if (coordinate[0] == 2 && coordinate[1] == 3) {
      setIndex(5);
    } else if (coordinate[0] == 3 && coordinate[1] == 1) {
      setIndex(6);
    } else if (coordinate[0] == 3 && coordinate[1] == 2) {
      setIndex(7);
    } else if (coordinate[0] == 3 && coordinate[1] == 3) {
      setIndex(8);
    }
    console.log("coordinate: ", coordinate);
  }, [coordinate]);

  function submitHandler(e) {
    e.preventDefault();
    console.log(email);
    reset();
    if (!email) {
      setMessage(" Ouch: email must be a valid email");
    } else if (email === "foo@bar.baz") {
      setMessage("foo@bar.baz failure #71");
    } else {
      axios
        .post("http://localhost:9000/api/result", {
          x: coordinate[1],
          y: coordinate[0],
          steps: steps,
          email: "lady@gaga.com",
        })
        .then(function (response) {
          setMessage(response.data.message);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Koordinatlar ({coordinate[1]}, {coordinate[0]})
        </h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button
          id="left"
          onClick={() => {
            setDirection(["left"]);
          }}
        >
          SOL
        </button>
        <button
          id="up"
          onClick={() => {
            setDirection(["up"]);
          }}
        >
          YUKARI
        </button>
        <button
          id="right"
          onClick={() => {
            setDirection(() => {
              setDirection(["right"]);
            });
          }}
        >
          SAĞ
        </button>
        <button
          id="down"
          onClick={() => {
            setDirection(["down"]);
          }}
        >
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={submitHandler}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
