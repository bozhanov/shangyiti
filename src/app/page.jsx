"use client";

import { Inter, Patrick_Hand, Noto_Sans_SC } from "next/font/google";

const noto = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
});
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

const inter = Inter({
  subsets: ["latin"],
});

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export default function GamePage() {
  const [question, setQuestion] = useState(null);

  const historyRef = useRef([]);

  const [history, setHistory] = useState([]);

  const [score, setScore] = useState(0);

  const [lives, setLives] = useState(1);

  const [timeLeft, setTimeLeft] = useState(60);

  const [gameOver, setGameOver] = useState(false);

  const [finalClear, setFinalClear] = useState(false);

  const [screen, setScreen] = useState("home");

  const [showStartScreen, setShowStartScreen] = useState(true);

  const [showLevel2Screen, setShowLevel2Screen] = useState(false);

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  // High Score overlay
  const [showHSOverlay, setShowHSOverlay] = useState(false);
  const [hsName, setHsName] = useState("");
  const overlayRef = useRef(null);

  // 首页预加载排行榜
  useEffect(() => {
    getLeaderboard().then((data) => {
      setLeaderboardData(data || []);
    });
  }, []);

  // 排行榜页面切换时刷新
  useEffect(() => {
    if (screen === "leaderboard") {
      setLeaderboardLoading(true);
      getLeaderboard().then((data) => {
        setLeaderboardData(data || []);
        setLeaderboardLoading(false);
      });
    }
  }, [screen]);

  // ===== Supabase + localStorage 排行榜工具 =====
  const LS_KEY = "mathgame_leaderboard";

  const getSupabaseLeaderboard = async () => {
    try {
      let query = supabase
        .from("leaderboard")
        .select("name, score");

      const { data, error } = await query
        .order("score", { ascending: false })
        .limit(200);
      if (error) throw error;
      // 同名只保留最高分
      const seen = new Map();
      for (const row of data) {
        if (row.name === "NO NAME") continue;
        if (!seen.has(row.name) || row.score > seen.get(row.name)) {
          seen.set(row.name, row.score);
        }
      }
      return Array.from(seen, ([name, score]) => ({ name, score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
    } catch {
      return null;
    }
  };

  const getLocalLeaderboard = () => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || [];
    } catch {
      return [];
    }
  };

  const getLeaderboard = async () => {
    const remote = await getSupabaseLeaderboard();
    if (remote && remote.length > 0) return remote;
    return getLocalLeaderboard().slice(0, 20);
  };

  const saveScore = async (name, score) => {
    // 先写 Supabase
    try {
      const { error } = await supabase
        .from("leaderboard")
        .insert({ name, score });
      if (!error) return;
    } catch {}
    // Fallback 到 localStorage
    const list = getLocalLeaderboard();
    const existing = list.find((e) => e.name === name);
    if (existing) {
      if (score > existing.score) existing.score = score;
    } else {
      list.push({ name, score });
    }
    list.sort((a, b) => b.score - a.score);
    localStorage.setItem(LS_KEY, JSON.stringify(list.slice(0, 50)));
  };

  // 判断是否进入 Top20，进了就弹 overlay
  const checkHighScore = (currentScore) => {
    const top20 = leaderboardData.slice(0, 20);
    const qualifies =
      top20.length < 20 || currentScore > (top20[top20.length - 1]?.score ?? 0);
    if (qualifies) {
      setHsName("");
      setShowHSOverlay(true);
    }
  };

  // overlay 显示时自动聚焦
  useEffect(() => {
    if (showHSOverlay) {
      setTimeout(() => overlayRef.current?.focus(), 100);
    }
  }, [showHSOverlay]);

  const handleHSConfirm = async () => {
    const name = hsName.trim() || "你是谁？";
    const currentScore = score >= 1000 ? Math.round(score) : parseFloat(score.toFixed(1));
    const finalName = name.toUpperCase().slice(0, 8);
    await saveScore(finalName, currentScore);
    const updated = await getLeaderboard();
    if (updated) setLeaderboardData(updated);
    setShowHSOverlay(false);
  };

  // 闪烁光标
  const [cursorOn, setCursorOn] = useState(true);
  useEffect(() => {
    if (!showHSOverlay) return;
    const timer = setInterval(() => setCursorOn(prev => !prev), 530);
    return () => clearInterval(timer);
  }, [showHSOverlay]);

  const [level2Ready, setLevel2Ready] = useState(false);

  const [isLevel2, setIsLevel2] = useState(false);

  const [isLevel3, setIsLevel3] = useState(false);

  const [isLevel4, setIsLevel4] = useState(false);

  const [level2IntroStep, setLevel2IntroStep] = useState(0);

  const [flash, setFlash] = useState("");

  const flashTimeoutRef = useRef(null);

  const audioContextRef = useRef(null);

  const soundsRef = useRef({});

  const answeredRef = useRef(false);

  const backLevel = isLevel4 ? 4 : isLevel3 ? 3 : isLevel2 ? 2 : 1;

  const savedLevel4SecondsRef = useRef(0);

  const [stage, setStage] = useState(1);

  const [levelQuestionCount, setLevelQuestionCount] = useState(0);

  const [combo, setCombo] = useState(0);

  const stage1PoolRef = useRef([]);
  const stage2PoolRef = useRef([]);
  const stage3PoolRef = useRef([]);
  const stage4PoolRef = useRef([]);
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
        history[history.length - 1]?.text === randomQuestion.text ||
        (history.length >= 2 &&
          history[history.length - 1].answer === randomQuestion.answer &&
          history[history.length - 2].answer === randomQuestion.answer)
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
          const randomStage1 = shuffleArray(stage1Questions).slice(
            0,
            Math.floor(stage2Questions.length * 0.2),
          );

          const mixedQuestions = [...stage2Questions, ...randomStage1];

          stage2PoolRef.current = shuffleArray(mixedQuestions);
        }

        randomQuestion = stage2PoolRef.current.pop();
      } while (
        history[history.length - 1]?.text === randomQuestion.text ||
        (history.length >= 2 &&
          history[history.length - 1].answer === randomQuestion.answer &&
          history[history.length - 2].answer === randomQuestion.answer)
      );

      text = randomQuestion.text;

      answer = randomQuestion.answer;

      return {
        text,
        answer,
      };
    }

    // 第三阶段：实时生成 + 混入前两阶段
    else if (currentStage === 3) {
      // 池子空了重新生成
      if (stage3PoolRef.current.length === 0) {
        const generatedQuestions = [];

        // ====================
        // 主体题库（90%）
        // ====================

        while (generatedQuestions.length < 180) {
          const randomType = Math.random();

          let randomQuestion;

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

          if (randomQuestion) {
            generatedQuestions.push(randomQuestion);
          }
        }

        // ====================
        // 混入第一阶段 5%
        // ====================

        const stage1Mix = shuffleArray(stage1Questions).slice(
          0,
          Math.floor(generatedQuestions.length * 0.05),
        );

        // ====================
        // 混入第二阶段 5%
        // ====================

        const stage2Mix = shuffleArray(stage2Questions).slice(
          0,
          Math.floor(generatedQuestions.length * 0.05),
        );

        // ====================
        // 合并总池
        // ====================

        stage3PoolRef.current = shuffleArray([
          ...generatedQuestions,
          ...stage1Mix,
          ...stage2Mix,
        ]);
      }

      let randomQuestion;

      do {
        randomQuestion = stage3PoolRef.current.pop();

        // 池子空了重新生成
        if (!randomQuestion) {
          stage3PoolRef.current = [];

          return generateQuestion(3);
        }
      } while (
        !randomQuestion ||
        // 不连续重复题目
        history[history.length - 1]?.text === randomQuestion.text ||
        // 不连续三个相同答案
        (history.length >= 2 &&
          history[history.length - 1].answer === randomQuestion.answer &&
          history[history.length - 2].answer === randomQuestion.answer)
      );

      return randomQuestion;
    }
    // 第四阶段：最终题库
    else if (currentStage === 4) {
      function formatNumber(n) {
        return n < 0 ? `(${n})` : n;
      }
      // 池子空了重新生成
      if (stage4PoolRef.current.length === 0) {
        const generatedQuestions = [];

        // ====================
        // 主体题库（90%）
        // ====================

        while (generatedQuestions.length < 300) {
          const randomType = Math.random();

          let randomQuestion;

          // ==================================================
          // 第一类：负数双数式
          // ==================================================

          if (randomType < 0.6) {
            const answer = Math.floor(Math.random() * 9) + 1;

            const opType = Math.random();

            // 加法
            if (opType < 0.25) {
              const a = Math.floor(Math.random() * 501) - 250;

              const b = answer - a;

              if (
                b >= -250 &&
                b <= 250 &&
                !(Math.abs(a) >= 100 && Math.abs(b) >= 100)
              ) {
                randomQuestion = {
                  text: `${formatNumber(a)} + ${formatNumber(b)}`,
                  answer,
                };
              }
            }

            // 减法
            else if (opType < 0.5) {
              const b = Math.floor(Math.random() * 501) - 250;

              const a = answer + b;

              if (
                a >= -250 &&
                a <= 250 &&
                !(Math.abs(a) >= 100 && Math.abs(b) >= 100)
              ) {
                randomQuestion = {
                  text: `${formatNumber(a)} - ${formatNumber(b)}`,
                  answer,
                };
              }
            }

            // 乘法
            else if (opType < 0.75) {
              const factorSets = {
                1: [
                  [1, 1],
                  [-1, -1],
                ],
                2: [
                  [1, 2],
                  [2, 1],
                  [-1, -2],
                  [-2, -1],
                ],
                3: [
                  [1, 3],
                  [3, 1],
                  [-1, -3],
                  [-3, -1],
                ],
                4: [
                  [1, 4],
                  [2, 2],
                  [4, 1],
                  [-1, -4],
                  [-2, -2],
                  [-4, -1],
                ],
                5: [
                  [1, 5],
                  [5, 1],
                  [-1, -5],
                  [-5, -1],
                ],
                6: [
                  [1, 6],
                  [2, 3],
                  [3, 2],
                  [6, 1],
                  [-1, -6],
                  [-2, -3],
                  [-3, -2],
                  [-6, -1],
                ],
                7: [
                  [1, 7],
                  [7, 1],
                  [-1, -7],
                  [-7, -1],
                ],
                8: [
                  [1, 8],
                  [2, 4],
                  [4, 2],
                  [8, 1],
                  [-1, -8],
                  [-2, -4],
                  [-4, -2],
                  [-8, -1],
                ],
                9: [
                  [1, 9],
                  [3, 3],
                  [9, 1],
                  [-1, -9],
                  [-3, -3],
                  [-9, -1],
                ],
              };

              const pairs = factorSets[answer];

              const pair = pairs[Math.floor(Math.random() * pairs.length)];

              randomQuestion = {
                text: `${formatNumber(pair[0])} × ${formatNumber(pair[1])}`,
                answer,
              };
            }

            // 除法
            else {
              const b = Math.floor(Math.random() * 81) + 1;

              const sign = Math.random() < 0.5 ? -1 : 1;

              const divisor = b * sign;

              const dividend = divisor * answer;

              if (dividend >= -250 && dividend <= 250) {
                randomQuestion = {
                  text: `${formatNumber(dividend)} ÷ ${formatNumber(divisor)}`,
                  answer,
                };
              }
            }
          }

          // ==================================================
          // 第二类：三个数式子
          // ==================================================
          else if (randomType < 0.9) {
            const templates = [
              {
                text: "a + b - c",
                calc: (a, b, c) => a + b - c,
              },
              {
                text: "a - b + c",
                calc: (a, b, c) => a - b + c,
              },
              {
                text: "a - (b + c)",
                calc: (a, b, c) => a - (b + c),
              },
              {
                text: "a + (b - c)",
                calc: (a, b, c) => a + (b - c),
              },
              {
                text: "a × b + c",
                calc: (a, b, c) => a * b + c,
              },
              {
                text: "a + b × c",
                calc: (a, b, c) => a + b * c,
              },
              {
                text: "a × (b - c)",
                calc: (a, b, c) => a * (b - c),
              },
            ];

            const tpl = templates[Math.floor(Math.random() * templates.length)];

            const a = Math.floor(Math.random() * 9) + 1;

            const b = Math.floor(Math.random() * 9) + 1;

            const c = Math.floor(Math.random() * 9) + 1;

            const answer = tpl.calc(a, b, c);

            if (answer >= 1 && answer <= 9) {
              randomQuestion = {
                text: tpl.text.replace("a", a).replace("b", b).replace("c", c),
                answer,
              };
            }
          }

          // ==================================================
          // 第三类：根号题
          // ==================================================
          else {
            const roots = [1, 4, 9, 16, 25, 36, 49, 64, 81];

            const root = roots[Math.floor(Math.random() * roots.length)];

            const rootValue = Math.sqrt(root);

            const answer = Math.floor(Math.random() * 9) + 1;

            const opType = Math.random();

            // +
            if (opType < 0.25) {
              const b = answer - rootValue;

              if (b >= 1 && b <= 9) {
                randomQuestion = {
                  text: `√${root} + ${b}`,
                  answer,
                };
              }
            }

            // -
            else if (opType < 0.5) {
              const b = rootValue - answer;

              if (b >= 1 && b <= 9) {
                randomQuestion = {
                  text: `√${root} - ${b}`,
                  answer,
                };
              }
            }

            // ×
            else if (opType < 0.75) {
              if (answer % rootValue === 0) {
                const b = answer / rootValue;

                if (b >= 1 && b <= 9) {
                  randomQuestion = {
                    text: `√${root} × ${b}`,
                    answer,
                  };
                }
              }
            }

            // ÷
            else {
              const b = answer * rootValue;

              if (b >= 1 && b <= 81) {
                randomQuestion = {
                  text: `${b} ÷ √${root}`,
                  answer,
                };
              }
            }
          }

          if (randomQuestion) {
            generatedQuestions.push(randomQuestion);
          }
        }

        stage4PoolRef.current = shuffleArray(generatedQuestions);
      }

      let randomQuestion;

      do {
        randomQuestion = stage4PoolRef.current.pop();

        // 池子空了重新生成
        if (!randomQuestion) {
          stage4PoolRef.current = [];

          return generateQuestion(4);
        }
      } while (
        !randomQuestion ||
        // 不连续重复题目
        history[history.length - 1]?.text === randomQuestion.text ||
        // 不连续三个相同答案
        (history.length >= 2 &&
          history[history.length - 1].answer === randomQuestion.answer &&
          history[history.length - 2].answer === randomQuestion.answer)
      );

      return randomQuestion;
    }
  }

  // 下一题
  function nextQuestion() {
    const next = generateQuestion(stage);

    historyRef.current.push(next);

    if (historyRef.current.length > 20) {
      historyRef.current.shift();
    }

    setQuestion(next);

    setHistory([...historyRef.current]);

    answeredRef.current = false;
  }

  // 开始游戏
  function startGame() {
    setScore(0);

    setLives(1);

    setTimeLeft(60);

    setGameOver(false);

    setFinalClear(false);

    setShowHSOverlay(false);

    setHsName("");

    setFlash("");

    setStage(1);

    setLevelQuestionCount(0);

    setCombo(0);

    setLevel2Ready(false);

    setLevel2IntroStep(0);

    setIsLevel2(false);

    setIsLevel3(false);

    setIsLevel4(false);

    const first = generateQuestion();

    historyRef.current = [first];

    setQuestion(first);

    setHistory([...historyRef.current]);
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

  useEffect(() => {
    // 线上自动关闭
    if (process.env.NODE_ENV !== "development") return;

    function handleDebugKey(e) {
      const key = e.key.toLowerCase();

      // K = 立即死亡
      if (key === "k") {
        setGameOver(true);
        checkHighScore(score);
      }

      // L = 最终通关
      if (key === "l") {
        setScore(5000);
        setFinalClear(true);
        checkHighScore(5000);
      }

      // P = +50分
      if (key === "p") {
        setScore((prev) => prev + 50);
      }

      // 1 = 跳第一关
      if (key === "1") {
        setIsLevel2(false);
        setIsLevel3(false);
        setIsLevel4(false);

        setStage(1);

        setScore(0);

        setShowLevel2Screen(false);

        setLevel2Ready(false);

        setLevelQuestionCount(0);

        setTimeLeft(60);

        const first = generateQuestion(1);

        historyRef.current = [first];

        setQuestion(first);

        setHistory([first]);
      }

      // 2 = 跳第二关
      if (key === "2") {
        setIsLevel2(true);
        setIsLevel3(false);
        setIsLevel4(false);

        setStage(1);

        setScore(100);

        setShowLevel2Screen(false);

        setLevel2Ready(false);

        setLevelQuestionCount(0);

        setTimeLeft(60);

        const first = generateQuestion(1);

        historyRef.current = [first];

        setQuestion(first);

        setHistory([first]);
      }

      // 3 = 跳第三关
      if (key === "3") {
        setIsLevel2(false);
        setIsLevel3(true);
        setIsLevel4(false);

        setStage(1);

        setScore(401);

        setShowLevel2Screen(false);

        setLevel2Ready(false);

        setLevelQuestionCount(0);

        setTimeLeft(60);

        const first = generateQuestion(1);

        historyRef.current = [first];

        setQuestion(first);

        setHistory([first]);
      }

      // 4 = 跳第四关
      if (key === "4") {
        setIsLevel2(false);
        setIsLevel3(false);
        setIsLevel4(true);

        setStage(4);

        setScore(2000);

        setShowLevel2Screen(false);

        setLevel2Ready(false);

        setLevelQuestionCount(0);

        setTimeLeft(60);

        const first = generateQuestion(4);

        historyRef.current = [first];

        setQuestion(first);

        setHistory([first]);
      }
    }

    window.addEventListener("keydown", handleDebugKey);

    return () => {
      window.removeEventListener("keydown", handleDebugKey);
    };
  }, []);

  function handleAnswer(num) {
    if (gameOver) return;

    if (history.length < backLevel + 1) {
      return;
    }

    if (answeredRef.current) return;

    answeredRef.current = true;

    const targetIndex = history.length - 1 - backLevel;

    const target = history[targetIndex];

    if (!target) {
      answeredRef.current = false;

      return;
    }

    const correct =
      num === target.answer || process.env.NODE_ENV === "development";

    if (correct) {
      const addScore = isLevel4
        ? 60
        : isLevel3
          ? stage === 1
            ? 16
            : stage === 2
              ? 24
              : 32
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

      // 第四关满5000分立即结算
      if (isLevel4 && nextScore >= 5000) {
        const finalScore =
          nextScore +
          lives * 5 +
          savedLevel4SecondsRef.current +
          Math.floor(timeLeft);
        setScore(finalScore);
        setFinalClear(true);
        checkHighScore(finalScore);
        return;
      }

      const nextQuestionCount = levelQuestionCount + 1;

      const nextCombo = combo + 1;

      // 是否奖励音效
      const willHeal = nextCombo % 15 === 0;

      const willTransition =
        (nextScore >= 100 && !isLevel2 && !isLevel3 && !isLevel4) ||
        (nextScore >= 401 && isLevel2 && !isLevel3) ||
        (nextScore >= 2000 && isLevel3 && !isLevel4);

      // 第1~15题
      if (!isLevel4 && nextQuestionCount === 16) {
        setStage(2);

        if (!willHeal && !willTransition) {
          playSound("correct");
        }
      }

      // 第16~45题
      else if (!isLevel4 && nextQuestionCount === 46) {
        setStage(3);

        if (!willHeal && !willTransition) {
          playSound("correct");
        }
      }

      // 普通正确
      else {
        if (!willHeal && !willTransition) {
          playSound("correct");
        }
      }

      setLevelQuestionCount(nextQuestionCount);

      setCombo(nextCombo);

      // 连续15题正确加一命
      if (nextCombo % 15 === 0 && !willTransition) {
        playSound("heal");

        setLives((prev) => prev + 1);
      }

      // 连续25题正确奖励10秒
      if (nextCombo % 25 === 0) {
        setTimeLeft((prev) => prev + 10);
      }

      // 进入第二关
      if (nextScore >= 100 && !isLevel2 && !isLevel3 && !isLevel4) {
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

      // 进入第四关
      if (nextScore >= 2000 && isLevel3 && !isLevel4) {
        playSound("transition");
        setScore(nextScore);
        setIsLevel3(false);
        setIsLevel2(false);
        setIsLevel4(true);
        setStage(4);
        setShowLevel2Screen(true);

        const first = generateQuestion(4);
        historyRef.current = [first];
        setQuestion(first);
        setHistory([first]);

        return;
      }
      setScore(nextScore);

      nextQuestion();
    } else {
      setCombo(0);
      // 有续命 → 不死
      if (lives > 1) {
        setLives((prev) => prev - 1);

        playSound("wrong");

        answeredRef.current = false;

        nextQuestion();

        return;
      }

      playSound("wrong");

      setTimeout(() => {
        setGameOver(true);
        checkHighScore(score);
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
      (level2Ready &&
        (isLevel4
          ? level2IntroStep < 5
          : isLevel3
            ? level2IntroStep < 4
            : level2IntroStep < 3))
    )
      return;

    if (timeLeft <= 0) {
      setGameOver(true);
      checkHighScore(score);

      return;
    }

    const timer = setInterval(() => {
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

  // 结算页文案
  function getGameOverText(score, isLevel2, isLevel3, isLevel4) {
    if (isLevel4) return { heading: "？？？", button: "！！！" };
    if (isLevel3) {
      if (score >= 750)
        return { heading: "我害怕你...", button: "你是怪物吗？" };
      if (score >= 700)
        return { heading: "你的高考总成绩为", button: "清华or北大？" };
      return { heading: "我的天", button: "能更高吗？" };
    }
    if (isLevel2) {
      if (score >= 150) return { heading: "什么都不说了", button: "太秀了！" };
      if (score >= 135)
        return { heading: "你的高考数学成绩为", button: "只会更高！" };
      if (score >= 101) return { heading: "已经很出色了", button: "请继续！" };
      return { heading: "什么都不说了", button: "太优秀了！" };
    }
    // 第一关
    if (score < 20)
      return { heading: "你的三年级数学成绩为", button: "没看规则？" };
    if (score < 60)
      return { heading: "你的三年级数学成绩为", button: "不可能！" };
    if (score < 80)
      return { heading: "你的三年级数学成绩为", button: "再试试！" };
    if (score < 90)
      return { heading: "你的三年级数学成绩为", button: "没白读！" };
    return { heading: "你的三年级数学成绩为", button: "先别得意！" };
  }

  function getFinalClearText(isLevel4) {
    if (isLevel4) return { heading: "我ca", button: "想给你跪！" };
    return { heading: "最终成绩", button: "再来一次" };
  }

  return (
    <main
      className={`
    ${noto.className}

    h-dvh

flex
items-center
justify-center
    px-6
    py-4
    overflow-hidden
    select-none
    transition-all
    duration-700
    ease-in-out

    ${
      showLevel2Screen
        ? isLevel4
          ? "bg-[#f5f5f5]"
          : isLevel3
            ? "bg-[#7d2d30]"
            : "bg-[#1b2430]"
        : isLevel4
          ? "bg-[#f5f5f5]"
          : isLevel3
            ? "bg-[#7d2d30]"
            : isLevel2
              ? "bg-[#1b2430]"
              : "bg-[#d6d0c4]"
    }

    text-[#3b302a]
    focus:outline-none
  `}
    >
      <div
        className="
    w-full
    max-w-[420px]

    h-dvh

    flex
    flex-col
    items-center
    justify-center

    mx-auto
  "
      >
        {screen === "home" ? (
          <div className="flex flex-col items-center text-center px-6">
            <div
              className="
    text-[60px]
    font-black
    leading-none
    mb-14
    text-[#2f2925]
  "
            >
              上 一 题
            </div>

            <div className="flex flex-col gap-4 w-full max-w-[180px]">
              <button
                onClick={() => {
                  startGame();
                  setShowStartScreen(true);
                  setScreen("game");
                }}
                className="
        px-6
        py-3
        rounded-md
        bg-[#f7f3ea]
        text-[#2f2925]
        shadow-[0_4px_0_#b8aa8a]
        text-xl
        font-bold
        active:scale-95
        active:translate-y-1
        transition
      "
              >
                开始
              </button>

              <button
                onClick={() => setScreen("leaderboard")}
                className="
        px-6
        py-3
        rounded-md
        bg-[#f7f3ea]
        text-[#2f2925]
        shadow-[0_4px_0_#b8aa8a]
        text-xl
        font-bold
        active:scale-95
        active:translate-y-1
        transition
      "
              >
                排行榜
              </button>

              <button
                onClick={() => setScreen("settings")}
                className="
        px-6
        py-3
        rounded-md
        bg-[#f7f3ea]
        text-[#2f2925]
        shadow-[0_4px_0_#b8aa8a]
        text-xl
        font-bold
        active:scale-95
        active:translate-y-1
        transition
      "
              >
                设置
              </button>
            </div>
          </div>
        ) : screen === "settings" ? (
          <div className="flex flex-col items-center text-center px-6 w-full min-h-dvh justify-between">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-3xl font-bold leading-snug whitespace-nowrap">
                都这游戏了...
                <br />
                还有啥好设置的？
              </div>
            </div>

            <button
              onClick={() => setScreen("home")}
              className="
                w-16 h-16 rounded-full
                bg-[#f7f3ea] text-[#2f2925]
                shadow-[0_4px_12px_rgba(0,0,0,0.18)]
                text-sm font-bold
                active:scale-95
                transition
                mb-8
              "
            >
              首页
            </button>
          </div>
        ) : screen === "leaderboard" ? (
          <div className="flex flex-col items-center text-center px-6 w-full min-h-dvh justify-between">
            <div className="pt-14" />

            {/* Leaderboard Panel */}
            <div className="w-full max-w-[360px] bg-black/40 backdrop-blur-sm rounded-2xl px-5 py-5 flex-1 flex flex-col" style={{ maxHeight: "calc(100dvh - 120px)" }}>
              <div className="overflow-y-auto flex-1">
                {leaderboardLoading ? (
                  <div className="text-[#f7f3ea]/40 text-sm py-4 text-center">
                    加载中...
                  </div>
                ) : leaderboardData.length === 0 ? (
                  <div className="text-[#f7f3ea]/40 text-sm py-4 text-center">
                    暂无成绩
                  </div>
                ) : (
                  leaderboardData.slice(0, 20).map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-[6px] border-b border-white/10 last:border-b-0"
                    >
                      <span className="text-[#f7f3ea]/50 text-sm font-bold w-8 text-left tabular-nums">
                        #{i + 1}
                      </span>
                      <span className="text-[#f7f3ea] text-sm font-bold tracking-wider flex-1 text-center">
                        {entry.name.slice(0, 8)}
                      </span>
                      <span className="dseg-italic text-[#f7f3ea] text-lg font-bold w-16 text-right tabular-nums">
                        {entry.score}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 首页 button */}
            <button
              onClick={() => setScreen("home")}
              className="
                w-16 h-16 rounded-full
                bg-[#f7f3ea] text-[#2f2925]
                shadow-[0_4px_12px_rgba(0,0,0,0.18)]
                text-sm font-bold
                active:scale-95
                transition
                mb-8 mt-4
              "
            >
              首页
            </button>
          </div>
        ) : screen === "game" && showStartScreen ? (
          <div className="flex flex-col items-center justify-center text-center px-6 w-full min-h-dvh relative">
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl font-bold tracking-[0.06em] text-center mb-6">
                三年级的数学考试
              </div>

              <div
                className="
      text-lg
      opacity-70
      leading-relaxed
      tracking-[0.08em]
      text-center
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
      mt-8
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

            <button
              onClick={() => setScreen("home")}
              className="
                absolute bottom-8
                w-16 h-16 rounded-full
                bg-[#f7f3ea] text-[#2f2925]
                shadow-[0_4px_12px_rgba(0,0,0,0.18)]
                text-sm font-bold
                active:scale-95
                transition
              "
            >
              首页
            </button>
          </div>
        ) : screen === "game" && showLevel2Screen ? (
          <div className="flex flex-col items-center justify-center text-center px-6 w-full min-h-dvh">
            <div
              className="
    flex
    flex-col
    items-center
    text-center
    gap-8
    px-6
  "
            >
              <div
                className={`
        text-3xl
        font-bold
        tracking-[0.06em]
        text-center
        leading-[1.35]
        ${isLevel4 ? "text-[#111111]" : "text-[#f7f3ea]"}
      `}
              >
                {isLevel4 ? (
                  <>
                    最后一关
                    <br />
                    你可别哭
                  </>
                ) : isLevel3 ? (
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
                className={`
        text-lg
        opacity-70
        leading-[1.7]
        tracking-[0.08em]
        text-center
        ${isLevel4 ? "text-[#555555]" : "text-[#d8d2c7]"}
      `}
              >
                {isLevel4 ? (
                  <>
                    请你从第五题开始
                    <br />
                    回答上上上上题的答案
                  </>
                ) : isLevel3 ? (
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

                  setStage(isLevel4 ? 4 : 1);

                  setLevelQuestionCount(0);

                  if (!isLevel3 && !isLevel4) {
                    setIsLevel2(true);
                  }

                  setLevel2IntroStep(1);

                  if (isLevel4) {
                    savedLevel4SecondsRef.current = timeLeft;
                    setTimeLeft(60);
                  } else {
                    setTimeLeft((prev) => prev + 60);
                  }
                }}
                className={`
              outline-none
              focus:outline-none
              px-10
              py-4
              rounded-md
              ${
                isLevel4
                  ? "bg-[#111111] text-[#ffffff] shadow-[0_4px_0_#444444]"
                  : "bg-[#f7f3ea] text-[#1b2430] shadow-[0_4px_0_#b8aa8a]"
              }
              text-2xl
              font-bold
              active:scale-95
              active:translate-y-1
              active:shadow-none
              transition
            `}
              >
                {isLevel4 ? "你来真的？" : isLevel3 ? "啊还有？！" : "来就来呗"}
              </button>
            </div>
          </div>
        ) : finalClear ? (
          <div className="flex flex-col items-center">
            <h1
              className={`
    text-[clamp(1.7rem,7vw,3rem)]
    text-center
    font-bold
    tracking-[0.06em]
    mb-6

 ${isLevel4 ? "text-[#111111]" : isLevel2 || isLevel3 ? "text-[#f7f3ea]" : "text-[#2f2925]"}
  `}
            >
              {getFinalClearText(isLevel4).heading}
            </h1>

            <div
              className={`
${patrick.className}

    text-9xl

    flex
    justify-center

    min-w-[260px]

    text-center
    mb-6
    font-bold

    ${
      isLevel4
        ? "text-[#111111]"
        : isLevel3
          ? "text-[#f7f3ea]"
          : isLevel2
            ? "text-[#ff6b6b]"
            : "text-[#a63d40]"
    }
  `}
            >
              {score}
            </div>

            <button
              onClick={(e) => {
                e.currentTarget.blur();

                setLevel2Ready(false);

                setLevel2IntroStep(0);

                setIsLevel2(false);

                setIsLevel3(false);

                setIsLevel4(false);

                setShowLevel2Screen(false);

                startGame();

                setShowStartScreen(true);

                setScreen("home");
              }}
              className={`
            outline-none
focus:outline-none
          px-8
          py-3
          rounded-md

          ${
            isLevel4
              ? "bg-[#111111] text-[#ffffff] shadow-[0_4px_0_#444444]"
              : "bg-[#f7f3ea] text-[#2f2925] shadow-[0_4px_0_#b8aa8a]"
          }
          text-xl
          font-bold
          text-center
          active:scale-95
          active:translate-y-1
          transition
        `}
            >
              {getFinalClearText(isLevel4).button}
            </button>
          </div>
        ) : gameOver ? (
          <div className="flex flex-col items-center">
            <h1
              className={`
    text-[clamp(1.7rem,7vw,3rem)]
    text-center
    font-bold
    tracking-[0.06em]
    mb-6

 ${isLevel4 ? "text-[#111111]" : isLevel2 || isLevel3 ? "text-[#f7f3ea]" : "text-[#2f2925]"}
  `}
            >
              {getGameOverText(score, isLevel2, isLevel3, isLevel4).heading}
            </h1>

            <div
              className={`
${patrick.className}

    text-9xl

    flex
    justify-center

    min-w-[260px]

    text-center
    mb-6
    font-bold

    ${
      isLevel4
        ? "text-[#111111]"
        : isLevel3
          ? "text-[#f7f3ea]"
          : isLevel2
            ? "text-[#ff6b6b]"
            : "text-[#a63d40]"
    }
  `}
            >
              {score}
            </div>

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

                setScreen("home");
              }}
              className={`
  outline-none
  focus:outline-none

  px-8
  py-3
  rounded-md

  ${
    isLevel4
      ? "bg-[#111111] text-[#ffffff] shadow-[0_4px_0_#444444]"
      : "bg-[#f7f3ea] text-[#2f2925] shadow-[0_4px_0_#b8aa8a]"
  }

  text-xl
  font-bold
  text-center

  active:scale-95
  active:translate-y-1

  transition
`}
            >
              {getGameOverText(score, isLevel2, isLevel3, isLevel4).button}
            </button>
          </div>
        ) : (
          <>
            <div
              className={`
    w-[min(360px,92vw)]
    mx-auto
    max-w-full

    mb-6

    ${isLevel4 ? "bg-[#111111]" : isLevel3 ? "bg-[#1b2430]" : "bg-[#b13f46]"}

    rounded-xl

    shadow-[0_2px_10px_rgba(0,0,0,0.18)]

    ${
      isLevel4
        ? "border border-[#111111]"
        : isLevel3
          ? ""
          : "border border-[#c85a5d]"
    }

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

    text-[48px]

    leading-none
    tracking-[0.08em]
    font-bold

    shrink-0
    tabular-nums
text-left


${
  timeLeft <= 5
    ? "text-red-500 animate-pulse"
    : isLevel4
      ? "text-[#ffffff]"
      : "text-[#f7f3ea]"
}
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
    flex
    flex-col
    items-end

    gap-[2px]

    leading-none

    text-right

    shrink-0
  "
              >
                <div
                  className="
      font-mono
      text-[9px]
      tracking-[0.22em]
      text-[rgb(252,200,76)]
      leading-none
      whitespace-nowrap
    "
                >
                  MADE BY 7
                </div>

                <div
                  className={`
      font-mono
      text-[9px]
      tracking-[0.16em]
      leading-none
      whitespace-nowrap

      ${isLevel4 ? "text-[#ffffff]" : "text-[#f7f3ea]"}
    `}
                >
                  {`LIFE×${lives}`}
                </div>

                <div
                  className={`
      font-mono
      text-[9px]
      tracking-[0.16em]
      leading-none
      whitespace-nowrap

      ${isLevel4 ? "text-[#ffffff]" : "text-[#f7f3ea]"}
    `}
                >
                  SCORE
                </div>

                <div
                  className={`
      dseg-italic
      text-[22px]
      leading-none
      tabular-nums
      whitespace-nowrap

      ${isLevel4 ? "text-[#ffffff]" : "text-[#f7f3ea]"}
    `}
                >
                  {score >= 1000 ? Math.round(score) : score.toFixed(1)}
                </div>
              </div>
            </div>
            {/* 题目 */}
            <div
              className={`
    w-[min(360px,92vw)]
    mx-auto
max-w-full

    ${isLevel4 ? "bg-[#ffffff]" : isLevel2 || isLevel3 ? "bg-[#f7f3ea]" : "bg-[#1b2430]"}

    rounded-2xl

    shadow-[0_2px_10px_rgba(0,0,0,0.18)]

    border
    ${
      isLevel4
        ? "border-[#111111]"
        : isLevel3
          ? "border-[#d7b8ff55]"
          : isLevel2
            ? "border-[#ffffff55]"
            : "border-[#ffffff22]"
    }

    h-[160px]

    -translate-y-3

    flex
    items-center
    justify-center
  `}
            >
              <div
                className={`
      ${stage === 4 ? "text-[clamp(32px,9vw,48px)]" : "text-[clamp(56px,13vw,74px)]"}
      font-bold
      tabular-nums
      tracking-tighter
      ${inter.className}

      ${isLevel4 ? "text-[#111111]" : isLevel2 || isLevel3 ? "text-[#1b2430]" : "text-[#f7f3ea]"}
    `}
              >
                {question?.text}
              </div>
            </div>

            {history.length <= backLevel ||
            (level2Ready &&
              (isLevel4
                ? level2IntroStep < 5
                : isLevel3
                  ? level2IntroStep < 4
                  : level2IntroStep < 3)) ? (
              <div className="h-[272px] flex justify-center items-center">
                <button
                  onClick={(e) => {
                    e.currentTarget.blur();

                    playSound("start");

                    // 第一步：出1题，进第二步
                    if (level2IntroStep === 1) {
                      nextQuestion();
                      setLevel2IntroStep(2);
                      return;
                    }

                    // 第二步：出1题
                    if (level2IntroStep === 2) {
                      nextQuestion();

                      // 第二关：教学结束
                      if (!isLevel3 && !isLevel4) {
                        setLevel2Ready(false);
                        return;
                      }

                      // 第三/四关：进入第三步
                      setLevel2IntroStep(3);
                      return;
                    }

                    // 第三步：出1题
                    if (level2IntroStep === 3) {
                      nextQuestion();

                      if (isLevel3) {
                        setLevel2Ready(false);
                        return;
                      }

                      if (isLevel4) {
                        setLevel2IntroStep(4);
                        return;
                      }
                    }

                    // 第四步：仅第四关，教学结束
                    if (level2IntroStep === 4 && isLevel4) {
                      nextQuestion();
                      setLevel2Ready(false);
                      return;
                    }

                    // 非教学阶段：正常出题（第一关开始、introStep=0）
                    nextQuestion();
                  }}
                  className={`
      w-40
      h-40

      rounded-full

      ${
        isLevel4
          ? "bg-[#111111]"
          : isLevel3
            ? "bg-[#1b2430]"
            : isLevel2
              ? "bg-[#b13f46]"
              : "bg-[#f7f3ea]"
      }

${
  isLevel3
    ? "shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
    : "shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
}

${
  isLevel4
    ? "text-[#ffffff]"
    : isLevel3
      ? "text-[#f7f3ea]"
      : isLevel2
        ? "text-[#ffffff]"
        : "text-[#2f2925]"
}

      text-3xl
      font-bold
      text-center

      active:scale-90
active:translate-y-1

transition
    `}
                >
                  {level2IntroStep === 1
                    ? isLevel4
                      ? "第二题"
                      : "第二题"
                    : level2IntroStep === 2
                      ? isLevel4
                        ? "第三题"
                        : isLevel3
                          ? "第三题"
                          : "开始"
                      : level2IntroStep === 3
                        ? isLevel4
                          ? "第四题"
                          : "开始"
                        : level2IntroStep === 4
                          ? "开始"
                          : "开始"}
                </button>
              </div>
            ) : (
              <>
                {/* 数字键盘 */}
                <div
                  className="
    h-[272px]

    flex
    items-center
    justify-center

    pt-6
  "
                >
                  <div className="grid grid-cols-3 gap-4 w-fit">
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
            text-[42px]
            font-bold
            ${inter.className}
            transition
            duration-75
            active:scale-90
            active:translate-y-1
            ${
              isLevel3
                ? "shadow-[0_4px_0_#111827]"
                : isLevel2
                  ? "shadow-[0_4px_0_#8e2f35]"
                  : isLevel4
                    ? "shadow-[0_4px_0_#444444]"
                    : "shadow-[0_4px_0_#b8aa8a]"
            }

                        ${
                          isLevel4
                            ? "bg-[#111111] text-[#ffffff]"
                            : isLevel3
                              ? "bg-[#1b2430] text-[#f7f3ea]"
                              : isLevel2
                                ? "bg-[#b13f46] text-[#ffffff]"
                                : "bg-[#f7f3ea] text-[#2f2925]"
                        }
          `}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* High Score Overlay */}
      {showHSOverlay && (() => {
        const currentScoreVal = score >= 1000 ? Math.round(score) : parseFloat(score.toFixed(1));
        const playerRank = leaderboardData.filter(e => e.score > currentScoreVal).length + 1;

        const displayRows = [];
        if (playerRank <= 10) {
          for (let i = 0; i < 10; i++) {
            const rank = i + 1;
            if (rank === playerRank) {
              displayRows.push({ rank, name: hsName || "你是谁？", score: currentScoreVal, isPlayer: true });
            } else {
              const idx = rank > playerRank ? rank - 2 : rank - 1;
              if (idx < leaderboardData.length) {
                displayRows.push({ rank, name: leaderboardData[idx].name.slice(0, 8), score: leaderboardData[idx].score, isPlayer: false });
              }
            }
          }
        } else {
          for (let i = 0; i < Math.min(10, leaderboardData.length); i++) {
            displayRows.push({ rank: i + 1, name: leaderboardData[i].name.slice(0, 8), score: leaderboardData[i].score, isPlayer: false });
          }
          displayRows.push({ rank: 0, name: "...", score: 0, isEllipsis: true });
          displayRows.push({ rank: playerRank, name: hsName || "你是谁？", score: currentScoreVal, isPlayer: true });
        }

        return (
          <div
            ref={overlayRef}
            tabIndex={0}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 outline-none select-none"
            style={{ background: "rgba(0,0,0,0.72)" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleHSConfirm();
                return;
              }
              if (e.key === "Backspace") {
                setHsName(prev => prev.slice(0, -1));
                return;
              }
              if (e.key.length === 1) {
                const ch = e.key.toUpperCase();
                if ((ch >= "A" && ch <= "Z") || (ch >= "0" && ch <= "9") || ch === " ") {
                  if (hsName.length < 8) {
                    setHsName(prev => prev + ch);
                  }
                }
              }
            }}
          >
            <div className="w-full max-w-[300px] bg-black/50 rounded-xl px-5 py-4">
              <div className="text-[#f7f3ea] text-[11px] font-bold tracking-[0.2em] text-center mb-3 opacity-50">
                新纪录
              </div>

              <div className="mb-2">
                {displayRows.map((row, i) => {
                  if (row.isEllipsis) {
                    return (
                      <div key="sep" className="text-center py-1">
                        <span className="text-[#f7f3ea] text-xs opacity-20">· · ·</span>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between py-[3px] ${
                        row.isPlayer ? "opacity-100" : "opacity-25"
                      }`}
                    >
                      <span className="text-[#f7f3ea] text-sm font-bold w-7 text-left tabular-nums">
                        #{row.rank}
                      </span>
                      <span className="text-[#f7f3ea] text-sm font-bold tracking-wider flex-1 text-center">
                        {row.isPlayer ? (
                          <>
                            <span className={hsName ? "" : "opacity-30"}>
                              {row.name}
                            </span>
                            <span
                              style={{ opacity: cursorOn ? 0.55 : 0, transition: "opacity 80ms" }}
                            >
                              ▌
                            </span>
                          </>
                        ) : (
                          row.name
                        )}
                      </span>
                      <span className="dseg-italic text-[#f7f3ea] text-lg font-bold w-16 text-right tabular-nums">
                        {row.score}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-1">
                <button
                  onClick={handleHSConfirm}
                  className="text-[#f7f3ea] text-sm font-bold tracking-[0.2em] opacity-40 active:opacity-70 transition outline-none focus:outline-none"
                >
                  确认
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}
