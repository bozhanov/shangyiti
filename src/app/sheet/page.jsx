"use client";

import Link from "next/link";
import { useState } from "react";
import composerWorks from "./data";

export default function SheetPage() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const [search, setSearch] = useState("");

  const composers = Object.entries(composerWorks || {});

  function normalize(text = "") {
    return (
      text
        ?.toString?.()
        ?.toLowerCase?.()
        ?.replace(/\./g, "")
        ?.replace(/-/g, "")
        ?.trim?.() || ""
    );
  }

  const filteredResults = [];

  composers.forEach(([slug, composer]) => {
    if (!composer) return;

    const keywords = normalize(search).split(" ").filter(Boolean);

    const composerMatch = keywords.every(
      (word) =>
        normalize(composer?.name).includes(word) ||
        normalize(composer?.chinese).includes(word),
    );

    if (composerMatch && search.trim() !== "") {
      filteredResults.push({
        slug,

        composer,

        workTitle: null,

        score: 999,
      });
    }

    (composer?.works || []).forEach((work) => {
      const workMatch = keywords.every(
        (word) =>
          normalize(work?.title).includes(word) ||
          normalize(composer?.name).includes(word) ||
          normalize(composer?.chinese).includes(word),
      );

      if (workMatch && search.trim() !== "") {
        const normalizedTitle = normalize(work?.title);

        let score = 0;

        if (normalizedTitle.includes(`op${keywords[0]}`)) {
          score += 100;
        }

        if (normalizedTitle.includes(`bwv${keywords[0]}`)) {
          score += 100;
        }

        if (normalizedTitle.endsWith(keywords[0])) {
          score += 60;
        }

        score += 50 - normalizedTitle.indexOf(keywords[0]);

        filteredResults.push({
          slug,

          composer,

          workTitle: work?.title || "Untitled",

          score,
        });
      }
    });
  });

  filteredResults.sort((a, b) => b.score - a.score);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 py-8">
      {/* 返回 */}
      <div className="flex justify-end mb-10">
        <Link
          href="/"
          className="text-base opacity-60 hover:opacity-40 transition"
        >
          首页
        </Link>
      </div>

      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-semibold tracking-tight mb-3">
          作曲家索引
        </h1>

        <p className="text-base opacity-70">按姓的首字母哈...</p>
      </div>

      {/* 搜索框 */}
      <div className="mb-12 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="作曲家名 / 作品号"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            apple-card
            w-full
            px-6
            py-5
            text-lg
            md:text-xl
            bg-transparent
            outline-none
          "
        />
      </div>

      {/* 搜索结果 */}
      {search.trim() !== "" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
          {filteredResults.map((result, index) => (
            <Link
              key={`${result.slug}-${index}`}
              href={
                result.workTitle
                  ? `/sheet/${result.slug[0]}/${result.slug}?work=${encodeURIComponent(result.workTitle)}`
                  : `/sheet/${result.slug[0]}/${result.slug}`
              }
              className="
                      apple-card
                      tap-effect
                      px-6
                      py-5
                    "
            >
              <div className="text-lg md:text-xl font-medium">
                {result?.composer?.name || "Unknown Composer"}
              </div>

              <div className="opacity-55 text-sm md:text-base mt-1">
                {result?.composer?.chinese || ""}
              </div>

              {result.workTitle && (
                <div className="text-sm opacity-65 mt-2">
                  → {result.workTitle}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* 字母 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-14">
        {letters.map((letter) => (
          <Link
            key={letter}
            href={`/sheet/${letter.toLowerCase()}`}
            className="
                apple-card
                tap-effect
                h-20
                flex
                items-center
                justify-center
                text-[42px]
                font-medium
              "
          >
            {letter}
          </Link>
        ))}
      </div>

      {/* 特殊分类 */}
      <div className="grid md:grid-cols-2 gap-5">
        <div
          className="
            apple-card
            tap-effect
            px-6
            py-5
          "
        >
          <h2 className="text-lg md:text-xl font-medium mb-2">中国作品</h2>

          <p className="opacity-60 text-sm md:text-base leading-relaxed">
            传统 / 现代 / 改编
          </p>
        </div>

        <div
          className="
            apple-card
            tap-effect
            px-6
            py-5
          "
        >
          <h2 className="text-lg md:text-xl font-medium mb-2">其他类型</h2>

          <p className="opacity-60 text-sm md:text-base leading-relaxed">
            动漫 / 游戏 / 流行
          </p>
        </div>
      </div>
    </main>
  );
}
