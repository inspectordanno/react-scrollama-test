import React from "react";
import { Scrollama, Step } from "react-scrollama";
import { useSprings, animated } from "react-spring";
import Text from "../Text/Text";
import styles from "./App.module.css";

function App() {
  const randomImgs = [
    `https://picsum.photos/id/${100}/800/400.jpg`,
    `https://picsum.photos/id/${200}/800/400.jpg`,
    `https://picsum.photos/id/${300}/800/400.jpg`,
    `https://picsum.photos/id/${400}/800/400.jpg`,
    `https://picsum.photos/id/${500}/800/400.jpg`,
    `https://picsum.photos/id/${600}/800/400.jpg`,
  ];

  const lastImgIndex = randomImgs.length - 1;

  const springConfig = {
    config: { duration: 500 },
  };

  const [springs, setSpring] = useSprings(randomImgs.length, (index) => {
    if (index === 0) {
      return { opacity: 1, ...springConfig };
    }
    return { opacity: 0, ...springConfig };
  });

  const onStepEnter = ({ data, direction }) => {
    const currentImg = data + 1;
    const previousImg = data;
    const nextImg = data + 2;

    console.log(data);

    if (direction === "down") {
      setSpring((index) => {
        if (index === currentImg) {
          return { opacity: 1, ...springConfig };
        }
        if (index === previousImg) {
          return { opacity: 0, ...springConfig };
        }
      });
    }

    if (direction === "up") {
      setSpring((index) => {
        if (data === 0) {
          return { opacity: 1, ...springConfig };
        } else {
          if (index === currentImg) {
            return { opacity: 1, ...springConfig };
          }
          if (index === nextImg) {
            return { opacity: 0, ...springConfig };
          }
        }
      });
    }
  };

  const steps = [];

  // one less step than number of images
  for (let i = 0; i < randomImgs.length - 1; i++) {
    steps.push(
      <Step data={i} key={`step-${i}`}>
        <div>
          <Text text={`This is a text element. It's number is ${i + 1}.`} />
        </div>
      </Step>
    );
  }

  const images = springs.map((src, i) => {
    return (
      <animated.img
        style={{ opacity: springs[i].opacity }}
        key={`random-img-${i}`}
        src={randomImgs[i]}
        alt={"random-img"}
      />
    );
  });

  return (
    <div className={styles.app}>
      <div className={styles.imgContainer}>{images}</div>
      <div className={styles.stepContainer}>
        <Scrollama onStepEnter={onStepEnter}>{steps}</Scrollama>
      </div>
    </div>
  );
}

export default App;
