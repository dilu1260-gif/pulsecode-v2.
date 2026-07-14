"use client";

import { useMemo, useState } from "react";
import ReferenceSuggestions from "./ReferenceSuggestions";
import { useReferenceSuggestions } from "@/hooks/useReferenceSuggestions";

import type {
  AIMessage,
  Conversation,
} from "@/core/ai/types";

import AIChat from "./AIChat";
import AIQuickActions from "./AIQuickActions";

interface Props {
  prompt: string;
  setPrompt: (value: string) => void;

  loading: boolean;

  messages: AIMessage[];

  conversations: Conversation[];

  openFiles: string[];

  activeConversationId: string | null;

  onCreateConversation: () => void;

  onSwitchConversation: (
    id: string
  ) => void;

  onRenameConversation: (
    id: string,
    title: string
  ) => void;

  onDeleteConversation: (
    id: string
  ) => void;

  onSend: () => void;

  onStop: () => void;

  onRegenerate: () => void;

  onExplain: () => void;

  onFix: () => void;

  onOptimize: () => void;

  onTests: () => void;

  onComments: () => void;

  onClear: () => void;

  messagesEndRef:
    React.RefObject<HTMLDivElement | null>;

  messagesContainerRef:
    React.RefObject<HTMLDivElement | null>;

  handleMessagesScroll: () => void;
}

export default function AIPanel({
  prompt,
  setPrompt,
  loading,
  messages,
  openFiles,
  conversations,
  activeConversationId,
  onCreateConversation,
  onSwitchConversation,
  onRenameConversation,
  onDeleteConversation,
  onSend,
  onStop,
  onRegenerate,
  onExplain,
  onFix,
  onOptimize,
  onTests,
  onComments,
  onClear,
  messagesEndRef,
  messagesContainerRef,
  handleMessagesScroll,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [
    editingId,
    setEditingId,
  ] = useState<string | null>(null);

  const [
    editingTitle,
    setEditingTitle,
  ] = useState("");

  const referenceSuggestions =
  useReferenceSuggestions(
    prompt,
    openFiles
  );

  const filteredConversations =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      if (!query) {
        return conversations;
      }

      return conversations.filter(
        (conversation) =>
          conversation.title
            .toLowerCase()
            .includes(query)
      );
    }, [search, conversations]);

  function saveRename() {
    if (!editingId) return;

    const title =
      editingTitle.trim();

      const referenceSuggestions =
  useReferenceSuggestions(
    prompt,
    conversations.flatMap((conversation) =>
      conversation.messages.length >= 0 ? [] : []
    )
  );

    if (title) {
      onRenameConversation(
        editingId,
        title
      );
    }

    setEditingId(null);
    setEditingTitle("");
  }

  return (
    <aside className="flex w-[460px] border-l border-zinc-800 bg-zinc-950">
      {/* Sidebar */}

      <div className="flex w-44 flex-col border-r border-zinc-800">
        <div className="border-b border-zinc-800 p-3">
          <button
            onClick={
              onCreateConversation
            }
            className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + New Chat
          </button>
        </div>

        <div className="border-b border-zinc-800 p-3">
          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search chats..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(
            (conversation) => (
              <div
                key={
                  conversation.id
                }
                onClick={() =>
                  onSwitchConversation(
                    conversation.id
                  )
                }
                className={`cursor-pointer border-b border-zinc-800 p-3 transition ${
                  activeConversationId ===
                  conversation.id
                    ? "bg-zinc-800"
                    : "hover:bg-zinc-900"
                }`}
              >
                {editingId ===
                conversation.id ? (
                  <input
                    autoFocus
                    value={
                      editingTitle
                    }
                    onChange={(e) =>
                      setEditingTitle(
                        e.target.value
                      )
                    }
                    onBlur={
                      saveRename
                    }
                    onKeyDown={(
                      e
                    ) => {
                      if (
                        e.key ===
                        "Enter"
                      ) {
                        saveRename();
                      }

                      if (
                        e.key ===
                        "Escape"
                      ) {
                        setEditingId(
                          null
                        );
                        setEditingTitle(
                          ""
                        );
                      }
                    }}
                    className="w-full rounded bg-zinc-900 px-2 py-1 text-sm text-white outline-none"
                  />
                ) : (
                  <div
                    onDoubleClick={() => {
                      setEditingId(
                        conversation.id
                      );

                      setEditingTitle(
                        conversation.title
                      );
                    }}
                    className="truncate text-sm font-medium text-white"
                  >
                    {
                      conversation.title
                    }
                  </div>
                )}

                <div className="mt-1 text-xs text-zinc-500">
                  {
                    conversation
                      .messages
                      .length
                  }{" "}
                  messages
                </div>

                <div className="mt-3 flex gap-3">
                  <button
                    onClick={(
                      e
                    ) => {
                      e.stopPropagation();

                      onDeleteConversation(
                        conversation.id
                      );
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Main Panel */}

      <div className="flex flex-1 flex-col">
        <div className="border-b border-zinc-800 p-4">
          <h2 className="text-lg font-semibold text-white">
            Pulse AI
          </h2>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div
            ref={
              messagesContainerRef
            }
            onScroll={
              handleMessagesScroll
            }
            className="flex-1 overflow-y-auto pr-1"
          >
            <AIChat
              messages={
                messages
              }
              loading={
                loading
              }
            />

            <div
              ref={
                messagesEndRef
              }
            />
          </div>

          <div className="mt-4">
            <AIQuickActions
              disabled={
                loading
              }
              onExplain={
                onExplain
              }
              onFix={onFix}
              onOptimize={
                onOptimize
              }
              onTests={
                onTests
              }
              onComments={
                onComments
              }
            />

          <div className="relative">
  <textarea
    value={prompt}
    onChange={(e) =>
      setPrompt(e.target.value)
    }
    placeholder="Ask Pulse AI..."
    className="h-36 w-full resize-none rounded-lg border border-zinc-800 bg-black p-3 text-sm text-white outline-none transition focus:border-blue-500"
    onKeyDown={(e) => {
      if (
        e.key === "Enter" &&
        !e.shiftKey
      ) {
        e.preventDefault();

        if (loading) {
          onStop();
        } else {
          onSend();
        }
      }
    }}
  />

  <ReferenceSuggestions
    files={referenceSuggestions.suggestions}
    visible={referenceSuggestions.visible}
   onSelect={(file) => {
  setPrompt(
    prompt.replace(
      /@([A-Za-z0-9._/-]*)$/,
      `@${file} `
    )
  );
}}
  />
</div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={
                  loading
                    ? onStop
                    : onSend
                }
                className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {loading
                  ? "Stop"
                  : "Send"}
              </button>

              <button
                onClick={
                  onRegenerate
                }
                disabled={
                  loading
                }
                className="rounded-lg bg-zinc-800 px-4 font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                🔄
              </button>
            </div>

            <button
              onClick={onClear}
              disabled={
                loading ||
                messages.length ===
                  0
              }
              className="mt-2 w-full rounded-lg bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              🗑️ Clear Chat
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}