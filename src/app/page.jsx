"use client";

import { Inter, Patrick_Hand } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
});

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export default function GamePage() {
  const [question, setQuestion] = useState(null);

  const [history, setHistory] = useState([]);

  const [score, setScore] = useState(0);

  const [lives, setLives] = useState(1);

  const [timeLeft, setTimeLeft] = useState(60);

  const [gameOver, setGameOver] = useState(false);

  const [timeUp, setTimeUp] = useState(false);

  const [showStartScreen, setShowStartScreen] = useState(true);

  const [showLevel2Screen, setShowLevel2Screen] = useState(false);

  const [level2Ready, setLevel2Ready] = useState(false);

  const [isLevel2, setIsLevel2] = useState(false);

  const [isLevel3, setIsLevel3] = useState(false);

  const [level2IntroStep, setLevel2IntroStep] = useState(0);

  const [flash, setFlash] = useState("");

  const flashTimeoutRef = useRef(null);

  const audioContextRef = useRef(null);

  const soundsRef = useRef({});

  const answeredRef = useRef(false);

  const backLevel = isLevel3 ? 3 : isLevel2 ? 2 : 1;

  const [stage, setStage] = useState(1);

  const [levelQuestionCount, setLevelQuestionCount] = useState(0);

  const [combo, setCombo] = useState(0);

  const stage1PoolRef = useRef([]);
  const stage2PoolRef = useRef([]);
  const stage1Questions = [];

  const stage2Questions = [];

  // ====================
  // 20以内两位数减一位数
  // ====================

  for (let a = 10; a <= 20; a++) {
    for (let b = 1; b <= 9; b++) {
      const answer = a - b;

      if (answer >= 1 && answer <= 9) {
        stage2Questions.push({
          text: `${a} - ${b}`,
          answer,
        });
      }
    }
  }

  // ====================
  // 乘法口诀（答案 1~9）
  // ====================

  for (let a = 1; a <= 9; a++) {
    for (let b = 1; b <= 9; b++) {
      const answer = a * b;

      if (answer >= 1 && answer <= 9) {
        stage2Questions.push({
          text: `${a} × ${b}`,
          answer,
        });
      }
    }
  }

  // ====================
  // 口诀除法（答案 1~9）
  // ====================

  for (let b = 1; b <= 9; b++) {
    for (let answer = 1; answer <= 9; answer++) {
      const a = b * answer;

      stage2Questions.push({
        text: `${a} ÷ ${b}`,
        answer,
      });
    }
  }

  // ====================
  // 个位数加法
  // ====================

  for (let a = 1; a <= 9; a++) {
    for (let b = 1; b <= 9; b++) {
      const answer = a + b;

      if (answer >= 1 && answer <= 9) {
        stage1Questions.push({
          text: `${a} + ${b}`,
          answer,
        });
      }
    }
  }

  // ====================
  // 个位数减法
  // ====================

  for (let a = 1; a <= 9; a++) {
    for (let b = 1; b <= 9; b++) {
      const answer = a - b;

      if (answer >= 1 && answer <= 9) {
        stage1Questions.push({
          text: `${a} - ${b}`,
          answer,
        });
      }
    }
  }

  // 防止连续重复题目
  function shuffleArray(array) {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  }
  function generateQuestion(currentStage = 1) {
    let text, answer;

    // 先随机答案（1~9平均）
    answer = Math.floor(Math.random() * 9) + 1;

    // 第一阶段：固定题库
    if (currentStage === 1) {
      // 如果池子空了，重新洗牌
      if (stage1PoolRef.current.length === 0) {
        stage1PoolRef.current = shuffleArray(stage1Questions);
      }

      let randomQuestion;

      do {
        randomQuestion = stage1PoolRef.current.pop();

        // 池子空了重新洗牌
        if (!randomQuestion) {
          stage1PoolRef.current = shuffleArray(stage1Questions);

          randomQuestion = stage1PoolRef.current.pop();
        }
      } while (
        history.length >= 2 &&
        history[history.length - 1].answer === randomQuestion.answer &&
        history[history.length - 2].answer === randomQuestion.answer
      );

      text = randomQuestion.text;

      answer = randomQuestion.answer;

      return {
        text,
        answer,
      };
    }

    // 第二阶段：20% 混入第一阶段
    else if (currentStage === 2) {
      let randomQuestion;

      do {
        // 池子空了重新洗牌
        if (stage2PoolRef.current.length === 0) {
          const mixedQuestions = [
            ...stage2Questions,

            ...stage1Questions.slice(
              0,
              Math.floor(stage2Questions.length * 0.2),
            ),
          ];

          stage2PoolRef.current = shuffleArray(mixedQuestions);
        }

        randomQuestion = stage2PoolRef.current.pop();
      } while (
        history.length >= 2 &&
        history[history.length - 1].answer === randomQuestion.answer &&
        history[history.length - 2].answer === randomQuestion.answer
      );

      text = randomQuestion.text;

      answer = randomQuestion.answer;

      return {
        text,
        answer,
      };
    }

    // 第三阶段：实时生成
    else {
      let randomQuestion;

      do {
        const randomType = Math.random();

        // ====================
        // 两位数减法
        // ====================
        if (randomType < 0.45) {
          const answer = Math.floor(Math.random() * 9) + 1;

          const b = Math.floor(Math.random() * 90) + 10;

          const a = b + answer;

          if (a <= 99) {
            randomQuestion = {
              text: `${a} - ${b}`,
              answer,
            };
          }
        }

        // ====================
        // 两位数除法
        // ====================
        else if (randomType < 0.75) {
          const answer = Math.floor(Math.random() * 9) + 1;

          const b = Math.floor(Math.random() * 90) + 10;

          const a = b * answer;

          if (a >= 10 && a <= 99) {
            randomQuestion = {
              text: `${a} ÷ ${b}`,
              answer,
            };
          }
        }

        // ====================
        // 三位数除法
        // ====================
        else {
          const answer = Math.floor(Math.random() * 9) + 1;

          const b = Math.floor(Math.random() * 90) + 10;

          const a = b * answer;

          if (a >= 100 && a <= 250) {
            randomQuestion = {
              text: `${a} ÷ ${b}`,
              answer,
            };
          }
        }
      } while (
        !randomQuestion ||
        (history.length >= 2 &&
          history[history.length - 1].answer === randomQuestion.answer &&
          history[history.length - 2].answer === randomQuestion.answer)
      );

      return randomQuestion;
    }
  }
  // 下一题
  function nextQuestion(currentHistory) {
    const next = generateQuestion(stage);

    setQuestion(next);

    const updatedHistory = [...currentHistory, next];

    if (updatedHistory.length > 20) {
      updatedHistory.shift();
    }

    setHistory(updatedHistory);

    answeredRef.current = false;
  }

  // 开始游戏
  function startGame() {
    setScore(0);

    setLives(1);

    setTimeLeft(60);

    setGameOver(false);

    setTimeUp(false);

    setFlash("");

    setStage(1);

    setLevelQuestionCount(0);

    setCombo(0);

    setLevel2Ready(false);

    setLevel2IntroStep(0);

    setIsLevel2(false);

    setIsLevel3(false);

    const first = generateQuestion();

    setQuestion(first);

    setHistory([first]);

    setTimeUp(false);
  }
  // 回答音效
  function playSound(name) {
    const ctx = audioContextRef.current;

    const buffer = soundsRef.current[name];

    if (!ctx || !buffer) return;

    // 唤醒AudioContext
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // 创建播放节点
    const source = ctx.createBufferSource();

    source.buffer = buffer;

    source.connect(ctx.destination);

    source.start(0);
  }
  function handleAnswer(num) {
    if (gameOver) return;

    if (history.length < backLevel + 1) {
      return;
    }

    if (answeredRef.current) return;

    answeredRef.current = true;

    const targetIndex = history.length - 1 - backLevel;

    const target = history[targetIndex];

    const correct = num === target.answer;

    if (correct) {
      const addScore = isLevel3
        ? stage === 1
          ? 10
          : stage === 2
            ? 15
            : 20
        : isLevel2
          ? stage === 1
            ? 3
            : stage === 2
              ? 4.5
              : 6
          : stage === 1
            ? 1
            : stage === 2
              ? 1.5
              : 2;

      const nextScore = score + addScore;

      const nextQuestionCount = levelQuestionCount + 1;

      const nextCombo = combo + 1;

      // 是否奖励音效
      const willHeal = nextCombo % 15 === 0;

      // 第1~15题
      if (nextQuestionCount === 16) {
        setStage(2);

        if (!willHeal) {
          playSound("correct");
        }
      }

      // 第16~45题
      else if (nextQuestionCount === 46) {
        setStage(3);

        if (!willHeal) {
          playSound("correct");
        }
      }

      // 普通正确
      else {
        if (!willHeal) {
          playSound("correct");
        }
      }

      setLevelQuestionCount(nextQuestionCount);

      setCombo(nextCombo);

      // 连续15题正确加一命
      if (nextCombo % 15 === 0) {
        playSound("heal");

        setLives((prev) => prev + 1);
      }

      // 连续25题正确奖励10秒
      if (nextCombo % 25 === 0) {
        setTimeLeft((prev) => prev + 10);
      }

      // 进入第二关
      if (nextScore >= 100 && !isLevel2 && !isLevel3) {
        playSound("transition");

        setScore(nextScore);

        setShowLevel2Screen(true);

        return;
      }

      // 进入第三关
      if (nextScore >= 401 && isLevel2 && !isLevel3) {
        playSound("transition");

        setScore(nextScore);

        setIsLevel2(false);

        setIsLevel3(true);

        setShowLevel2Screen(true);

        return;
      }

      setScore(nextScore);

      nextQuestion(history);
    } else {
      setCombo(0);
      // 有续命 → 不死
      if (lives > 1) {
        setLives((prev) => prev - 1);

        playSound("wrong");

        setFlash("red");

        clearTimeout(flashTimeoutRef.current);

        flashTimeoutRef.current = setTimeout(() => {
          setFlash("");
        }, 70);

        answeredRef.current = false;

        nextQuestion(history);

        return;
      }

      playSound("wrong");

      setFlash("red");

      clearTimeout(flashTimeoutRef.current);

      flashTimeoutRef.current = setTimeout(() => {
        setFlash("");
      }, 70);

      setTimeout(() => {
        setFlash("");

        setGameOver(true);
      }, 120);
    }
  }

  useEffect(() => {
    async function loadSounds() {
      // 创建AudioContext
      audioContextRef.current = new (
        window.AudioContext || window.webkitAudioContext
      )();

      const ctx = audioContextRef.current;

      // 加载函数
      async function loadSound(name, url) {
        const response = await fetch(url);

        const arrayBuffer = await response.arrayBuffer();

        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

        soundsRef.current[name] = audioBuffer;
      }

      // 加载所有音效
      await Promise.all([
        loadSound("correct", "/sounds/correct.mp3"),

        loadSound("wrong", "/sounds/wrong.mp3"),

        loadSound("start", "/sounds/start.mp3"),

        loadSound("transition", "/sounds/transition.mp3"),

        loadSound("heal", "/sounds/heal.mp3"),
      ]);

      console.log("音效加载完成");
    }

    loadSounds();

    return () => {};
  }, []);

  useEffect(() => {
    if (
      showStartScreen ||
      gameOver ||
      showLevel2Screen ||
      // 第一关开始前不计时
      history.length < backLevel + 1 ||
      // 第二关教学阶段不计时
      (level2Ready && (isLevel3 ? level2IntroStep < 4 : level2IntroStep < 3))
    )
      return;

    if (timeLeft <= 0) {
      setTimeUp(true);

      setGameOver(true);

      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    timeLeft,
    gameOver,
    showStartScreen,
    showLevel2Screen,
    history.length,
    backLevel,
    level2Ready,
    level2IntroStep,
    isLevel3,
  ]);

  return (
    <main
      className={`
    ${inter.className}

    min-h-screen
    
    flex
    flex-col
    items-center
    justify-center
    px-6
    py-4
    overflow-hidden
    select-none
    transition
    duration-75

    ${
      flash === "red"
        ? "bg-[#c85a5d]"
        : isLevel3
          ? "bg-[#7d2d30]"
          : showLevel2Screen || level2Ready
            ? "bg-[#1b2430]"
            : "bg-[#d6d0c4]"
    }

    text-[#3b302a]
    focus:outline-none
  `}
    >
      {showStartScreen ? (
        <div className="flex flex-col items-center text-center px-6">
          <div className="text-3xl font-bold mb-8">三年级的数学考试</div>

          <div
            className="
      text-lg
      opacity-70
      leading-relaxed
      tracking-[0.08em]
      text-[#6b5f56]
    "
          >
            请你从第二题开始
            <br />
            回答上一题的答案
          </div>

          <button
            onClick={async (e) => {
              e.currentTarget.blur();

              if (audioContextRef.current?.state === "suspended") {
                await audioContextRef.current.resume();
              }

              playSound("start");

              startGame();

              setShowStartScreen(false);
            }}
            className="
      mt-10
      outline-none
      focus:outline-none
      px-10
      py-4
      rounded-md
      bg-[#f7f3ea]
      text-[#2f2925]
      shadow-[0_4px_0_#b8aa8a]
      text-2xl
      font-bold
      active:scale-95
      active:translate-y-1
      transition
    "
          >
            这有何难
          </button>
        </div>
      ) : showLevel2Screen ? (
        <div
          className="
      flex
      flex-col
      items-center
      justify-center

      min-h-screen

      px-6

    "
        >
          <div
            className="
        text-3xl
        font-bold

        leading-tight

        text-center

        text-[#f7f3ea]
      "
          >
            {isLevel3 ? (
              <>
                看样子
                <br />
                得来真格的了
              </>
            ) : (
              <>
                没意思
                <br />
                那第二关吧
              </>
            )}
          </div>

          <div
            className="
        mt-8

        text-lg   

        opacity-70

        leading-relaxed

        tracking-[0.06em]

        text-center

        text-[#d8d2c7]
      "
          >
            {isLevel3 ? (
              <>
                请你从第四题开始
                <br />
                回答上上上题的答案
              </>
            ) : (
              <>
                请你从第三题开始
                <br />
                回答上上题的答案
              </>
            )}
          </div>

          <button
            onClick={() => {
              playSound("start");

              setShowLevel2Screen(false);

              setLevel2Ready(true);

              setStage(1);

              setLevelQuestionCount(0);

              if (!isLevel3) {
                setIsLevel2(true);
              }

              setLevel2IntroStep(1);

              setTimeLeft((prev) => Math.min(prev + 60, 99));
            }}
            className="
        mt-14
        outline-none
        focus:outline-none

        px-10
        py-4

        rounded-md

        bg-[#f7f3ea]

        text-[#1b2430]

        text-2xl
        font-bold

        shadow-[0_4px_0_#b8aa8a]

        active:translate-y-1
        active:shadow-none

        transition
      "
          >
            {isLevel3 ? "啊还有？！" : "来就来呗"}
          </button>
        </div>
      ) : gameOver ? (
        <div className="flex flex-col items-center -mt-10">
          <h1
            className={`
    text-2xl
    w-[320px]
    text-center
    font-bold
    tracking-[0.06em]
    mb-6

 ${isLevel2 || isLevel3 ? "text-[#f7f3ea]" : "text-[#2f2925]"}
  `}
          >
            {isLevel3
              ? score >= 2000
                ? "你居然拿到了满分！"
                : score >= 700 && score <= 749
                  ? "你的高考总成绩为"
                  : "我害怕你..."
              : isLevel2
                ? score >= 135 && score <= 149
                  ? "你的高考数学成绩为"
                  : score >= 101 && score <= 134
                    ? "已经很出色了"
                    : "什么都不说了！"
                : "你的三年级数学成绩为"}
          </h1>

          <div
            className={`
${patrick.className}

    text-9xl

    flex
    justify-center

    min-w-[260px]

    text-center
    mb-2
    font-bold

    ${
      isLevel3
        ? "text-[#f7f3ea]"
        : isLevel2
          ? "text-[#ff6b6b]"
          : "text-[#a63d40]"
    }
  `}
          >
            {score}
          </div>

          <div
            className="
            w-full 
            text-center
            text-xl
            opacity-100
            mb-10
            font-bold
            tracking-[0.08em]
            text-[#a63d40]
          "
          ></div>

          <button
            onClick={(e) => {
              e.currentTarget.blur();

              setLevel2Ready(false);

              setLevel2IntroStep(0);

              setIsLevel2(false);

              setIsLevel3(false);

              setShowLevel2Screen(false);

              startGame();

              setShowStartScreen(true);
            }}
            className="
            outline-none
focus:outline-none
          px-10
          py-4
          rounded-md
          bg-[#f7f3ea]
          text-[#2f2925]
          shadow-[0_4px_0_#b8aa8a]
          text-2xl
          font-bold
          text-center
          active:scale-95
          active:translate-y-1
          transition
        "
          >
            {!isLevel2 && !isLevel3
              ? score < 20
                ? "没看规则？"
                : score < 60
                  ? "不可能！"
                  : score < 80
                    ? "再试试！"
                    : score < 90
                      ? "没白读！"
                      : "先别得意！"
              : isLevel3
                ? score >= 2000
                  ? "想给你跪！"
                  : score >= 700 && score <= 749
                    ? "清华or北大？"
                    : "你是怪物吗？"
                : score >= 135 && score <= 149
                  ? "只会更高"
                  : score >= 101 && score <= 134
                    ? "请继续！"
                    : "你是神！"}
          </button>
        </div>
      ) : (
        <>
          <div
            className={`
    w-[min(360px,92vw)]
    max-w-full

    mb-6

    ${isLevel3 ? "bg-[#1b2430]" : "bg-[#b13f46]"}

    rounded-xl

    shadow-[0_2px_10px_rgba(0,0,0,0.18)]

    ${isLevel3 ? "border border-[#3b4c63]" : "border border-[#d86a70]"}

    px-5
    py-4

    flex
items-center
justify-between
  `}
          >
            {/* 左边时间 */}
            <div
              className={`
    dseg-italic

    w-[108px]

    text-[48px]

    leading-none
    tracking-[0.08em]
    font-bold

    shrink-0


${timeLeft <= 5 ? "text-red-300 animate-pulse" : "text-[#f7f3ea]"}
  `}
            >
              {Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, "0")}
              :{(timeLeft % 60).toString().padStart(2, "0")}
            </div>

            {/* 右边 */}
            <div
              className="
    relative

    min-w-[120px]

    flex
    flex-col
    items-end

    text-right

    h-full

    justify-between

    shrink-0
  "
            >
              {/* 顶部状态栏 */}
              <div
                className="
    flex
    flex-col
    items-end

    text-[#f7f3ea]

    leading-none
  "
              >
                <div
                  className="
    font-mono

    text-[9px]

    tracking-[0.22em]

    text-[rgb(252,200,76)]

    translate-y-[-2px]
    

  "
                >
                  MADE BY 7
                </div>

                <div
                  className="
    absolute
                  font-mono

    text-[9px]

    tracking-[0.16em]

    text-[#f7f5ea]

    translate-y-[9px]
  "
                >
                  {`LIFE×${lives}`}
                </div>
              </div>

              {/* score */}
              <div className="flex flex-col items-end mt-2">
                <div
                  className="
    font-mono

    text-[9px]
    tracking-[0.16em]
    text-[#f7f5ea]
  "
                >
                  SCORE
                </div>

                <div
                  className="
    dseg-italic

    text-[22px]
    leading-none
    text-[#f7f3ea]
  "
                >
                  {score >= 1000 ? Math.round(score) : score.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
          {/* 题目 */}
          <div
            className={`
    w-[min(360px,92vw)]
max-w-full

    ${isLevel2 || isLevel3 ? "bg-[#f7f3ea]" : "bg-[#1b2430]"}

    rounded-2xl

    shadow-[0_2px_10px_rgba(0,0,0,0.18)]

    border
    ${
      isLevel3
        ? "border-[#d7b8ff55]"
        : isLevel2
          ? "border-[#ffffff55]"
          : "border-[#ffffff22]"
    }

    h-[160px]

    mb-10

    flex
    items-center
    justify-center
  `}
          >
            <div
              className={`
      text-[clamp(56px,13vw,74px)]
      font-bold
      tabular-nums
      tracking-tighter

      ${isLevel2 || isLevel3 ? "text-[#1b2430]" : "text-[#f7f3ea]"}
    `}
            >
              {question?.text}
            </div>
          </div>

          {history.length <= backLevel ||
          (level2Ready &&
            (isLevel3 ? level2IntroStep < 4 : level2IntroStep < 3)) ? (
            <div className="h-[272px] flex justify-center items-center">
              <button
                onClick={(e) => {
                  e.currentTarget.blur();

                  playSound("start");

                  // 第二关第一步
                  if (level2IntroStep === 1) {
                    nextQuestion(history);

                    setLevel2IntroStep(2);

                    return;
                  }

                  // 第二步
                  if (level2IntroStep === 2) {
                    nextQuestion(history);

                    setLevel2IntroStep(3);

                    return;
                  }

                  // 第三关第三步
                  if (level2IntroStep === 3 && isLevel3) {
                    nextQuestion(history);

                    setLevel2IntroStep(4);

                    return;
                  }
                  nextQuestion(history);
                }}
                className={`
      w-40
      h-40

      rounded-full

      bg-[#f7f3ea]

${
  isLevel3
    ? "border border-[#d7b8ff] shadow-[0_0_18px_rgba(180,120,255,0.28)]"
    : "border border-[#ffffff88] shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
}

text-[#2f2925]

      text-3xl
      font-bold
      text-center

      active:scale-90
active:translate-y-1

transition
    `}
              >
                {level2IntroStep === 1
                  ? "第二题"
                  : level2IntroStep === 2
                    ? "第三题"
                    : level2IntroStep === 3 && isLevel3
                      ? "第四题"
                      : "开始"}
              </button>
            </div>
          ) : (
            <>
              {/* 数字键盘 */}
              <div className="grid grid-cols-3 gap-4 w-[min(320px,88vw)]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleAnswer(num)}
                    className={`
            outline-none
focus:outline-none
                      w-20
            h-20
            rounded-md
            text-5xl
            font-bold
            transition
            duration-75
            active:scale-90
            active:translate-y-1
            shadow-[0_4px_0_#b8aa8a]

            ${
              flash === "red"
                ? "bg-[#c85a5d] text-[#2f2925]"
                : "bg-[#f7f3ea] text-[#2f2925]"
            }
          `}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}
