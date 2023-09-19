import { useState, useEffect } from "react";

export function useScrollWindow() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      setY(scrollTop);
    };

    // 添加滚动事件监听器
    window.addEventListener("scroll", handleScroll);

    // 在组件卸载时移除事件监听器，以避免内存泄漏
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 空依赖数组确保仅在组件挂载和卸载时执行一次

  return y;
}
