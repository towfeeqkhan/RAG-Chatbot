"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const starterPrompts = [
  "Which home charger works with a 40-amp breaker?",
  "Compare Voltway Plus vs. Voltway Pro rates",
  "Is Home Pro 2 compatible with Tesla?",
  "My charger is flashing yellow—what is E04?",
];

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 18.5 3.5 21v-5A8.5 8.5 0 1 1 12 20.5H7.5" />
      <path d="M8 11.5h8M8 8.5h5" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4.3 6.2A6.3 6.3 0 1 1 4 13.3" />
      <path d="M4.2 2.8v3.6h3.6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 10 11-6-3.5 12-2.3-4.1L4 10Z" />
      <path d="m9.2 11.9 2.9-3" />
    </svg>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error, setMessages, stop, clearError } =
    useChat({
      transport: new DefaultChatTransport({
        api: "/api/chat",
      }),
    });
  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const chatBody = chatBodyRef.current;
    if (isOpen && chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }, [error, isBusy, isOpen, messages]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = draft.trim();
    if (!text || isBusy) return;

    void sendMessage({ text });
    setDraft("");
  }

  function resetChat() {
    stop();
    setMessages([]);
    clearError();
    setDraft("");
  }

  return (
    <>
      {!isOpen && (
        <button
          className="chatLauncher"
          type="button"
          aria-expanded="false"
          aria-controls="voltway-chat"
          onClick={() => setIsOpen(true)}
        >
          <span className="chatIconWrap">
            <ChatIcon />
            <i />
          </span>
          <span>Ask Voltway</span>
        </button>
      )}

      {isOpen && (
        <>
          <button
            className="chatBackdrop"
            type="button"
            tabIndex={-1}
            aria-label="Close Voltway Assistant"
            onClick={() => setIsOpen(false)}
          />
          <section
            className="chatDrawer"
            id="voltway-chat"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
          >
            <header className="chatHeader">
              <div className="chatIdentity">
                <span className="assistantMark">v.</span>
                <div>
                  <h2 id="chat-title">Voltway Assistant</h2>
                  <p>
                    <i /> Grounded in official Voltway docs
                  </p>
                </div>
              </div>
              <div className="chatControls">
                <button
                  type="button"
                  aria-label="Reset chat"
                  title="Reset chat"
                  onClick={resetChat}
                >
                  <ResetIcon />
                </button>
                <button
                  type="button"
                  aria-label="Close chat"
                  title="Close chat"
                  onClick={() => setIsOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            </header>

            <div className="chatBody" ref={chatBodyRef}>
              <div className="assistantMessage">
                <span className="messageAvatar">v.</span>
                <div>
                  <div className="assistantBubble">
                    Hi—ask me anything about Voltway home chargers, public
                    station rates, installation, or error codes.
                  </div>
                  <span className="messageTime">Voltway Assistant · now</span>
                </div>
              </div>

              <div aria-live="polite">
                {messages.map((message) => {
                  const text = message.parts
                    .filter((part) => part.type === "text")
                    .map((part) => part.text)
                    .join("");

                  if (!text) return null;

                  if (message.role === "user") {
                    return (
                      <div className="chatEntry userMessage" key={message.id}>
                        <div className="userBubble">{text}</div>
                      </div>
                    );
                  }

                  return (
                    <div className="chatEntry assistantMessage" key={message.id}>
                      <span className="messageAvatar">v.</span>
                      <div>
                        <div className="assistantBubble">{text}</div>
                        <span className="messageTime">Voltway Assistant</span>
                      </div>
                    </div>
                  );
                })}

                {isBusy && (
                  <p className="chatStatus" role="status">
                    Voltway Assistant is thinking...
                  </p>
                )}

                {error && (
                  <p className="chatError" role="alert">
                    Sorry, the assistant couldn’t respond. Please try again.
                  </p>
                )}
              </div>

              {messages.length === 0 && (
                <div className="starterPrompts">
                  <p>Popular questions</p>
                  <div>
                    {starterPrompts.map((prompt) => (
                      <button
                        type="button"
                        key={prompt}
                        onClick={() => {
                          if (isBusy) return;
                          void sendMessage({ text: prompt });
                        }}
                        disabled={isBusy}
                      >
                        <span>{prompt}</span>
                        <svg viewBox="0 0 18 18" aria-hidden="true">
                          <path d="M4 9h9M10 5l4 4-4 4" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form className="chatComposer" onSubmit={handleSubmit}>
              <label htmlFor="chat-message">Message Voltway Assistant</label>
              <div className="chatInputWrap">
                <input
                  id="chat-message"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask about chargers, rates, or error codes..."
                  autoComplete="off"
                  disabled={isBusy}
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!draft.trim() || isBusy}
                >
                  <SendIcon />
                </button>
              </div>
            </form>

            <footer className="chatFooter">
              <span>Answers from Voltway docs</span>
              <i />
              <a href="tel:18008658929">Need a human? 1-800-VOLTWAY</a>
            </footer>
          </section>
        </>
      )}
    </>
  );
}
