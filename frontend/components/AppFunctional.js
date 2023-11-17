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
  const [steps, setSteps] = useState(initialSteps);
  const [coordinate, setCoordinate] = useState(initiaCoordinate);
  const [direction, setDirection] = useState([]);
  const [index, setIndex] = useState(4);

  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  function getXY(indexValue) {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildirection.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
  }

  function showCoordinates(value) {
    return `Koordinatlar (${value.x}, ${value.y})`;
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setCoordinate(initiaCoordinate);

    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
  }

  useEffect(() => {
    if (direction[0] == "right") {
      coordinate[1] <= 2
        ? setCoordinate([coordinate[0], coordinate[1] + 1])
        : setCoordinate(coordinate);
    } else if (direction == "up") {
      coordinate[0] >= 2
        ? setCoordinate([coordinate[0] - 1, coordinate[1]])
        : setCoordinate(coordinate);
    } else if (direction == "left") {
      coordinate[1] >= 2
        ? setCoordinate([coordinate[0], coordinate[1] - 1])
        : setCoordinate(coordinate);
    } else if (direction == "down") {
      coordinate[0] <= 2
        ? setCoordinate([coordinate[0] + 1, coordinate[1]])
        : setCoordinate(coordinate);
    }

    console.log("direction:", direction);
    console.log("coordinate: ", coordinate);
  }, [direction]);

  // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
  // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
  // şu anki indeksi değiştirmemeli.

  useEffect(() => {
    if (coordinate[0] == 1 && coordinate[1] == 1) {
      console.log("arrangeIndex fonksiyonu çalıştı");
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
    } else if (coordinate[0] == 3 && coordinate[1] == 3) {
      setIndex(7);
    } else if (coordinate[0] == 3 && coordinate[1] == 3) {
      setIndex(8);
    }

    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
  }, [coordinate]);

  function submitHandler(e) {
    e.preventDefault();
    console.log(email);
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Koordinatlar ({coordinate[0]}, {coordinate[1]})
        </h3>
        <h3 id="steps">0 kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"></h3>
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
