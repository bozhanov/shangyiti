"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import composerWorks from "../../data";

const ITEMS_PER_PAGE = 30;

export default function ComposerPage() {
  const params = useParams();

  const composerSlug = String(params.composer || "");

  const letter = String(params.letter || "");

  const composer = composerWorks?.[composerSlug];

  const searchParams = useSearchParams();

  const workQuery = searchParams.get("work");

  // 防炸
  if (!composer) {
    return (
      <main
        className="
        min-h-screen

        bg-[var(--bg)]
        text-[var(--text)]

        flex
        items-center
        justify-center

        text-2xl
        md:text-3xl

        font-semibold

        tracking-tight
      "
      >
        <div className="opacity-60">等等我...</div>
      </main>
    );
  }

  // 防炸 works
  const works = composer.works || [];

  // 查找目标作品
  const targetIndex = workQuery
    ? works.findIndex((work) => work?.title === workQuery)
    : -1;

  // 初始页码
  const initialPage =
    targetIndex >= 0 ? Math.floor(targetIndex / ITEMS_PER_PAGE) + 1 : 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  // 总页数
  const totalPages = Math.max(1, Math.ceil(works.length / ITEMS_PER_PAGE));

  // 当前页作品
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentWorks = works.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 自动滚动到目标作品
  useEffect(() => {
    if (!workQuery) return;

    const timer = setTimeout(() => {
      const element = document.getElementById(workQuery);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",

          block: "center",
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [workQuery, currentPage]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 py-8">
      {/* 顶部返回 */}
      <div className="flex justify-between mb-8">
        <Link
          href={`/sheet/${letter}`}
          className="
            text-base
            opacity-60
            hover:opacity-40
            transition
          "
        >
          {letter.toUpperCase()} 作曲家列表
        </Link>

        <Link
          href="/"
          className="
            text-base
            opacity-60
            hover:opacity-40
            transition
          "
        >
          首页
        </Link>
      </div>

      {/* 标题 */}
      <h1
        className="
          text-4xl
          md:text-5xl
          font-semibold
          tracking-tight
          mb-3
          leading-tight
        "
      >
        {composer.name || "Unknown Composer"}
      </h1>

      {/* 中文名 */}
      <p
        className="
          opacity-55
          text-xl
          mb-8
        "
      >
        {composer.chinese || ""}
      </p>

      {/* 作品列表 */}
      <div className="space-y-4">
        {currentWorks.map((work, index) => (
          <a
            id={work?.title || `work-${index}`}
            key={work?.title || `work-${index}`}
            href={`/api/download?file=${encodeURIComponent(
              work?.fileName || "",
            )}&t=${Date.now()}`}
            className={`
              apple-card
              tap-effect
              block
              px-6
              py-5
              text-lg
              md:text-xl
              font-medium

              ${
                work?.title === workQuery
                  ? "!bg-[var(--text)] !text-[var(--bg)] scale-[1.01] shadow-xl"
                  : ""
              }
            `}
          >
            {work?.title || "Untitled"}
          </a>
        ))}
      </div>

      {/* 分页 */}
      <div
        className="
          flex
          justify-center
          items-center
          gap-4
          mt-12
          flex-wrap
        "
      >
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="
            apple-card
            tap-effect
            px-5
            py-2
            disabled:opacity-30
          "
        >
          上一页
        </button>

        <span
          className="
            opacity-70
            text-lg
          "
        >
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="
            apple-card
            tap-effect
            px-5
            py-2
            disabled:opacity-30
          "
        >
          下一页
        </button>
      </div>
    </main>
  );
}
