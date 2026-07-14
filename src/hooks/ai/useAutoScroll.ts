import { useEffect, useRef } from "react";

export function useAutoScroll() {
  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  const messagesContainerRef =
    useRef<HTMLDivElement>(null);

  const shouldAutoScroll =
    useRef(true);

  function handleMessagesScroll() {
    const container =
      messagesContainerRef.current;

    if (!container) {
      return;
    }

    const threshold = 80;

    shouldAutoScroll.current =
      container.scrollHeight -
        container.scrollTop -
        container.clientHeight <
      threshold;
  }

  function scrollToBottom(
    behavior: ScrollBehavior = "smooth"
  ) {
    messagesEndRef.current?.scrollIntoView({
      behavior,
    });
  }

  useEffect(() => {
    if (!shouldAutoScroll.current) {
      return;
    }

    scrollToBottom();
  });

  return {
    messagesEndRef,
    messagesContainerRef,
    handleMessagesScroll,
    scrollToBottom,
    shouldAutoScroll,
  };
}